'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, MapPin, FileText } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';

const Header: React.FC = () => {
  const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
          {/* CTA — opens modal */}
          <button
            onClick={openModal}
            className="flex items-center gap-2 hover:text-red-100 transition-colors font-semibold cursor-pointer bg-transparent border-none"
          >
            <span>Get A Free Roof Inspection Today!</span>
          </button>
        </div>
      </div>

      {/* Main Header - Offset for Top Bar */}
      <header className={`fixed w-full z-50 transition-all duration-300 shadow ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-white py-6'}`} style={{ top: '36px' }}>
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo - McKinley Roofing */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
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
                href={link.href}
                className={`text-slate-900 text-sm font-bold uppercase tracking-wider hover:text-red-600 transition-colors ${pathname === link.href ? 'text-red-600' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Google Reviews Badge */}
            <a
              href="https://www.google.com/maps/place/McKinley+Roofing+and+Restoration/@33.6633281,-84.7910462,17z/data=!4m8!3m7!1s0x6e2df0c5254f6d55:0x331003fbf6778710!8m2!3d33.6633281!4d-84.7910462!9m1!1b1!16s%2Fg%2F11s0r5rgh1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
            >
              {/* Google G SVG */}
              <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Google Reviews</span>
                <span className="text-yellow-400 text-sm leading-none tracking-tighter">★★★★★</span>
              </div>
            </a>
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
                  href={link.href}
                  className={`text-xl font-bold text-slate-900 border-b border-slate-50 pb-4 hover:text-red-600 transition-colors uppercase tracking-widest ${pathname === link.href ? 'text-red-600' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile Free Inspection CTA */}
              <button
                onClick={() => { setIsMenuOpen(false); openModal(); }}
                className="flex items-center justify-center gap-2 bg-white text-red-600 border-2 border-red-600 px-5 py-4 rounded-2xl font-black text-base shadow cursor-pointer"
              >
                <FileText size={20} />
                FREE INSPECTION
              </button>
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
