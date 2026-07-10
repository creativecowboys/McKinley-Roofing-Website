// Centralized structured-data (JSON-LD) builders and business facts.
// Single source of truth for NAP (name/address/phone) so schema stays
// consistent across the homepage, location pages, and landing pages.

export const SITE_URL = 'https://www.mckinleyroofing.net';

export const BUSINESS = {
  name: 'McKinley Roofing',
  legalName: 'McKinley Roofing and Restoration',
  url: SITE_URL,
  telephone: '+16789834455',
  email: 'mckinleyrandr@gmail.com',
  addressLocality: 'Douglasville',
  addressRegion: 'GA',
  addressCountry: 'US',
  logo: `${SITE_URL}/McKinley_logo.png`,
  ratingValue: '4.9',
  reviewCount: '70',
  sameAs: ['https://www.facebook.com/mckinleyroofing'],
} as const;

const postalAddress = {
  '@type': 'PostalAddress',
  addressLocality: BUSINESS.addressLocality,
  addressRegion: BUSINESS.addressRegion,
  addressCountry: BUSINESS.addressCountry,
};

/**
 * RoofingContractor (LocalBusiness) schema.
 * Pass a city to scope `areaServed` to a specific location page; omit it on
 * the homepage to describe the broader West Georgia service area.
 */
export function buildRoofingContractorSchema(opts?: {
  areaServedCity?: string;
  geo?: { lat: number; lng: number };
}) {
  const areaServed = opts?.areaServedCity
    ? {
        '@type': 'City',
        name: opts.areaServedCity,
        containedInPlace: { '@type': 'State', name: 'Georgia' },
      }
    : {
        '@type': 'State',
        name: 'Georgia',
      };

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    image: BUSINESS.logo,
    address: postalAddress,
    areaServed,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS.ratingValue,
      reviewCount: BUSINESS.reviewCount,
    },
    sameAs: [...BUSINESS.sameAs],
  };

  if (opts?.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: opts.geo.lat,
      longitude: opts.geo.lng,
    };
  }

  return schema;
}

/** Service schema scoped to a city, provided by McKinley Roofing. */
export function buildServiceSchema(opts: {
  serviceType: string;
  cityName: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.serviceType,
    serviceType: opts.serviceType,
    provider: {
      '@type': 'RoofingContractor',
      name: BUSINESS.name,
      url: BUSINESS.url,
      telephone: BUSINESS.telephone,
    },
    areaServed: {
      '@type': 'City',
      name: opts.cityName,
      containedInPlace: { '@type': 'State', name: 'Georgia' },
    },
    description: opts.description,
    url: opts.url,
  };
}

/** FAQPage schema from a list of question/answer pairs. */
export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * Serialize a JSON-LD object for a native <script> tag.
 * Escapes `<` per Next.js guidance to avoid XSS via injected content.
 */
export function jsonLd(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
