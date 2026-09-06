import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { locations } from '@/data/locations';
import { LANDING_PAGES } from '@/lib/landing-pages';

// Server-rendered link grid so every location page (and its service pages) is
// reachable from the homepage in crawlable HTML. The Leaflet map below it is
// client-only and exposes no links to Googlebot.
const CORE_SERVICES: { slug: string; label: string }[] = [
  { slug: 'roof-repair', label: 'Roof Repair' },
  { slug: 'roof-replacement', label: 'Roof Replacement' },
  { slug: 'storm-damage-restoration', label: 'Storm Damage' },
  { slug: 'gutter-installation', label: 'Gutters' },
  { slug: 'siding-installation', label: 'Siding' },
];

export default function ServiceAreaLinks() {
  const ordered = [...locations].sort((a, b) => (b.isHQ ? 1 : 0) - (a.isHQ ? 1 : 0));

  return (
    <div className="mb-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">SERVICE AREAS</span>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Cities We Serve in West Georgia</h2>
        <p className="text-slate-600 text-lg">Select your city for local roofing services.</p>
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ordered.map((loc) => {
          const city = loc.slug.replace(/-ga$/, '');
          const available = CORE_SERVICES.filter((s) =>
            LANDING_PAGES.some((p) => p.citySlug === city && p.serviceSlug === s.slug)
          );
          return (
            <li key={loc.slug} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <Link
                href={`/locations/${loc.slug}`}
                className="flex items-center gap-2 text-xl font-bold text-slate-900 hover:text-red-600 transition-colors"
              >
                <MapPin size={18} className="text-red-600 shrink-0" />
                {loc.city}, {loc.state}
              </Link>
              <p className="text-sm text-slate-500 mt-1">{loc.county}</p>
              {available.length > 0 && (
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {available.map((s, i) => (
                    <span key={s.slug}>
                      <Link
                        href={`/${s.slug}-${loc.slug}`}
                        className="hover:text-red-600 underline-offset-2 hover:underline"
                      >
                        {s.label}
                      </Link>
                      {i < available.length - 1 && <span className="mx-1.5 text-slate-300">·</span>}
                    </span>
                  ))}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
