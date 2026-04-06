import type { Metadata } from 'next';
import AboutPage from '@/_pages/AboutPage';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about McKinley Roofing and Restoration — a family-owned roofing company serving Douglasville, GA and West Georgia with quality, honesty, and local expertise.',
};

export default function Page() {
  return <AboutPage />;
}
