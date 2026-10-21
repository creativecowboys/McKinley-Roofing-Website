'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { formatPostDate, type BlogPost } from '@/lib/blog-format';

/** Homepage blog strip. The latest posts are passed in by app/page.tsx (getBlogPosts). */
const Blog: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <section id="blog" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">BLOG & NEWS</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Roofing Insights & Tips
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full group">
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-500">
                  <Calendar size={16} className="text-red-600" />
                  <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-8 flex-grow">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 font-bold text-red-600 group/btn">
                  READ MORE
                  <span className="sr-only">: {post.title}</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
