
import React from 'react';
import { Facebook, Instagram, Youtube, Twitter, Mail, MapPin, Phone, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8 group cursor-pointer">
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-300">
                <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight">
                McKinley<span className="text-red-600">Roofing</span>
              </span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We're committed to delivering top-quality roofing service that protects your home & enhances value. With years of expertise focus customer.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all cursor-pointer">
                <Facebook size={20} />
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all cursor-pointer">
                <Instagram size={20} />
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all cursor-pointer">
                <Youtube size={20} />
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all cursor-pointer">
                <Twitter size={20} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8">Top Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#about" className="hover:text-red-600 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-red-600 transition-colors">Our Services</a></li>
              <li><a href="#blog" className="hover:text-red-600 transition-colors">Recent Blog</a></li>
              <li><a href="#portfolio" className="hover:text-red-600 transition-colors">Our Team</a></li>
              <li><a href="#contact" className="hover:text-red-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xl font-bold mb-8">Get In Touch</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="bg-red-600/10 p-2 rounded text-red-600 shrink-0 h-fit">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase">Call Anytime</p>
                  <p className="text-lg font-bold text-slate-200">+1 (770) 555-0123</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-red-600/10 p-2 rounded text-red-600 shrink-0 h-fit">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase">Our Address</p>
                  <p className="text-lg font-bold text-slate-200">421 Allen, Carrollton, GA 30117</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-red-600/10 p-2 rounded text-red-600 shrink-0 h-fit">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase">Email Us</p>
                  <p className="text-lg font-bold text-slate-200">office@mckinleyroofing.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-8">Subscribe Newsletter</h4>
            <p className="text-slate-400 mb-6">Stay updated with the latest roofing tips and offers.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-4 px-6 focus:outline-none focus:border-red-600 transition-all text-slate-200"
              />
              <button className="absolute right-2 top-2 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-all">
                <Send size={20} />
              </button>
            </div>
            
            <div className="mt-8 bg-slate-800 p-6 rounded-xl border border-slate-700">
               <h5 className="font-bold mb-4 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 Working Hours
               </h5>
               <div className="flex justify-between text-sm text-slate-400 mb-2">
                 <span>Mon-Fri</span>
                 <span className="text-white">9:00 AM - 6:00 PM</span>
               </div>
               <div className="flex justify-between text-sm text-slate-400">
                 <span>Sat-Sun</span>
                 <span className="text-white italic">Emergency Calls Only</span>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            Copyright © {currentYear} McKinley Roofing. All Rights Reserved
          </p>
          <div className="flex items-center gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-red-600 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-red-600 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
