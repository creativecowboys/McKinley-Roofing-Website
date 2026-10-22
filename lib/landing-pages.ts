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
      `Storm damage restoration in ${city}, GA from McKinley Roofing. We inspect and document wind and hail damage for insurance claims. Book a free inspection.`,
    'gutter-installation': (city) =>
      `Professional seamless gutter installation in ${city}, GA by McKinley Roofing. Protect your roof and foundation from Georgia rain. Get a free estimate.`,
    'siding-installation': (city) =>
      `Expert siding installation and repair in ${city}, GA by McKinley Roofing. Protect and refresh your home with a free inspection and honest guidance.`,
    'roof-maintenance': (city) =>
      `Professional roof maintenance in ${city}, GA from McKinley Roofing. Catch small problems early with inspections and practical repairs. Book today.`,
  };
  return templates[serviceSlug](cityName);
}

// Hand-tuned meta descriptions for specific pages. These take precedence over
// the service templates above. (Moved into code from Search Atlas OTTO, which
// used to rewrite them in the browser; they now ship in the server HTML.)
const META_DESCRIPTION_OVERRIDES: Record<string, string> = {
  'roof-replacement-douglasville-ga':
    'Roof replacement in Douglasville, GA by McKinley Roofing. Owens Corning materials, lifetime workmanship warranty, free inspection. Call (678) 983-4455.',
  'roof-repair-douglasville-ga':
    'Roof repair in Douglasville, GA from McKinley Roofing. We fix leaks, damaged shingles, and flashing. Schedule a free roof inspection: (678) 983-4455.',
  'storm-damage-restoration-douglasville-ga':
    'McKinley Roofing offers storm damage roof repair in Douglasville, GA. We inspect and document wind and hail damage for insurance claims. Book your free roof inspection today.',
  'gutter-installation-douglasville-ga':
    'Gutter installation and repair in Douglasville, GA by McKinley Roofing. Protect your roof and foundation from water damage. Call (678) 983-4455.',
  'siding-installation-douglasville-ga':
    'Expert siding installation and repair in Douglasville, GA by McKinley Roofing. Durable materials, quality workmanship. Schedule your free inspection today.',
  'roof-maintenance-douglasville-ga':
    "Roof maintenance in Douglasville, GA by McKinley Roofing. Catch small problems early and extend your roof's life. Schedule a free inspection today.",
};

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
        metaDescription:
          META_DESCRIPTION_OVERRIDES[slug] ??
          buildMetaDescription(service.name, city.name, service.slug),
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
