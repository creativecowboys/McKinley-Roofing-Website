import type { Metadata } from 'next';
import TermsPage from '@/_pages/TermsPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for McKinley Roofing and Restoration services.',
};

export default function Page() {
  return <TermsPage />;
}
