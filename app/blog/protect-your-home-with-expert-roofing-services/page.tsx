import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, businessRef, buildBreadcrumbSchema } from '@/lib/schema';
import BlogProtectYourHomePage from '@/_pages/BlogProtectYourHomePage';

export const metadata: Metadata = {
  title: 'Protect Your Home with Expert Roofing Services',
  description:
    'McKinley Roofing explains why expert roof care is essential — covering repair, storm damage restoration, full replacement, and gutter services in Douglasville, GA.',
  openGraph: {
    title: 'Protect Your Home with Expert Roofing Services',
    description:
      'Expert roofing services protect your family and your investment. Learn from McKinley Roofing about repair, replacement, and storm restoration in West Georgia.',
    images: ['/blog_hero_roofing.webp'],
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/blog/protect-your-home-with-expert-roofing-services',
  },
};

const CANONICAL = 'https://www.mckinleyroofing.net/blog/protect-your-home-with-expert-roofing-services';
const HEADLINE = 'Protect Your Home with Expert Roofing Services';

export default function Page() {
  const post = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${CANONICAL}#article`,
    headline: HEADLINE,
    description:
      'McKinley Roofing explains why expert roof care is essential — covering repair, storm damage restoration, full replacement, and gutter services in Douglasville, GA.',
    image: `${SITE_URL}/blog_hero_roofing.webp`,
    // Date shown on the page itself (August 23, 2025).
    datePublished: '2025-08-23',
    mainEntityOfPage: CANONICAL,
    inLanguage: 'en-US',
    author: businessRef(),
    publisher: businessRef(),
  };
  return (
    <>
      <JsonLd
        schemas={[
          post,
          buildBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: HEADLINE, url: CANONICAL },
          ]),
        ]}
      />
      <BlogProtectYourHomePage />
    </>
  );
}
