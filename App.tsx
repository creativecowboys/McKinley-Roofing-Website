
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Stats from './components/Stats';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CTASection from './components/CTASection';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Stats />
        <Blog />
        <Contact />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
