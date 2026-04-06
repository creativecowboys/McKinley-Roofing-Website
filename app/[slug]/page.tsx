import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LANDING_PAGES, LANDING_PAGE_MAP } from '@/lib/landing-pages';
import LandingPage from '@/components/LandingPage';

// ── Static generation ─────────────────────────────────────────────────────────

/** Tell Next.js which slugs to pre-render at build time */
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

  return {
    title: `${page.serviceName} in ${page.cityName}, GA | McKinley Roofing`,
    description: page.metaDescription,
    openGraph: {
      title: `${page.serviceName} in ${page.cityName}, GA | McKinley Roofing`,
      description: page.metaDescription,
      url: `https://mckinleyroofing.com/${page.slug}`,
    },
    alternates: {
      canonical: `https://mckinleyroofing.com/${page.slug}`,
    },
    keywords: [
      `${page.serviceName.toLowerCase()} ${page.cityName} GA`,
      `roofing contractor ${page.cityName} GA`,
      `${page.serviceName.toLowerCase()} West Georgia`,
      'McKinley Roofing',
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

  return <LandingPage page={page} />;
}
