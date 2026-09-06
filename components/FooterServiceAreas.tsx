import Link from 'next/link';
import { locations } from '@/data/locations';

// Server component: a sitewide, crawlable row of links to every location page.
// Kept out of the client-side Footer bundle so the location copy isn't shipped
// to the browser on every page.
export default function FooterServiceAreas() {
  const ordered = [...locations].sort((a, b) => (b.isHQ ? 1 : 0) - (a.isHQ ? 1 : 0));
  return (
    <div className="mb-12">
      <h4 className="text-sm font-semibold text-slate-500 uppercase mb-4">Service Areas</h4>
      <p className="text-slate-400 text-sm leading-8">
        {ordered.map((loc, i) => (
          <span key={loc.slug}>
            <Link href={`/locations/${loc.slug}`} className="hover:text-red-500 transition-colors">
              {loc.city}, {loc.state}
            </Link>
            {i < ordered.length - 1 && <span className="mx-2 text-slate-700">·</span>}
          </span>
        ))}
      </p>
    </div>
  );
}
