import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { buildPageSchemas } from '@/lib/schema';
import TermsPage from '@/_pages/TermsPage';

const DESCRIPTION =
  'Terms and Conditions for McKinley Roofing and Restoration services.';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/terms',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={buildPageSchemas({
          type: 'WebPage',
          path: '/terms',
          name: 'Terms & Conditions',
          description: DESCRIPTION,
          relation: 'publisher',
        })}
      />
      <TermsPage />
    </>
  );
}
