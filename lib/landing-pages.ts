// lib/landing-pages.ts
// Exports every service×city combination for static generation.

export type ServiceSlug =
  | 'roof-replacement'
  | 'roof-repair'
  | 'storm-damage-restoration'
  | 'gutter-installation'
  | 'siding-installation'
  | 'roof-maintenance';

export interface LandingPageConfig {
  serviceName: string;
  serviceSlug: ServiceSlug;
  cityName: string;
  citySlug: string;
  /** The full page slug used in the URL: /[slug] */
  slug: string;
  /** Unique ~155-char meta description for this page */
  metaDescription: string;
}

// ─── Services ─────────────────────────────────────────────────────────────────

const SERVICES: { name: string; slug: ServiceSlug; allCities: boolean }[] = [
  { name: 'Roof Replacement', slug: 'roof-replacement', allCities: true },
  { name: 'Roof Repair', slug: 'roof-repair', allCities: true },
  { name: 'Storm Damage Restoration', slug: 'storm-damage-restoration', allCities: true },
  { name: 'Gutter Installation', slug: 'gutter-installation', allCities: true },
  { name: 'Siding Installation & Repair', slug: 'siding-installation', allCities: false },
  { name: 'Roof Maintenance', slug: 'roof-maintenance', allCities: false },
];

// ─── Cities ────────────────────────────────────────────────────────────────────
// "first 6" cities for Siding and Roof Maintenance

interface City { name: string; slug: string }

const ALL_CITIES: City[] = [
  { name: 'Douglasville', slug: 'douglasville' },
  { name: 'Carrollton',   slug: 'carrollton'   },
  { name: 'Villa Rica',   slug: 'villa-rica'   },
  { name: 'Newnan',       slug: 'newnan'        },
  { name: 'Hiram',        slug: 'hiram'         },
  { name: 'Powder Springs', slug: 'powder-springs' },
  // Below are excluded for Siding & Roof Maintenance
  { name: 'Dallas',        slug: 'dallas'        },
  { name: 'Lithia Springs', slug: 'lithia-springs' },
  { name: 'Austell',       slug: 'austell'       },
  { name: 'Bremen',        slug: 'bremen'        },
];

const FIRST_SIX_CITIES: City[] = ALL_CITIES.slice(0, 6);

// ─── Meta description templates ───────────────────────────────────────────────

function buildMetaDescription(serviceName: string, cityName: string, serviceSlug: ServiceSlug): string {
  const templates: Record<ServiceSlug, (city: string) => string> = {
    'roof-replacement': (city) =>
      `Need a new roof in ${city}, GA? McKinley Roofing delivers expert roof replacement with Owens Corning materials, lifetime workmanship warranty, and a free inspection. Call today.`,
    'roof-repair': (city) =>
      `Fast, reliable roof repair in ${city}, GA by McKinley Roofing. We fix leaks, damaged shingles, and more — backed by a lifetime workmanship warranty. Get your free estimate.`,
    'storm-damage-restoration': (city) =>
      `Storm damage to your roof in ${city}, GA? McKinley Roofing provides rapid storm damage restoration, insurance claim assistance, and a free damage inspection. Call (678) 983-4455.`,
    'gutter-installation': (city) =>
      `Protect your home with professional gutter installation in ${city}, GA. McKinley Roofing installs seamless gutters built to handle Georgia's heavy rains. Free estimates available.`,
    'siding-installation': (city) =>
      `Upgrade your home's curb appeal with expert siding installation & repair in ${city}, GA. McKinley Roofing is fully insured with a lifetime workmanship warranty. Get a free quote.`,
    'roof-maintenance': (city) =>
      `Extend your roof's life with professional maintenance in ${city}, GA. McKinley Roofing's maintenance plans catch small issues before they become costly repairs. Book today.`,
  };
  return templates[serviceSlug](cityName);
}

// ─── Build the page configs ────────────────────────────────────────────────────

function buildLandingPages(): LandingPageConfig[] {
  const pages: LandingPageConfig[] = [];

  for (const service of SERVICES) {
    const cities = service.allCities ? ALL_CITIES : FIRST_SIX_CITIES;

    for (const city of cities) {
      const slug = `${service.slug}-${city.slug}-ga`;
      pages.push({
        serviceName: service.name,
        serviceSlug: service.slug,
        cityName: city.name,
        citySlug: city.slug,
        slug,
        metaDescription: buildMetaDescription(service.name, city.name, service.slug),
      });
    }
  }

  return pages;
}

export const LANDING_PAGES: LandingPageConfig[] = buildLandingPages();

/** Quick lookup: slug → config */
export const LANDING_PAGE_MAP: Record<string, LandingPageConfig> = Object.fromEntries(
  LANDING_PAGES.map((p) => [p.slug, p])
);
