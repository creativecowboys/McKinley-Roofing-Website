import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Phone } from 'lucide-react';
import type { Token } from 'marked';
import BlogMarkdown, { BlogInline } from '@/components/BlogMarkdown';
import { formatPostDate, type MarkdownPost } from '@/lib/blog-posts';

/**
 * Layout for a Markdown blog post, copied from the hand-built insurance-claims post
 * (_pages/BlogInsuranceClaimsPage.tsx): photo hero with category tag, H1 and date; the
 * body; "Frequently Asked Questions" cards from the front matter; the dark closing CTA box.
 *
 * Closing CTA: if the body's last "## " section contains a phone link (tel:), that section
 * becomes the CTA box (its heading is the box title, its text the box text). Otherwise the
 * box uses the standard "Schedule Your Free Roof Inspection Today" copy.
 */

function hasTelLink(tokens: Token[]): boolean {
  return tokens.some((t) => {
    const c = t as Token & { href?: string; tokens?: Token[]; items?: Token[] };
    if (t.type === 'link' && typeof c.href === 'string' && /^tel:/i.test(c.href)) return true;
    return (c.tokens ? hasTelLink(c.tokens) : false) || (c.items ? hasTelLink(c.items) : false);
  });
}

function splitClosingCta(tokens: Token[]): { body: Token[]; ctaHeading?: Token; ctaBody?: Token[] } {
  let last = -1;
  tokens.forEach((t, i) => {
    if (t.type === 'heading' && (t as Token & { depth: number }).depth === 2) last = i;
  });
  if (last === -1) return { body: tokens };
  const rest = tokens.slice(last + 1);
  if (!hasTelLink(rest)) return { body: tokens };
  return { body: tokens.slice(0, last), ctaHeading: tokens[last], ctaBody: rest };
}

export default function BlogArticle({ post }: { post: MarkdownPost }) {
  const { body, ctaHeading, ctaBody } = splitClosingCta(post.tokens);

  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover"
          style={{ objectPosition: `center ${post.imagePosition}` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-10 md:p-16">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 mt-4 text-slate-300 text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={14} aria-hidden="true" />
                <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" /> Douglasville, GA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm mb-10 hover:underline">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Blog
        </Link>

        <BlogMarkdown tokens={body} leadFirstParagraph />

        {post.faqs.length > 0 && (
          <>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6 mb-4">
              {post.faqs.map((faq) => (
                <div key={faq.question} className="bg-slate-50 border border-slate-100 rounded-2xl p-7">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTA box */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-10 md:p-14 text-white text-center">
          {ctaHeading && ctaBody ? (
            <>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                <BlogInline tokens={(ctaHeading as Token & { tokens: Token[] }).tokens} tone="dark" />
              </h2>
              <div className="mb-8">
                <BlogMarkdown tokens={ctaBody} tone="dark" />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Schedule Your Free Roof Inspection Today</h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                Don&apos;t wait for a small problem to become a big one. Whether you&apos;ve noticed signs of damage, want a
                professional assessment, or are considering a full replacement, McKinley Roofing and Restoration is here to help.
              </p>
            </>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:6789834455"
              className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all inline-flex items-center gap-3"
            >
              <Phone size={20} aria-hidden="true" /> (678) 983-4455
            </a>
            <Link
              href="/contact"
              className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Contact Us Online
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-6">McKinley Roofing and Restoration · Douglasville, GA</p>
        </div>
      </div>
    </main>
  );
}
