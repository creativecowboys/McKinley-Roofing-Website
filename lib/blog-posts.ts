/**
 * Every blog post on the site, in one list: the /blog index, the homepage strip, the
 * sitemap and the /blog/[slug] route all read it. SERVER ONLY (reads the file system):
 * client components import types and formatting from lib/blog-format.ts instead.
 *
 * Two kinds of post:
 *  - Markdown (the normal way to publish): `content/blog/<slug>.md`, rendered by
 *    app/blog/[slug]/page.tsx. Front matter format: see content/blog/README.md.
 *  - Hand-built pages (the two 2025/2026 originals): a route folder
 *    `app/blog/<slug>/page.tsx`, listed in LEGACY_POSTS below.
 *
 * Everything is checked when the site builds. Bad front matter, an H1 or raw HTML in a
 * body, a link to a page that does not exist, a missing image, a duplicate slug, or a
 * route folder missing from LEGACY_POSTS stops `next build` with a message naming the
 * file. So does a "[CONFIRM ...]" editor's note in a production build.
 */
import fs from 'fs';
import path from 'path';
import { Lexer, type Token } from 'marked';
import { parse as parseYaml } from 'yaml';
import { LANDING_PAGES } from '@/lib/landing-pages';
import { locations } from '@/data/locations';
import type { BlogPost } from '@/lib/blog-format';

export type { BlogPost } from '@/lib/blog-format';
export { formatPostDate } from '@/lib/blog-format';

export type BlogFaq = { question: string; answer: string };

export type MarkdownPost = BlogPost & {
  source: 'markdown';
  /** Full <title>, used as-is (no " | McKinley Roofing" suffix). Optional. */
  seoTitle?: string;
  metaDescription: string;
  dateModified?: string;
  /** Which part of the photo the wide article hero keeps: 'top' | 'center' | 'bottom'. */
  imagePosition: 'top' | 'center' | 'bottom';
  faqs: BlogFaq[];
  /** The body, parsed by marked's lexer; rendered by components/BlogMarkdown.tsx. */
  tokens: Token[];
};

