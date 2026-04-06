import type { Metadata } from 'next';
import ContactPage from '@/_pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact McKinley Roofing and Restoration. Schedule a free roof inspection in Douglasville, GA. Call (678) 983-4455 or fill out our quick contact form.',
};

export default function Page() {
  return <ContactPage />;
}
