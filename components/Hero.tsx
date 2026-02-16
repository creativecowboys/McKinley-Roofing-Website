
import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative px-4 lg:px-8 pt-24 pb-12 overflow-hidden bg-white">
      <div className="container mx-auto">
        {/* Main Hero Container with Rounded Corners */}
        <div className="relative h-[650px] lg:h-[800px] w-full rounded-[3rem] overflow-hidden group shadow-2xl">
          {/* Background Image - Styled to match the provided action shot */}
          <img
            src="https://images.unsplash.com/photo-1635424710928-0544e8512eae?auto=format&fit=crop&q=80&w=2000"
            alt="McKinley Roofing Expert at Work"
            className="absolute inset-0 w-full h-full object-cover object-right lg:object-center scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
          
          {/* Subtle Gradient Overlay to ensure the white text box is perfectly legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30"></div>

          {/* Navigation Arrows (Matching the Design Screenshot) */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            <button className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all shadow-lg hover:scale-110 active:scale-95">
              <ChevronRight size={28} />
            </button>
            <button className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all shadow-lg hover:scale-110 active:scale-95">
              <ChevronLeft size={28} />
            </button>
          </div>

          {/* Floating Content Box */}
          <div className="absolute bottom-10 left-10 right-10 lg:right-32 z-10">
            <div className="bg-white rounded-3xl p-8 lg:p-14 shadow-2xl animate-slideUp border border-slate-100">
              {/* Top Label */}
              <div className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest mb-6">
                AFFORDABLE, RELIABLE, AND BUILT TO LAST.
              </div>

              {/* Main Content Row */}
              <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
                {/* Title (Left Side) */}
                <div className="lg:w-2/3">
                  <h1 className="text-4xl lg:text-[5.2rem] font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                    Strong Durable and <br />
                    Affordable Roofing
                  </h1>
                </div>

                {/* Description and Button (Right Side) */}
                <div className="lg:w-1/3 flex flex-col gap-8">
                  <p className="text-slate-500 text-lg leading-relaxed">
                    When it comes to protecting your home, your roof is the first line of defense. We provide top-notch roofing services designed specifically to safeguard your West Georgia home.
                  </p>
                  <button className="bg-red-600 text-white px-10 py-5 rounded-xl font-bold text-base hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 group w-full lg:w-fit uppercase tracking-wider">
                    SCHEDULE YOUR ROOF REPAIR
                  </button>
                </div>
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
