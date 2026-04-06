import type { Metadata } from 'next';
import LocationPage from '@/_pages/LocationPage';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return {
    title: `Roofing Services in ${city}, GA`,
    description: `McKinley Roofing provides expert roof repair, replacement, and storm damage restoration in ${city}, Georgia. Get a free inspection today.`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LocationPage slug={slug} />;
}
