import type { Metadata } from 'next';
import LocationPage from '@/_pages/LocationPage';
import { getLocationBySlug, locations } from '@/data/locations';
import {
  SITE_URL,
  BUSINESS,
  buildRoofingContractorSchema,
  buildServiceSchema,
  buildFAQSchema,
  jsonLd,
} from '@/lib/schema';

// ── Static generation ─────────────────────────────────────────────────────────
// Pre-render every known city page at build time (previously these were rendered
// on-demand, which weakened them as indexable, cacheable static pages).
export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  // Use authoritative city name from data; fall back to slug parsing without the trailing state segment
  const city = location
    ? location.city
    : slug
        .replace(/-ga$/, '')
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

  // metaTitle already contains the brand, so use `absolute` to bypass the
  // layout's "%s | McKinley Roofing" template and avoid a doubled brand name.
  const title = location?.metaTitle ?? `Roofing Services in ${city}, GA | McKinley Roofing`;
  const description =
    location?.metaDescription ??
    `McKinley Roofing provides expert roof repair, replacement, and storm damage restoration in ${city}, Georgia. Get a free inspection today.`;
  const canonical = `${SITE_URL}/locations/${slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title: { absolute: title },
      description,
      url: canonical,
      siteName: 'McKinley Roofing',
      type: 'website',
      images: [
        {
          url: BUSINESS.logo,
          width: 1200,
          height: 630,
          alt: "McKinley Roofing — West Georgia's Trusted Roofers",
        },
      ],
    },
    keywords: [
      `roofing contractor ${city} GA`,
      `roof repair ${city}`,
      `roof replacement ${city} GA`,
      `${city} roofing company`,
      'storm damage restoration',
      'McKinley Roofing',
    ],
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  // Build structured data only for known cities.
  const schemas: unknown[] = [];
  if (location) {
    schemas.push(
      buildRoofingContractorSchema({
        areaServedCity: location.city,
        geo: { lat: location.lat, lng: location.lng },
      }),
    );
    schemas.push(
      buildServiceSchema({
        serviceType: 'Roofing',
        cityName: location.city,
        description: location.metaDescription,
        url: `${SITE_URL}/locations/${slug}`,
      }),
    );
    if (location.localFaqs && location.localFaqs.length > 0) {
      schemas.push(buildFAQSchema(location.localFaqs));
    }
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
      <LocationPage slug={slug} />
    </>
  );
}
