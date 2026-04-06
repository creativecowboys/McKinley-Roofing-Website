import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { LANDING_PAGES, LANDING_PAGE_MAP } from '@/lib/landing-pages';
import LandingPage from '@/components/LandingPage';
import { getFAQs } from '@/lib/landing-page-faqs';

// ── Static generation ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = LANDING_PAGE_MAP[slug];

  if (!page) {
    return { title: 'Page Not Found' };
  }

  const canonical = `https://www.mckinleyroofing.net/${page.slug}`;
  const ogImage = 'https://www.mckinleyroofing.net/McKinley_logo.png';

  return {
    // Fix #1 — no duplicate brand name
    title: `${page.serviceName} in ${page.cityName}, GA | McKinley Roofing`,
    description: page.metaDescription,
    openGraph: {
      title: `${page.serviceName} in ${page.cityName}, GA | McKinley Roofing`,
      description: page.metaDescription,
      // Fix #2 — canonical with www
      url: canonical,
      // Fix #3 — OG image
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'McKinley Roofing — West Georgia\'s Trusted Roofers',
        },
      ],
      siteName: 'McKinley Roofing',
      type: 'website',
    },
    // Fix #2 — canonical with www
    alternates: {
      canonical,
    },
    keywords: [
      `${page.serviceName.toLowerCase()} ${page.cityName} GA`,
      `roofing contractor ${page.cityName} GA`,
      `${page.serviceName.toLowerCase()} West Georgia`,
      'McKinley Roofing',
      `${page.cityName} roofing company`,
      `roof repair ${page.cityName}`,
    ],
  };
}

// ── Page component ─────────────────────────────────────────────────────────────

export default async function LandingPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = LANDING_PAGE_MAP[slug];

  if (!page) {
    notFound();
  }

  const faqs = getFAQs(page.serviceSlug, page.cityName);
  const pageUrl = `https://www.mckinleyroofing.net/${page.slug}`;

  // Fix #4 — LocalBusiness + Service schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: 'McKinley Roofing',
    url: 'https://www.mckinleyroofing.net',
    telephone: '+16789834455',
    email: 'mckinleyrandr@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Douglasville',
      addressRegion: 'GA',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: page.cityName,
      containedInPlace: {
        '@type': 'State',
        name: 'Georgia',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '70',
    },
    sameAs: [
      'https://www.facebook.com/mckinleyroofing',
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.serviceName,
    serviceType: page.serviceName,
    provider: {
      '@type': 'RoofingContractor',
      name: 'McKinley Roofing',
      url: 'https://www.mckinleyroofing.net',
      telephone: '+16789834455',
    },
    areaServed: {
      '@type': 'City',
      name: page.cityName,
      containedInPlace: {
        '@type': 'State',
        name: 'Georgia',
      },
    },
    description: page.metaDescription,
    url: pageUrl,
  };

  // Fix #5 — FAQPage schema
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
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="schema-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPage page={page} faqs={faqs} />
    </>
  );
}
