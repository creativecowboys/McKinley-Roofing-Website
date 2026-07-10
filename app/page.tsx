import type { Metadata } from 'next';
import { buildRoofingContractorSchema, jsonLd } from '@/lib/schema';
import Hero from '@/components/Hero';
import Certifications from '@/components/Certifications';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Portfolio from '@/components/Portfolio';
import CTASection from '@/components/CTASection';
import Blog from '@/components/Blog';
import ServiceAreaMapClient from '@/components/ServiceAreaMapClient';

export const metadata: Metadata = {
  // `absolute` bypasses the layout's "%s | McKinley Roofing" template so the
  // brand name isn't duplicated. Leads with the local head term.
  title: { absolute: 'Roofing Contractor in Douglasville, GA | McKinley Roofing' },
  description:
    "Family-owned roofing contractor in Douglasville, GA. Expert roof repair, replacement, and storm damage restoration serving West Georgia. Get a free inspection today.",
  keywords: ['roofing contractor Douglasville GA', 'roof repair West Georgia', 'storm damage restoration', 'McKinley Roofing'],
  alternates: {
    canonical: 'https://www.mckinleyroofing.net',
  },
};

export default function HomePage() {
  const roofingContractorSchema = buildRoofingContractorSchema({
    geo: { lat: 33.7515, lng: -84.7477 },
  });

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(roofingContractorSchema) }}
      />
      <Hero />
      <Certifications />
      <About />
      <Services />
      <Testimonials />
      <Portfolio />
      <CTASection />
      <section className="py-10 bg-white">
        <div className="mx-auto px-4" style={{ maxWidth: 'min(1300px, 75vw)' }}>
          <ServiceAreaMapClient />
        </div>
      </section>
      <Blog />
    </main>
  );
}
