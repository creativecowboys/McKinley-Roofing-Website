import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { buildPageSchemas } from '@/lib/schema';
import PrivacyPage from '@/_pages/PrivacyPage';

const DESCRIPTION =
  'Privacy Policy for McKinley Roofing and Restoration.';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/privacy',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={buildPageSchemas({
          type: 'WebPage',
          path: '/privacy',
          name: 'Privacy Policy',
          description: DESCRIPTION,
          relation: 'publisher',
        })}
      />
      <PrivacyPage />
    </>
  );
}
