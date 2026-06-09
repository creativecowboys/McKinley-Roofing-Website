import type { Metadata } from 'next';
import TermsPage from '@/_pages/TermsPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for McKinley Roofing and Restoration services.',
  alternates: {
    canonical: 'https://www.mckinleyroofing.net/terms',
  },
};

export default function Page() {
  return <TermsPage />;
}
