import type { Metadata } from 'next';
import PrivacyPage from '@/_pages/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for McKinley Roofing and Restoration.',
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/privacy',
  },
};

export default function Page() {
  return <PrivacyPage />;
}
