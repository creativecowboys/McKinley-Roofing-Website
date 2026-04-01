import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import InspectionModal from './components/InspectionModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import LocationPage from './pages/LocationPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import BlogProtectYourHomePage from './pages/BlogProtectYourHomePage';
import BlogRoofingExpertisePage from './pages/BlogRoofingExpertisePage';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <InspectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <div className="flex flex-col min-h-screen">
          <Header onOpenModal={() => setIsModalOpen(true)} />
          <Routes>
            <Route path="/" element={<HomePage onOpenModal={() => setIsModalOpen(true)} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/locations" element={<ServiceAreasPage />} />
            <Route path="/locations/:slug" element={<LocationPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/blog/protect-your-home-with-expert-roofing-services" element={<BlogProtectYourHomePage />} />
            <Route path="/blog/protect-your-investment-with-our-roofing-expertise" element={<BlogRoofingExpertisePage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
