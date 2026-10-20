import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { buildPageSchemas } from '@/lib/schema';
import ServicesPage from '@/_pages/ServicesPage';

const DESCRIPTION =
  'McKinley Roofing services: roof repair, replacement, storm damage restoration, roof maintenance, gutters, and siding in Douglasville and West Georgia.';

export const metadata: Metadata = {
  title: 'Roofing Services',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/services',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={buildPageSchemas({
          type: 'WebPage',
          path: '/services',
          name: 'Roofing Services',
          description: DESCRIPTION,
          relation: 'about',
        })}
      />
      <ServicesPage />
    </>
  );
}
