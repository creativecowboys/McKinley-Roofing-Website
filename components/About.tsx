
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'value'>('mission');

  const accordionData = {
    mission: {
      title: "Our Mission",
      content: "With years of experience the industry our team of skilled professionals is dedicated to delivering top roofing services prioritize durability, quality, safety we take pride craftsmanship."
    },
    vision: {
      title: "Our Vision",
      content: "To be the premier roofing solution provider in West Georgia, known for our unwavering commitment to excellence and community trust."
    },
    value: {
      title: "Our Value",
      content: "We believe in integrity, superior materials, and transparent communication to ensure every homeowner feels secure under their McKinley roof."
    }
  };

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">

          {/* Column 1: Text Content */}
          <div className="flex flex-col items-start">
            <span className="bg-orange-50 text-red-600 px-4 py-1.5 rounded-md font-bold text-sm tracking-wider mb-6">
              ABOUT US
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8 leading-[1.15]">
              Transforming Homes with Quality Roofing Solutions
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              From repairs to full roof replacements, we treat each home as our own, providing personalized solutions tailored to meet the unique needs of our clients.
            </p>
            <button className="bg-red-600 text-white px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg hover:shadow-red-600/30">
              LEARN MORE
            </button>
          </div>

          {/* Column 2: Featured Image */}
          <div className="relative group">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[550px]">
              <img
                src="/about_roofers_working.png"
                alt="McKinley Roofing professionals working on a residential roof"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Subtle floating shadow element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-slate-100 rounded-2xl"></div>
          </div>

          {/* Column 3: Accordion Cards */}
          <div className="flex flex-col gap-4">

            {/* Our Mission */}
            <div
              onClick={() => setActiveTab('mission')}
              className={`cursor-pointer p-8 rounded-2xl transition-all duration-300 shadow-xl ${activeTab === 'mission' ? 'bg-red-600 text-white' : 'bg-white text-slate-900'
                }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{accordionData.mission.title}</h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeTab === 'mission' ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                  }`}>
                  {activeTab === 'mission' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              {activeTab === 'mission' && (
                <p className="text-white/90 leading-relaxed text-lg animate-fadeIn">
                  {accordionData.mission.content}
                </p>
              )}
            </div>

            {/* Our Vision */}
            <div
              onClick={() => setActiveTab('vision')}
              className={`cursor-pointer p-8 rounded-2xl transition-all duration-300 shadow-xl ${activeTab === 'vision' ? 'bg-red-600 text-white' : 'bg-white text-slate-900 hover:shadow-2xl'
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">{accordionData.vision.title}</h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeTab === 'vision' ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                  }`}>
                  {activeTab === 'vision' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              {activeTab === 'vision' && (
                <p className="text-white/90 leading-relaxed text-lg animate-fadeIn pt-4">
                  {accordionData.vision.content}
                </p>
              )}
            </div>

            {/* Our Value */}
            <div
              onClick={() => setActiveTab('value')}
              className={`cursor-pointer p-8 rounded-2xl transition-all duration-300 shadow-xl ${activeTab === 'value' ? 'bg-red-600 text-white' : 'bg-white text-slate-900 hover:shadow-2xl'
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">{accordionData.value.title}</h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeTab === 'value' ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                  }`}>
                  {activeTab === 'value' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              {activeTab === 'value' && (
                <p className="text-white/90 leading-relaxed text-lg animate-fadeIn pt-4">
                  {accordionData.value.content}
                </p>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default About;
