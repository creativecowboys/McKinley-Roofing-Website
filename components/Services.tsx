
import React, { useState } from 'react';
import { Wrench, RefreshCw, CloudRain, Shield, Droplets, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: 'Roof Repair Services',
      icon: <Wrench size={24} />,
      description: 'Comprehensive repair services designed to address damage quickly and effectively, preventing minor issues from becoming major problems.',
      image: '/service_roof_repair.png',
      bullets: [
        'Thorough inspection to assess the full extent of damage',
        'Professional leak detection and repair',
        'Shingle replacement for damaged or missing shingles',
        'Flashing repair around chimneys, vents, and valleys',
        'Emergency roof repair services for urgent situations'
      ],
    },
    {
      title: 'Roof Replacement Services',
      icon: <RefreshCw size={24} />,
      description: 'Complete replacement services for both residential and commercial properties when repairs are no longer cost-effective or when a roof has reached the end of its useful life.',
      image: '/service_asphalt_shingles.png',
      bullets: [
        'Comprehensive inspection to assess existing roof condition',
        'Customized replacement plan tailored to your needs and budget',
        'High-quality materials from trusted manufacturers',
        'Professional installation by skilled craftsmen',
        'Both manufacturer and labor warranties for peace of mind'
      ],
    },
    {
      title: 'Storm Damage Restoration',
      icon: <CloudRain size={24} />,
      description: 'Expert assistance recovering from storm damage, including hail and wind damage. We work directly with insurance companies to ensure you receive maximum benefits.',
      image: '/service_storm_damage.png',
      bullets: [
        'Detailed damage assessment and documentation',
        'Direct coordination with insurance companies',
        'Assistance with claims process and paperwork',
        'Expert testimony on damage extent when needed',
        'Complete restoration to pre-damage condition or better'
      ],
    },
    {
      title: 'Proactive Roof Maintenance',
      icon: <Shield size={24} />,
      description: 'Preventive maintenance services help protect your roofing investment and extend the lifespan of your roof by identifying and addressing small issues before they develop into expensive repairs.',
      image: '/service_maintenance.png',
      bullets: [
        'Regular inspections to identify potential issues early',
        'Cleaning gutters and downspouts to prevent water buildup',
        'Repairing minor issues before they escalate',
        'Applying protective coatings to extend roof life',
        'Expert advice on roof care and maintenance best practices'
      ],
    },
    {
      title: 'Gutter Installation Services',
      icon: <Droplets size={24} />,
      description: 'Professional seamless gutter system installation designed to effectively channel water away from your structure, protecting both your roof and foundation.',
      image: '/service_gutter_installation.png',
      bullets: [
        'Customized gutter design for your property specifications',
        'High-quality, durable gutter materials',
        'Professional installation by experienced technicians',
        'Downspout installation and strategic water redirection',
        'Maintenance tips to keep systems functioning optimally'
      ],
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
                className={`flex items-center gap-4 p-5 rounded-xl transition-all text-left border cursor-pointer ${activeService === index
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
                <button className="bg-red-600 text-white px-8 py-4 rounded-md font-bold hover:bg-red-700 transition-all flex items-center gap-2 cursor-pointer">
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
