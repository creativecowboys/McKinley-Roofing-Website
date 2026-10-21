import type { Metadata } from 'next';
import { Lexend, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/contexts/ModalContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FooterServiceAreas from '@/components/FooterServiceAreas';
import ScrollToTop from '@/components/ScrollToTop';
import InspectionModal from '@/components/InspectionModal';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import PhoneClickTracker from '@/components/PhoneClickTracker';

const GA_MEASUREMENT_ID = 'G-P2JLRF5PYX';
// Analytics load only on the production deployment, so Vercel previews and local builds
// never send hits to McKinley's GA4 property. Pages are static, so this is decided at build
// time (Vercel exposes VERCEL_ENV to the build).
const LOAD_ANALYTICS = process.env.VERCEL_ENV === 'production';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "McKinley Roofing | West Georgia's Trusted Roofers",
    template: '%s | McKinley Roofing',
  },
  description:
    'Expert roofing services in Douglasville, GA. Roof repair, replacement, and storm damage restoration. Serving Douglasville and the greater West Georgia area.',
  metadataBase: new URL('https://www.mckinleyroofing.net'),
  openGraph: {
    siteName: 'McKinley Roofing & Restoration',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.mckinleyroofing.net/McKinley_logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lexend.variable} ${sourceSans.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-white text-slate-900 overflow-x-hidden">
        {LOAD_ANALYTICS && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
        <PhoneClickTracker />
        <ModalProvider>
          <ScrollToTop />
          <InspectionModal />
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer serviceAreas={<FooterServiceAreas />} />
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
