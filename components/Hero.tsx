
import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative px-4 lg:px-8 pt-40 pb-12 overflow-hidden bg-white">
      <div className="container mx-auto">
        {/* Main Hero Container with Rounded Corners */}
        <div className="relative h-[650px] lg:h-[800px] w-full rounded-[3rem] overflow-hidden group shadow-2xl">
          {/* Background Video - McKinley Roofing Web Banner */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-right lg:object-center scale-105 group-hover:scale-100 transition-transform duration-1000"
          >
            <source src="/McKinley-Roofing-Web-Banner-v1.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <img
              src="/McKinley_Roofing_3.jpg"
              alt="McKinley Roofing Expert at Work"
              className="absolute inset-0 w-full h-full object-cover object-right lg:object-center"
            />
          </video>

          {/* Subtle Gradient Overlay to ensure the white text box is perfectly legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30"></div>

          {/* Navigation Arrows (Matching the Design Screenshot) */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            <button className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer">
              <ChevronRight size={28} />
            </button>
            <button className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer">
              <ChevronLeft size={28} />
            </button>
          </div>

          {/* Floating Content Box - Compact Version */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-auto lg:max-w-2xl z-10">
            <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-2xl animate-slideUp border border-slate-100">
              {/* Top Label */}
              <div className="inline-block bg-red-50 text-red-600 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-3">
                QUALITY OVER QUANTITY - DOUGLASVILLE, GA
              </div>

              {/* Main Content */}
              <div className="space-y-4">
                {/* Title */}
                <h1 className="text-2xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  West Georgia's Trusted <br />
                  Roofing Experts
                </h1>

                {/* Description */}
                <p className="text-slate-500 text-base lg:text-lg leading-relaxed">
                  Family-owned and locally operated. We specialize in roof repair, replacement, and storm damage restoration with expert insurance claim assistance.
                </p>

                {/* Button */}
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-sm lg:text-base hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 group w-full lg:w-auto uppercase tracking-wider cursor-pointer"
                >
                  GET FREE ROOF INSPECTION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
