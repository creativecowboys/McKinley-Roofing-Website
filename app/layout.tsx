import type { Metadata } from 'next';
import { Lexend, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/contexts/ModalContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import InspectionModal from '@/components/InspectionModal';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const GA_MEASUREMENT_ID = 'G-M14NQBJTNL';

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lexend.variable} ${sourceSans.variable}`}>
      <head>
        {/*
          SearchAtlas OTTO dynamic-optimization pixel. Rendered in the root
          layout <head> so it ships in the initial HTML of EVERY route and,
          because the root layout never remounts, survives client-side
          navigation. Attributes are verbatim from SearchAtlas ("nowprocket" /
          "nitro-exclude" are cache-buster opt-outs read by third-party
          optimizers); they're spread because TSX rejects unknown attributes
          written inline. Renders as: <script nowprocket nitro-exclude ...>
        */}
        <script
          {...{ nowprocket: '', 'nitro-exclude': '' }}
          type="text/javascript"
          id="sa-dynamic-optimization"
          data-uuid="d9597706-85c6-4098-982f-53b4cd3e8ba1"
          src="https://dashboard.searchatlas.com/scripts/dynamic_optimization.js"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-white text-slate-900 overflow-x-hidden">
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        <ModalProvider>
          <ScrollToTop />
          <InspectionModal />
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
