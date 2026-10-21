/**
 * Blog post shape and date formatting. Pure (no Node APIs), so client components such as
 * the homepage strip can import it. Loading posts lives in lib/blog-posts.ts (server only).
 */

export type BlogPost = {
  /** URL segment: the post lives at /blog/<slug>. */
  slug: string;
  /** Same as the article's H1. */
  title: string;
  /** One or two sentences for the cards on /blog and the homepage. */
  excerpt: string;
  /** YYYY-MM-DD, the date printed on the article. */
  datePublished: string;
  /** Hero image in /public, e.g. '/blog_storm_damage_roofing.webp'. */
  image: string;
  /** Describes what is in the photo. */
  imageAlt: string;
  /** Short label shown on the cards and the article hero, e.g. 'Roofing Tips'. */
  category: string;
  /** 'page' = hand-built route folder under app/blog; 'markdown' = content/blog/<slug>.md. */
  source: 'page' | 'markdown';
};

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
