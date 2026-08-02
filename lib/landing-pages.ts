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
      `Roof replacement in ${city}, GA by McKinley Roofing. Owens Corning materials, expert installation, and a free inspection. Request yours today.`,
    'roof-repair': (city) =>
      `Fast, reliable roof repair in ${city}, GA from McKinley Roofing. We fix leaks, damaged shingles, and flashing. Schedule a free inspection today.`,
    'storm-damage-restoration': (city) =>
      `Storm damage restoration in ${city}, GA from McKinley Roofing. We inspect wind and hail damage and help with insurance claims. Book a free inspection.`,
    'gutter-installation': (city) =>
      `Professional seamless gutter installation in ${city}, GA by McKinley Roofing. Protect your roof and foundation from Georgia rain. Get a free estimate.`,
    'siding-installation': (city) =>
      `Expert siding installation and repair in ${city}, GA by McKinley Roofing. Protect and refresh your home with a free inspection and honest guidance.`,
    'roof-maintenance': (city) =>
      `Professional roof maintenance in ${city}, GA from McKinley Roofing. Catch small problems early with inspections and practical repairs. Book today.`,
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
