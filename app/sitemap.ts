import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { locations } from '@/data/locations';
import { LANDING_PAGES } from '@/lib/landing-pages';
import { BLOG_POSTS } from '@/lib/blog-posts';

function getFileMtime(relativeFilePath: string): Date {
  try {
    const fullPath = path.join(process.cwd(), relativeFilePath);
    const stats = fs.statSync(fullPath);
    return stats.mtime;
  } catch (error) {
    return new Date();
  }
}

/**
 * Every folder under app/blog must have an entry in lib/blog-posts.ts and vice versa,
 * or the post would be live but missing from /blog (or listed but 404). The sitemap is
 * generated at build time, so a mismatch fails `next build`. Skipped when the source
 * tree is not on disk.
 */
function assertBlogPostsMatchRoutes(): void {
  const blogDir = path.join(process.cwd(), 'app', 'blog');
  if (!fs.existsSync(blogDir)) return;
  const folders = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(blogDir, d.name, 'page.tsx')))
    .map((d) => d.name);
  const listed = BLOG_POSTS.map((p) => p.slug);
  const unlisted = folders.filter((f) => !listed.includes(f));
  const missing = listed.filter((s) => !folders.includes(s));
  if (unlisted.length || missing.length) {
    throw new Error(
      `Blog list out of sync with app/blog. Add to lib/blog-posts.ts: [${unlisted.join(', ')}]. ` +
        `No app/blog/<slug>/page.tsx for: [${missing.join(', ')}].`,
    );
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mckinleyroofing.net';
  assertBlogPostsMatchRoutes();

  // 1. Static routes
  const staticRoutes = [
    { path: '', file: 'app/page.tsx', priority: 1.0, changeFrequency: 'daily' },
    { path: '/about', file: 'app/about/page.tsx', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services', file: 'app/services/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/contact', file: 'app/contact/page.tsx', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/locations', file: 'app/locations/page.tsx', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', file: 'app/privacy/page.tsx', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', file: 'app/terms/page.tsx', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/blog', file: 'lib/blog-posts.ts', priority: 0.7, changeFrequency: 'weekly' },
    // Blog posts come from the same list the /blog index reads.
    ...BLOG_POSTS.map((post) => ({
      path: `/blog/${post.slug}`,
      file: `app/blog/${post.slug}/page.tsx`,
      priority: 0.7,
      changeFrequency: 'monthly',
    })),
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: getFileMtime(route.file),
    changeFrequency: route.changeFrequency as any,
    priority: route.priority,
  }));

  // 2. Location routes (/locations/[slug])
  const locationsFileMtime = getFileMtime('data/locations.ts');
  const locationPageFileMtime = getFileMtime('app/locations/[slug]/page.tsx');
  const locationMtime = locationsFileMtime > locationPageFileMtime ? locationsFileMtime : locationPageFileMtime;

  locations.forEach((loc) => {
    sitemapEntries.push({
      url: `${baseUrl}/locations/${loc.slug}`,
      lastModified: locationMtime,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // 3. Landing page routes (/[slug])
  const landingPagesFileMtime = getFileMtime('lib/landing-pages.ts');
  const landingPageFileMtime = getFileMtime('app/[slug]/page.tsx');
  const landingMtime = landingPagesFileMtime > landingPageFileMtime ? landingPagesFileMtime : landingPageFileMtime;

  LANDING_PAGES.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}/${page.slug}`,
      lastModified: landingMtime,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
