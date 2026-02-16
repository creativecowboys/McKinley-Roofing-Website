
import React from 'react';
// Added Home to the imports from lucide-react
import { Send, Home } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">CONTACT US</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8">
              Start Your Roofing Journey Today—Contact Us!
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We're here to provide you with the best roofing solutions tailored to your needs. Whether you're looking for a free estimate, need a roof inspection, or have urgent repairs, our West Georgia team is ready to help.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                />
              </div>
              <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none transition-all">
                <option value="">Are you a new client?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <textarea
                placeholder="How can we help you?"
                rows={4}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-5 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/20"
              >
                SEND NOW
                <Send size={18} />
              </button>
            </form>
          </div>

          <div className="relative">
            {/* Visual representation of a map area centered around West Georgia */}
            <div className="bg-slate-200 rounded-3xl h-[600px] w-full overflow-hidden shadow-2xl relative border-8 border-white">
              <img
                src="https://picsum.photos/id/15/800/800?grayscale"
                alt="Map area"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div>
              
              {/* Marker simulation */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                <div className="relative">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                    <Home className="text-white" size={20} />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-white px-4 py-2 rounded-lg shadow-xl font-bold text-slate-900">
                    McKinley Roofing HQ
                  </div>
                </div>
              </div>
              
              {/* Stats overlay */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <Home size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Servicing West Georgia</h4>
                    <p className="text-slate-600 text-sm">Carrollton, Villa Rica, Newnan, Douglasville & Beyond</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
