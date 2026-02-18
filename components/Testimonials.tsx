
import React from 'react';
import { Star, Quote, ChevronUp, ChevronDown } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-md font-bold text-sm tracking-wider mb-6 inline-block">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2">
            Reliable Roofing Backed <br />
            by Real Reviews
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Stats Split Card */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              {/* Top Half: Image */}
              <div className="h-64 relative">
                <img
                  src="/testimonial_red_roof_home.png"
                  alt="Beautiful West Georgia home with McKinley Roofing installation"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Avatars */}
              <div className="absolute top-64 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center -space-x-4 z-20">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`/testimonial_avatar_${i}.png`}
                    alt="User"
                    className="w-14 h-14 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ))}
                <div className="w-14 h-14 rounded-full border-4 border-white bg-slate-950 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  +
                </div>
              </div>

              {/* Bottom Half: Red Content */}
              <div className="bg-red-600 pt-16 pb-12 px-8 text-center">
                <h4 className="text-white text-3xl font-extrabold mb-3">2K+ Review</h4>
                <div className="flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={20} className="fill-white text-white" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Review Card & Navigation */}
          <div className="flex-grow flex items-center gap-6 w-full">
            {/* The Main Testimonial Card */}
            <div className="bg-white p-10 lg:p-14 rounded-[2.5rem] shadow-xl relative border border-slate-100 flex-grow">
              <div className="absolute top-10 right-10 text-slate-900">
                <Quote size={40} className="opacity-100" />
              </div>

              <div className="flex items-center gap-1 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={20} className="fill-red-600 text-red-600" />
                ))}
              </div>

              <p className="text-xl lg:text-2xl font-medium text-slate-700 leading-relaxed mb-10">
                "As a business owner, I needed a reliable roofing company to handle my commercial property's roof replacement. A delivered exceptional service and quality. The new roof is durable their team was professional every step of the way."
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <img
                    src="/testimonial_avatar_sheldon.png"
                    alt="Sheldon Jackson"
                    className="w-14 h-14 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <h5 className="text-xl font-bold text-slate-900">Sheldon Jackson</h5>
                    <p className="text-slate-500 font-medium text-sm">Project Manager</p>
                  </div>
                </div>

                {/* Google Logo */}
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold tracking-tight">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Vertical Navigation Buttons */}
            <div className="hidden sm:flex flex-col gap-4">
              <button className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 cursor-pointer">
                <ChevronUp size={24} />
              </button>
              <button className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-slate-800 transition-all shadow-lg cursor-pointer">
                <ChevronDown size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
