import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import BlogArticle from '@/components/BlogArticle';
import { SITE_URL, businessRef, buildBreadcrumbSchema, buildFAQSchema } from '@/lib/schema';
import { getMarkdownPost, getMarkdownSlugs } from '@/lib/blog-posts';

// Markdown posts from content/blog. The two hand-built posts keep their own route folders
// (app/blog/<slug>/), which take precedence over this dynamic route.
export const dynamicParams = false;

export function generateStaticParams() {
  return getMarkdownSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getMarkdownPost(slug);
  if (!post) return {};
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  return {
    // seoTitle is a complete <title>; without it the layout adds " | McKinley Roofing".
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.metaDescription,
      url: canonical,
      images: [post.image],
      type: 'article',
      publishedTime: post.datePublished,
      ...(post.dateModified ? { modifiedTime: post.dateModified } : {}),
    },
    alternates: { canonical },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getMarkdownPost(slug);
  if (!post) notFound();

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    mainEntityOfPage: canonical,
    inLanguage: 'en-US',
    articleSection: post.category,
    author: businessRef(),
    publisher: businessRef(),
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: canonical },
  ]);
  const schemas: unknown[] = [article, breadcrumb];
  if (post.faqs.length) schemas.push(buildFAQSchema(post.faqs));

  return (
    <>
      <JsonLd schemas={schemas} />
      <BlogArticle post={post} />
    </>
  );
}
