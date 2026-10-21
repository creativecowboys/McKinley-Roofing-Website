import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Phone } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, buildPageSchemas, businessRef } from '@/lib/schema';
import { formatPostDate, getBlogPosts } from '@/lib/blog-posts';

const CANONICAL = `${SITE_URL}/blog`;
const DESCRIPTION =
  'Roofing tips and homeowner guides from McKinley Roofing in Douglasville, GA: insurance claims, storm damage, and roof care advice for West Georgia homes.';

export const metadata: Metadata = {
  title: 'Roofing Blog & Homeowner Guides',
  description: DESCRIPTION,
  openGraph: {
    title: 'Roofing Blog & Homeowner Guides | McKinley Roofing',
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
  },
  alternates: {
    canonical: CANONICAL,
  },
};

export default function Page() {
  const posts = getBlogPosts();

  // CollectionPage + BreadcrumbList (Home > Blog), with the Blog and its posts as the
  // page's main entity.
  const [page, breadcrumb] = buildPageSchemas({
    type: 'CollectionPage',
    path: '/blog',
    name: 'Blog',
    description: DESCRIPTION,
    relation: 'publisher',
  });
  const collection = {
    ...(page as Record<string, unknown>),
    mainEntity: {
      '@type': 'Blog',
      '@id': `${CANONICAL}#blog`,
      name: 'McKinley Roofing Blog',
      url: CANONICAL,
      publisher: businessRef(),
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.datePublished,
        image: `${SITE_URL}${post.image}`,
      })),
    },
  };

  return (
    <>
      <JsonLd schemas={[collection, breadcrumb]} />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Roofing Insights &amp; Tips</h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Practical advice for homeowners in Douglasville and West Georgia, from insurance claims after a storm to
                keeping your roof in good shape.
              </p>
            </div>
          </div>
        </section>

        {/* Posts, newest first */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const href = `/blog/${post.slug}`;
                return (
                  <li key={post.slug}>
                    <article className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full group">
                      <Link href={href} className="block relative overflow-hidden aspect-[16/10]" tabIndex={-1} aria-hidden="true">
                        <img
                          src={post.image}
                          alt=""
                          width={1024}
                          height={640}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm font-semibold text-slate-500">
                          <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-red-600" aria-hidden="true" />
                            <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">
                          <Link href={href}>{post.title}</Link>
                        </h2>
                        <p className="text-slate-600 mb-8 flex-grow">{post.excerpt}</p>
                        <Link href={href} className="flex items-center gap-2 font-bold text-red-600 group/btn w-fit">
                          READ MORE
                          <span className="sr-only">: {post.title}</span>
                          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-red-100 mb-8">
              Contact us today for a free roof inspection and customized solution for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors duration-200 shadow-lg"
              >
                Request Free Inspection
              </Link>
              <a
                href="tel:6789834455"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition-colors duration-200 border-2 border-white/20"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                (678) 983-4455
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
