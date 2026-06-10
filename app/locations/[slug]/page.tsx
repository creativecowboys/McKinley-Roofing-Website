import type { Metadata } from 'next';
import LocationPage from '@/_pages/LocationPage';
import { getLocationBySlug } from '@/data/locations';

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

  return {
    title: location?.metaTitle ?? `Roofing Services in ${city}, GA | McKinley Roofing`,
    description: location?.metaDescription ?? `McKinley Roofing provides expert roof repair, replacement, and storm damage restoration in ${city}, Georgia. Get a free inspection today.`,
    alternates: {
      canonical: `https://www.mckinleyroofing.net/locations/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LocationPage slug={slug} />;
}
