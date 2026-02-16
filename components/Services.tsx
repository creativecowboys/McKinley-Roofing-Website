
import React, { useState } from 'react';
import { CloudRain, Home, Hammer, Leaf, Fan, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: 'Storm Damage Assessment',
      icon: <CloudRain size={24} />,
      description: 'Comprehensive inspection after severe weather to identify leaks and structural issues.',
      image: 'https://picsum.photos/id/163/800/600',
    },
    {
      title: 'Asphalt Shingle Roofing',
      icon: <Home size={24} />,
      description: 'Asphalt shingles remain the popular choice for their affordability and reliability. We offer expert installation.',
      image: 'https://picsum.photos/id/124/800/600',
      bullets: ['Gutter Installation and Maintenance', 'Skylight Installation and Repair', 'Chimney Flashing and Repair'],
    },
    {
      title: 'Metal Roofing Services',
      icon: <Hammer size={24} />,
      description: 'Durable, long-lasting metal roofs that provide excellent protection and energy efficiency.',
      image: 'https://picsum.photos/id/162/800/600',
    },
    {
      title: 'Green Roof Installation',
      icon: <Leaf size={24} />,
      description: 'Eco-friendly roofing options that incorporate vegetation to improve insulation and aesthetics.',
      image: 'https://picsum.photos/id/164/800/600',
    },
    {
      title: 'Roof Ventilation Services',
      icon: <Fan size={24} />,
      description: 'Optimizing attic airflow to prevent moisture buildup and extend the life of your roof.',
      image: 'https://picsum.photos/id/165/800/600',
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">OUR SERVICE</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Protect Your Home with Our Roofing Services
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`flex items-center gap-4 p-5 rounded-xl transition-all text-left border ${
                  activeService === index 
                  ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-600/20 translate-x-2' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-red-300 hover:bg-red-50'
                }`}
              >
                <div className={`${activeService === index ? 'bg-white/20' : 'bg-slate-100'} p-3 rounded-lg`}>
                  {service.icon}
                </div>
                <span className="font-bold text-lg">{service.title}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8 bg-white p-8 lg:p-12 rounded-2xl shadow-xl border border-slate-100 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  className="w-full h-full object-cover aspect-square md:aspect-auto md:h-[400px] transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">{services[activeService].title}</h3>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {services[activeService].description}
                </p>
                {services[activeService].bullets && (
                  <ul className="space-y-4 mb-8">
                    {services[activeService].bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-3 text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                          <ArrowRight size={14} />
                        </div>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                <button className="bg-red-600 text-white px-8 py-4 rounded-md font-bold hover:bg-red-700 transition-all flex items-center gap-2">
                  LEARN MORE
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
