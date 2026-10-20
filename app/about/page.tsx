import type { Metadata } from 'next';
import AboutPage from '@/_pages/AboutPage';

export const metadata: Metadata = {
  // `absolute` bypasses the layout's "%s | McKinley Roofing" template: the
  // title already carries the brand and ends in the city.
  title: { absolute: 'About McKinley Roofing & Restoration | Douglasville, GA' },
  description:
    'Learn about McKinley Roofing and Restoration — a family-owned roofing company serving Douglasville, GA and West Georgia with quality, honesty, and local expertise.',
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/about',
  },
};

export default function Page() {
  return <AboutPage />;
}
