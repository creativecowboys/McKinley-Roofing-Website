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

const HomePage: React.FC = () => {
    return (
        <main>
            <Hero />
            <Certifications />
            <About />
            <Services />
            <Testimonials />
            <Portfolio />
            <CTASection />
            <ServiceAreaMap />
            <Blog />
        </main>
    );
};

export default HomePage;
