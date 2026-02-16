
import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-red-600 rounded-[2rem] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
            <img
              src="https://picsum.photos/id/183/800/800"
              alt="House with new roof"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-transparent"></div>
          </div>
          
          <div className="p-10 lg:p-20 relative z-10 lg:max-w-3xl">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Get in Touch with Our <br />
              <span className="text-red-100">Roofing Experts Today</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-lg leading-relaxed">
              Ready to protect your home with a strong, reliable roof? 
              Whether you're in need of a complete roof replacement or a quick repair, we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-red-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-slate-100 transition-all shadow-lg">
                START YOUR JOURNEY
              </button>
              <button className="bg-transparent text-white border-2 border-white/30 px-8 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-all">
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
