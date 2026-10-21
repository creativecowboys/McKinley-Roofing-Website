/**
 * The blog's post list: the one source the /blog index and the sitemap read.
 *
 * Each article is its own route folder, `app/blog/<slug>/page.tsx` (with its body in
 * `_pages/Blog<Name>Page.tsx`). Publishing a new article = add that folder AND one
 * entry here. `app/sitemap.ts` fails the build if a folder under app/blog has no entry
 * here or an entry has no folder, so a post can never be live but missing from /blog.
 *
 * Order does not matter: the index sorts newest first by `datePublished`.
 */

export type BlogPost = {
  /** URL segment, identical to the folder name under app/blog. */
  slug: string;
  /** Same as the article's H1. */
  title: string;
  /** One or two sentences for the card. The article's meta description works well. */
  excerpt: string;
  /** YYYY-MM-DD, the date printed on the article itself. */
  datePublished: string;
  /** Hero image in /public, e.g. '/blog_storm_damage_roofing.webp'. */
  image: string;
  /** Describes what is in the photo. */
  imageAlt: string;
  /** Short label shown on the card, e.g. 'Roofing Tips'. */
  category: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-roofing-insurance-claims-work-in-georgia',
    title: "How Roofing Insurance Claims Work in Georgia: A Homeowner's Guide",
    excerpt:
      'What Georgia homeowners insurance covers on your roof, the claim process step by step, ACV vs RCV, and the mistakes that get storm damage claims denied.',
    datePublished: '2026-08-09',
    image: '/blog_storm_damage_roofing.webp',
    imageAlt:
      'Roofing contractor inspecting shingle roof for a storm damage insurance claim in Douglasville, Georgia',
    category: 'Insurance Claims',
  },
  {
    slug: 'protect-your-home-with-expert-roofing-services',
    title: 'Protect Your Home with Expert Roofing Services',
    excerpt:
      'McKinley Roofing explains why expert roof care is essential — covering repair, storm damage restoration, full replacement, and gutter services in Douglasville, GA.',
    datePublished: '2025-08-23',
    image: '/blog_hero_roofing.webp',
    imageAlt: 'Beautiful West Georgia home with expert McKinley roofing installation',
    category: 'Roofing Tips',
  },
];

/** All posts, newest first. */
export function getBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * '2026-08-09' -> 'August 9, 2026'. Parsed by hand: `new Date('2026-08-09')` is UTC
 * midnight and prints the previous day in US time zones.
 */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
