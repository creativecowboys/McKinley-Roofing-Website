'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from '@/contexts/ModalContext';

const CTASection: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section
      className="relative py-24 overflow-hidden text-white"
      style={{
        backgroundImage: 'url(/cta-house.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay + red gradient only on the LEFT side */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(185, 28, 28, 0.88) 0%, rgba(185, 28, 28, 0.65) 40%, rgba(0,0,0,0.10) 70%, transparent 100%)',
        }}
      />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-xl">
          <span className="text-red-200 font-bold uppercase tracking-widest text-sm mb-4 block">
            READY TO GET STARTED?
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Protect Your Home with Expert Roofing
          </h2>
          <p className="text-red-100 text-lg mb-10 leading-relaxed">
            Don't wait for a small issue to become a costly problem. Our team is ready to assess, repair, or replace your roof with precision and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={openModal}
              className="bg-white text-red-600 font-black px-8 py-4 rounded-xl hover:bg-red-50 transition-all shadow-xl text-sm tracking-widest uppercase cursor-pointer"
            >
              START YOUR JOURNEY
            </button>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-black px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-sm tracking-widest uppercase text-center"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
