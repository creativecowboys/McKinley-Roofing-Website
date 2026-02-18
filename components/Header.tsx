
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, MapPin, FileText } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Service Areas', href: '/locations' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* Top Info Bar - Red Background */}
      <div className="fixed w-full z-50 bg-red-600 text-white py-2">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            {/* Address */}
            <a href="#contact" className="flex items-center gap-2 hover:text-red-100 transition-colors">
              <MapPin size={16} />
              <span className="hidden sm:inline">Douglasville, Georgia</span>
            </a>
          </div>
          {/* Phone */}
          <a href="tel:+16789834455" className="flex items-center gap-2 hover:text-red-100 transition-colors font-semibold">
            <Phone size={16} />
            <span>(678) 983-4455</span>
          </a>
        </div>
      </div>

      {/* Main Header - Offset for Top Bar */}
      <header className={`fixed w-full z-50 transition-all duration-300 shadow ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-white py-6'}`} style={{ top: '36px' }}>
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo - McKinley Roofing */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/McKinley_Logo_Dark.png"
              alt="McKinley Roofing"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-slate-900 text-sm font-bold uppercase tracking-wider hover:text-red-600 transition-colors ${location.pathname === link.href ? 'text-red-600' : ''
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Free Quote Button */}
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-white text-red-600 px-6 py-3.5 rounded-xl font-extrabold text-sm tracking-widest hover:bg-red-50 transition-all border-2 border-red-600 cursor-pointer"
            >
              <FileText size={18} />
              FREE QUOTE
            </Link>
            {/* Phone Button */}
            <a
              href="tel:+16789834455"
              className="flex items-center gap-3 bg-red-600 text-white px-7 py-3.5 rounded-xl font-extrabold text-sm tracking-widest hover:bg-red-700 transition-all shadow-lg hover:shadow-red-600/30 cursor-pointer"
            >
              <Phone size={18} />
              (678) 983-4455
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-slate-900 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 bg-white shadow-2xl animate-fadeIn h-screen border-t border-slate-50" style={{ top: '124px' }}>
            <nav className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-xl font-bold text-slate-900 border-b border-slate-50 pb-4 hover:text-red-600 transition-colors uppercase tracking-widest ${location.pathname === link.href ? 'text-red-600' : ''
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:+16789834455"
                className="flex items-center justify-center gap-3 bg-red-600 text-white px-5 py-5 rounded-2xl font-black text-lg shadow-xl cursor-pointer"
              >
                <Phone size={24} />
                CALL NOW
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

