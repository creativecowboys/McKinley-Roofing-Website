import type { Metadata } from 'next';
import BlogInsuranceClaimsPage from '@/_pages/BlogInsuranceClaimsPage';
import { insuranceClaimFaqs as faqs } from '@/lib/blog-insurance-faqs';

const canonical = 'https://www.mckinleyroofing.net/blog/how-roofing-insurance-claims-work-in-georgia';

export const metadata: Metadata = {
  title: 'How Roofing Insurance Claims Work in Georgia: A Homeowner\'s Guide',
  description:
    'What Georgia homeowners insurance covers on your roof, the claim process step by step, ACV vs RCV, and the mistakes that get storm damage claims denied.',
  openGraph: {
    title: 'How Roofing Insurance Claims Work in Georgia: A Homeowner\'s Guide',
    description:
      'ACV vs RCV, deductibles, adjuster meetings, and why legitimate roof claims get denied — a practical guide from McKinley Roofing in Douglasville, GA.',
    images: ['/blog_storm_damage_roofing.png'],
    type: 'article',
  },
  alternates: {
    canonical,
  },
};

export default function Page() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Roofing Insurance Claims Work in Georgia: A Homeowner\'s Guide',
    description:
      'What Georgia homeowners insurance covers on your roof, the claim process step by step, ACV vs RCV, and the mistakes that get storm damage claims denied.',
    image: 'https://www.mckinleyroofing.net/blog_storm_damage_roofing.png',
    datePublished: '2026-08-09',
    dateModified: '2026-08-09',
    mainEntityOfPage: canonical,
    author: {
      '@type': 'Organization',
      name: 'McKinley Roofing and Restoration',
      url: 'https://www.mckinleyroofing.net',
    },
    publisher: {
      '@type': 'Organization',
      name: 'McKinley Roofing and Restoration',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mckinleyroofing.net/McKinley_logo.png',
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BlogInsuranceClaimsPage />
    </>
  );
}
