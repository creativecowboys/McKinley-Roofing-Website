
import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Pages', href: '#', hasDropdown: true },
    { name: 'Service', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-white py-6'}`}>
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo - McKinley Roofing */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
               <svg className="w-8 h-8 text-slate-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V21" stroke="red" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"/>
              </svg>
              <span className="text-3xl font-black text-slate-900 tracking-tighter">
                Roof<span className="text-red-600">McKinley</span>
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-900 text-sm font-bold uppercase tracking-wider hover:text-red-600 transition-colors flex items-center gap-1 group"
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />}
            </a>
          ))}
        </nav>

        {/* Contact CTA Button (Red) */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+17705550123"
            className="flex items-center gap-3 bg-red-600 text-white px-7 py-3.5 rounded-xl font-extrabold text-sm tracking-widest hover:bg-red-700 transition-all shadow-lg hover:shadow-red-600/30"
          >
            <Phone size={18} />
            +1 (770) 555-0123
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
        <div className="lg:hidden fixed inset-x-0 top-[88px] bg-white shadow-2xl animate-fadeIn h-screen border-t border-slate-50">
          <nav className="flex flex-col p-8 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4 hover:text-red-600 transition-colors uppercase tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:+17705550123"
              className="flex items-center justify-center gap-3 bg-red-600 text-white px-5 py-5 rounded-2xl font-black text-lg shadow-xl"
            >
              <Phone size={24} />
              CALL NOW
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
