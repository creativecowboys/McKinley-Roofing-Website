import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { buildPageSchemas } from '@/lib/schema';
import ContactPage from '@/_pages/ContactPage';

const DESCRIPTION =
  'Contact McKinley Roofing and Restoration. Schedule a free roof inspection in Douglasville, GA. Call (678) 983-4455 or fill out our quick contact form.';

export const metadata: Metadata = {
  // `absolute` bypasses the layout's "%s | McKinley Roofing" template (brand is in the title).
  title: { absolute: 'Contact McKinley Roofing & Restoration for a Free Roof Inspection' },
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/contact',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={buildPageSchemas({
          type: 'ContactPage',
          path: '/contact',
          name: 'Contact McKinley Roofing & Restoration',
          description: DESCRIPTION,
          relation: 'about',
        })}
      />
      <ContactPage />
    </>
  );
}
