import type { Metadata } from 'next';
import ServiceAreasPage from '@/_pages/ServiceAreasPage';

export const metadata: Metadata = {
  title: 'Service Areas',
  description:
    'McKinley Roofing serves Douglasville, Carrollton, Villa Rica, Newnan, and the greater West Georgia area. Find out if we serve your location.',
};

export default function Page() {
  return <ServiceAreasPage />;
}
