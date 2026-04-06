import type { Metadata } from 'next';
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
  title: "McKinley Roofing | West Georgia's Trusted Roofing Contractor",
  description:
    "Family-owned roofing contractor in Douglasville, GA. Expert roof repair, replacement, and storm damage restoration serving West Georgia. Get a free inspection today.",
  keywords: ['roofing contractor Douglasville GA', 'roof repair West Georgia', 'storm damage restoration', 'McKinley Roofing'],
};

export default function HomePage() {
  return (
    <main>
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