/** Hand-built posts. Each has its own folder under app/blog; do not add new ones here. */
const LEGACY_POSTS: BlogPost[] = [
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
    source: 'page',
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
    source: 'page',
  },
];

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const APP_BLOG_DIR = path.join(ROOT, 'app', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public');

const ALLOWED_KEYS = new Set([
  'title', 'seoTitle', 'slug', 'category', 'metaDescription', 'excerpt',
  'datePublished', 'dateModified', 'image', 'imageAlt', 'imagePosition', 'faqs',
  // Notes for the reviewer (keywords, sources, open questions). Accepted and never rendered.
  'editorial',
]);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const CONFIRM_RE = /\[\s*CONFIRM\b/i;

class BlogContentError extends Error {}

function fail(file: string, message: string): never {
  throw new BlogContentError(`Blog post content/blog/${file}: ${message}`);
}

function isRealDate(value: string): boolean {
  const m = DATE_RE.exec(value);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const dt = new Date(Date.UTC(y, mo - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d;
}

function publicFileExists(src: string): boolean {
  if (!src.startsWith('/') || src.includes('..')) return false;
  return fs.existsSync(path.join(PUBLIC_DIR, src));
}

/** '/x/' and 'https://www.mckinleyroofing.net/x?y#z' -> '/x'. Null for anything off-site. */
export function sitePath(href: string): string | null {
  let p = href.trim();
  const abs = /^https?:\/\/(?:www\.)?mckinleyroofing\.net(?=\/|$|[?#])/i.exec(p);
  if (abs) p = p.slice(abs[0].length) || '/';
  if (!p.startsWith('/') || p.startsWith('//')) return null;
  p = p.replace(/[?#].*$/, '');
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p || '/';
}

/** Walk every token, including list items and table cells. */
function walk(tokens: Token[], visit: (t: Token) => void): void {
  for (const t of tokens) {
    visit(t);
    const anyT = t as Token & { tokens?: Token[]; items?: Token[]; header?: { tokens: Token[] }[]; rows?: { tokens: Token[] }[][] };
    if (anyT.tokens) walk(anyT.tokens, visit);
    if (anyT.items) walk(anyT.items, visit);
    if (anyT.header) anyT.header.forEach((c) => walk(c.tokens, visit));
    if (anyT.rows) anyT.rows.forEach((r) => r.forEach((c) => walk(c.tokens, visit)));
  }
}

function requireString(file: string, data: Record<string, unknown>, key: string): string {
  const v = data[key];
  if (typeof v !== 'string' || !v.trim()) fail(file, `"${key}" is required and must be non-empty text.`);
  return v.trim();
}

function optionalString(file: string, data: Record<string, unknown>, key: string): string | undefined {
  if (!(key in data) || data[key] === null) return undefined;
  const v = data[key];
  if (typeof v !== 'string' || !v.trim()) fail(file, `"${key}" must be non-empty text when present (delete the line to leave it out).`);
  return v.trim();
}

function parseMarkdownFile(file: string): MarkdownPost {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8').replace(/^﻿/, '');
  const m = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/.exec(raw);
  if (!m) fail(file, 'must start with a front matter block between two "---" lines.');

  let data: unknown;
  try {
    data = parseYaml(m[1]);
  } catch (e) {
    fail(file, `front matter is not valid YAML (${(e as Error).message.split('\n')[0]}).`);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) fail(file, 'front matter must be a list of key: value lines.');
  const fm = data as Record<string, unknown>;

  const unknown = Object.keys(fm).filter((k) => !ALLOWED_KEYS.has(k));
  if (unknown.length) fail(file, `unknown front matter field(s): ${unknown.join(', ')}. Allowed: ${[...ALLOWED_KEYS].join(', ')}.`);

  const title = requireString(file, fm, 'title');
  const slug = requireString(file, fm, 'slug');
  const category = requireString(file, fm, 'category');
  const metaDescription = requireString(file, fm, 'metaDescription');
  const datePublished = requireString(file, fm, 'datePublished');
  const image = requireString(file, fm, 'image');
  const imageAlt = requireString(file, fm, 'imageAlt');
  const seoTitle = optionalString(file, fm, 'seoTitle');
  const excerpt = optionalString(file, fm, 'excerpt');
  const dateModified = optionalString(file, fm, 'dateModified');
  const imagePosition = optionalString(file, fm, 'imagePosition') ?? 'center';
  if (imagePosition !== 'top' && imagePosition !== 'center' && imagePosition !== 'bottom') {
    fail(file, `imagePosition "${imagePosition}" must be top, center or bottom.`);
  }

  if (!SLUG_RE.test(slug)) fail(file, `slug "${slug}" must be lowercase words joined by hyphens.`);
  if (file !== `${slug}.md`) fail(file, `the file name must be the slug: rename it to ${slug}.md.`);
  if (!isRealDate(datePublished)) fail(file, `datePublished "${datePublished}" must be a real date written YYYY-MM-DD.`);
  if (dateModified !== undefined) {
    if (!isRealDate(dateModified)) fail(file, `dateModified "${dateModified}" must be a real date written YYYY-MM-DD.`);
    if (dateModified < datePublished) fail(file, 'dateModified is earlier than datePublished.');
  }
  if (metaDescription.length < 50 || metaDescription.length > 170) {
    fail(file, `metaDescription is ${metaDescription.length} characters; keep it between 50 and 170.`);
  }
  if (seoTitle !== undefined && seoTitle.length > 70) fail(file, `seoTitle is ${seoTitle.length} characters; keep it to 70 or fewer.`);
  if (!/\.(webp|jpe?g|png|avif)$/i.test(image) || !publicFileExists(image)) {
    fail(file, `image "${image}" must be a photo file in /public, written like "/blog_my_photo.webp".`);
  }

  let faqs: BlogFaq[] = [];
  if ('faqs' in fm && fm.faqs !== null) {
    if (!Array.isArray(fm.faqs)) fail(file, '"faqs" must be a list of question/answer pairs.');
    faqs = fm.faqs.map((item, i) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) fail(file, `faqs item ${i + 1} must have a question and an answer.`);
      const keys = Object.keys(item);
      const extra = keys.filter((k) => k !== 'question' && k !== 'answer');
      if (extra.length) fail(file, `faqs item ${i + 1} has unknown field(s): ${extra.join(', ')}.`);
      const q = (item as Record<string, unknown>).question;
      const a = (item as Record<string, unknown>).answer;
      if (typeof q !== 'string' || !q.trim() || typeof a !== 'string' || !a.trim()) {
        fail(file, `faqs item ${i + 1} needs a non-empty question and answer.`);
      }
      return { question: q.trim(), answer: a.trim() };
    });
  }

  const body = m[2];
  if (!body.trim()) fail(file, 'the article body (below the front matter) is empty.');
  if (CONFIRM_RE.test(body) && process.env.VERCEL_ENV === 'production') {
    fail(file, 'still has a "[CONFIRM ...]" editor\'s note. Resolve it before this goes to production.');
  }
  const tokens = Lexer.lex(body, { gfm: true });

  return {
    slug, title, category, metaDescription, datePublished, image, imageAlt, faqs, tokens,
    excerpt: excerpt ?? metaDescription,
    seoTitle, dateModified, imagePosition,
    source: 'markdown',
  };
}

/** Body checks that need the full list of site pages (internal links). */
function checkBody(post: MarkdownPost, validPaths: Set<string>): void {
  const file = `${post.slug}.md`;
  walk(post.tokens, (t) => {
    if (t.type === 'heading' && (t as Token & { depth: number }).depth === 1) {
      fail(file, `has a "# " heading ("${(t as Token & { text: string }).text}"). The title is the page's H1; start sections at "## ".`);
    }
    if (t.type === 'html') {
      fail(file, `contains raw HTML (${t.raw.trim().slice(0, 40)}). Use Markdown only.`);
    }
    if (t.type === 'link') {
      const href = (t as Token & { href: string }).href;
      if (/^(tel:|mailto:)/i.test(href)) return;
      const p = sitePath(href);
      if (p === null) {
        if (!/^https:\/\//i.test(href)) fail(file, `link "${href}" must be a site path like /contact or a full https:// address.`);
        return;
      }
      if (!validPaths.has(p)) fail(file, `link "${href}" points to a page that does not exist on the site.`);
    }
    if (t.type === 'image') {
      const src = (t as Token & { href: string }).href;
      if (!publicFileExists(src)) fail(file, `image "${src}" is not a file in /public.`);
    }
  });
}

type Loaded = { posts: BlogPost[]; markdown: Map<string, MarkdownPost> };
let cache: Loaded | null = null;

function load(): Loaded {
  if (cache) return cache;

  const markdownPosts = fs.existsSync(CONTENT_DIR)
    ? fs
        .readdirSync(CONTENT_DIR)
        .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
        .sort()
        .map(parseMarkdownFile)
    : [];

  // Hand-built posts must match the route folders under app/blog exactly (the dynamic
  // [slug] folder aside). Only checked where the source tree exists, i.e. at build time.
  if (fs.existsSync(APP_BLOG_DIR)) {
    const folders = fs
      .readdirSync(APP_BLOG_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('[') && fs.existsSync(path.join(APP_BLOG_DIR, d.name, 'page.tsx')))
      .map((d) => d.name);
    const legacy = LEGACY_POSTS.map((p) => p.slug);
    const unlisted = folders.filter((f) => !legacy.includes(f));
    const missing = legacy.filter((s) => !folders.includes(s));
    if (unlisted.length || missing.length) {
      throw new BlogContentError(
        `Blog list out of sync with app/blog. Folders not in LEGACY_POSTS (lib/blog-posts.ts): [${unlisted.join(', ')}]. ` +
          `LEGACY_POSTS entries with no app/blog/<slug>/page.tsx: [${missing.join(', ')}]. New posts go in content/blog as Markdown.`,
      );
    }
  }

  const all: BlogPost[] = [...LEGACY_POSTS, ...markdownPosts];
  const seen = new Set<string>();
  for (const p of all) {
    if (seen.has(p.slug)) throw new BlogContentError(`Two blog posts use the slug "${p.slug}".`);
    seen.add(p.slug);
  }

  const validPaths = new Set<string>([
    '/', '/about', '/services', '/contact', '/locations', '/privacy', '/terms', '/blog',
    ...locations.map((l) => `/locations/${l.slug}`),
    ...LANDING_PAGES.map((l) => `/${l.slug}`),
    ...all.map((p) => `/blog/${p.slug}`),
  ]);
  markdownPosts.forEach((p) => checkBody(p, validPaths));

  cache = {
    posts: all.sort((a, b) => b.datePublished.localeCompare(a.datePublished) || a.slug.localeCompare(b.slug)),
    markdown: new Map(markdownPosts.map((p) => [p.slug, p])),
  };
  return cache;
}

/** All posts, both kinds, newest first. */
export function getBlogPosts(): BlogPost[] {
  return load().posts;
}

/** Slugs rendered by app/blog/[slug] (Markdown posts only). */
export function getMarkdownSlugs(): string[] {
  return [...load().markdown.keys()];
}

export function getMarkdownPost(slug: string): MarkdownPost | undefined {
  return load().markdown.get(slug);
}

/** Repo-relative file a post comes from (for the sitemap's lastModified). */
export function blogPostSourceFile(post: BlogPost): string {
  return post.source === 'markdown' ? `content/blog/${post.slug}.md` : `app/blog/${post.slug}/page.tsx`;
}
