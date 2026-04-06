import type { Metadata } from 'next';
import ServicesPage from '@/_pages/ServicesPage';

export const metadata: Metadata = {
  title: 'Roofing Services',
  description:
    'Full-service roofing from McKinley Roofing — roof repair, replacement, storm damage restoration, gutter installation, and siding in Douglasville, GA and West Georgia.',
};

export default function Page() {
  return <ServicesPage />;
}
