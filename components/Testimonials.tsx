
import React, { useState } from 'react';
import { Star, Quote, ChevronUp, ChevronDown } from 'lucide-react';

const reviews = [
  {
    name: 'Tee Davis',
    role: 'Google Review',
    text: "McKinley Roofing did an awesome job on replacing our roof, gutters and downspouts. Everything looks wonderful and best of all we are leak free now. The guys are very friendly with great customer service. We were even greeted by the owner and he made sure all of our questions were answered. They were very thorough on cleaning up after they were done. We would definitely recommend using McKinley Roofing.",
  },
  {
    name: 'Latasha Burns',
    role: 'Google Review',
    text: "McKinley Roofing & Restoration did an awesome job on our roof. From day one, Tyler Bowman was great. He came out and inspected our roof and worked with our insurance company who also came out and saw damage as well. Tyler kept us informed throughout the process and the crew was very professional and cleaned up everything.",
  },
  {
    name: 'Ben Leak',
    role: 'Google Review',
    text: "I've had Jacob & McKinley Roofing and Restoration do work on several of my commercial properties, my own home, and my seventy-six year old mother's home as well. I have always been exceptionally satisfied with the professionalism and high-quality work from Jacob and the team.",
  },
  {
    name: 'Joann Anderson',
    role: 'Google Review',
    text: "McKinley Roofing was very professional through the whole project of putting a metal roof on our cabin. Jacob made several stops to make sure we were satisfied before the job was finished! We highly recommend this company!",
  },
  {
    name: 'Douglas Quarry',
    role: 'Google Review',
    text: "I met Jacob, very pleasant. He sent me an estimate and set a roofing date. These guys were timely, did their thing, very professional. Stripped away the old roof, made needed repairs, and installed new roof, then cleaned up their mess. Highly recommend.",
  },
  {
    name: 'Nancy P.',
    role: 'Google Review',
    text: "Absolutely one of the best companies. Jacob was efficient and professional — he and his team did exactly what they said they would do.",
  },
];

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive((a) => (a + 1) % reviews.length);

  const review = reviews[active];

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
                <h4 className="text-white text-3xl font-extrabold mb-3">70+ Reviews</h4>
                <div className="flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={20} className="fill-white text-white" />
                  ))}
                </div>
                <p className="text-white/80 text-sm mt-2">4.9 Stars on Google</p>
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
                "{review.text}"
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-slate-900">{review.name}</h5>
                    <p className="text-slate-500 font-medium text-sm">{review.role}</p>
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
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 cursor-pointer"
              >
                <ChevronUp size={24} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-slate-800 transition-all shadow-lg cursor-pointer"
              >
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
