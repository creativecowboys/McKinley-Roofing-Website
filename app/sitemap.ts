import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { locations } from '@/data/locations';
import { LANDING_PAGES } from '@/lib/landing-pages';

function getFileMtime(relativeFilePath: string): Date {
  try {
    const fullPath = path.join(process.cwd(), relativeFilePath);
    const stats = fs.statSync(fullPath);
    return stats.mtime;
  } catch (error) {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mckinleyroofing.net';

  // 1. Static routes
  const staticRoutes = [
    { path: '', file: 'app/page.tsx', priority: 1.0, changeFrequency: 'daily' },
    { path: '/about', file: 'app/about/page.tsx', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services', file: 'app/services/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/contact', file: 'app/contact/page.tsx', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/locations', file: 'app/locations/page.tsx', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', file: 'app/privacy/page.tsx', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', file: 'app/terms/page.tsx', priority: 0.3, changeFrequency: 'yearly' },
    {
      path: '/blog/protect-your-home-with-expert-roofing-services',
      file: 'app/blog/protect-your-home-with-expert-roofing-services/page.tsx',
      priority: 0.7,
      changeFrequency: 'monthly',
    },
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
