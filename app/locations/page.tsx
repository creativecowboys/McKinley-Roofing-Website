import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { buildPageSchemas } from '@/lib/schema';
import ServiceAreasPage from '@/_pages/ServiceAreasPage';

const DESCRIPTION =
  'McKinley Roofing serves Douglasville, Carrollton, Villa Rica, Newnan, and the greater West Georgia area. Find out if we serve your location.';

export const metadata: Metadata = {
  title: 'Service Areas',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/locations',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={buildPageSchemas({
          type: 'CollectionPage',
          path: '/locations',
          name: 'Service Areas',
          description: DESCRIPTION,
          relation: 'about',
        })}
      />
      <ServiceAreasPage />
    </>
  );
}
