import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { buildPageSchemas } from '@/lib/schema';
import AboutPage from '@/_pages/AboutPage';

const DESCRIPTION =
  'McKinley Roofing & Restoration is a family-owned roofing contractor in Douglasville, GA, serving West Georgia. Owens Corning Preferred. Call (678) 983-4455.';

export const metadata: Metadata = {
  // `absolute` bypasses the layout's "%s | McKinley Roofing" template: the
  // title already carries the brand and ends in the city.
  title: { absolute: 'About McKinley Roofing & Restoration | Douglasville, GA' },
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/about',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={buildPageSchemas({
          type: 'AboutPage',
          path: '/about',
          name: 'About McKinley Roofing & Restoration',
          description: DESCRIPTION,
          relation: 'about',
        })}
      />
      <AboutPage />
    </>
  );
}
