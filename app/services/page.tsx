import type { Metadata } from 'next';
import ServicesPage from '@/_pages/ServicesPage';

export const metadata: Metadata = {
  title: 'Roofing Services',
  description:
    'McKinley Roofing services: roof repair, replacement, storm damage restoration, roof maintenance, gutters, and siding in Douglasville and West Georgia.',
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/services',
  },
};

export default function Page() {
  return <ServicesPage />;
}
