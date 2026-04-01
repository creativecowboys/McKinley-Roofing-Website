import React from 'react';
import Hero from '../components/Hero';
import Certifications from '../components/Certifications';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Portfolio from '../components/Portfolio';
import CTASection from '../components/CTASection';
import Blog from '../components/Blog';
import ServiceAreaMap from '../components/ServiceAreaMap';

interface HomePageProps {
    onOpenModal: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenModal }) => {
    return (
        <main>
            <Hero onOpenModal={onOpenModal} />
            <Certifications />
            <About />
            <Services onOpenModal={onOpenModal} />
            <Testimonials />
            <Portfolio />
            <CTASection onOpenModal={onOpenModal} />
            <section className="py-10 bg-white">
              <div className="mx-auto px-4" style={{ maxWidth: 'min(1300px, 75vw)' }}>
                <ServiceAreaMap />
              </div>
            </section>
            <Blog />
        </main>
    );
};

export default HomePage;
