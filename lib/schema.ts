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
  // NOTE: no ratingValue/reviewCount here. The 4.9★ / 70+ reviews live on
  // Google (third party). Marking them up as first-party AggregateRating
  // violates Google's structured-data policy and risks a manual action —
  // only add ratings if the site ever hosts its own first-party reviews.
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

/**
 * The single sitewide LocalBusiness node — emitted ONCE, on the homepage.
 *
 * Richer than the per-location `buildRoofingContractorSchema`: full legal
 * name, precise Google Business Profile geo, an explicit service-area list, a
 * service catalog, and the GBP map link via `sameAs`.
 *
 * Intentionally OMITS `aggregateRating`/`Review`: the 4.9★ / 70+ reviews live
 * on Google (third party). Marking third-party reviews up as first-party
 * violates Google's structured-data guidelines and risks a manual action.
 * Only add ratings here if the site ever hosts its own first-party reviews.
 *
 * `streetAddress` is omitted because no verified street address exists in the
 * repo/CMS — locality/region/country only, rather than guessing.
 */
export function buildHomeLocalBusinessSchema() {
  const areaServed = [
    'Douglasville', 'Carrollton', 'Villa Rica', 'Newnan', 'Bremen', 'Dallas',
    'Hiram', 'Lithia Springs', 'Austell', 'Powder Springs', 'Temple', 'Bowdon',
  ];
  const services = [
    'Roof Repair', 'Roof Replacement', 'Storm Damage Restoration',
    'Gutter Installation', 'Siding Installation', 'Roof Maintenance',
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: 'McKinley Roofing & Restoration',
    url: SITE_URL,
    telephone: '+1-678-983-4455',
    email: BUSINESS.email,
    image: BUSINESS.logo,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Douglasville',
      addressRegion: 'GA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.6633281,
      longitude: -84.7910462,
    },
    areaServed: areaServed.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'State', name: 'Georgia' },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Roofing Services',
      itemListElement: services.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
    sameAs: [
      'https://www.google.com/maps/place/McKinley+Roofing+and+Restoration/@33.6633281,-84.7910462,17z/',
      'https://www.facebook.com/mckinleyroofing',
    ],
  };
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
