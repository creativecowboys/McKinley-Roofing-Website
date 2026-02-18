
import React from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: 'Everguard Roofing Co.',
      location: 'Carrollton, GA',
      image: '/portfolio_carrollton.png',
    },
    {
      title: 'Pinnacle Roof Pros',
      location: 'Douglasville, GA',
      description: 'This project involved upgrading a traditional roof to a modern design using high-quality materials.',
      image: '/portfolio_douglasville.png',
    },
    {
      title: 'Ironclad Roof Works',
      location: 'Villa Rica, GA',
      image: '/portfolio_villarica.png',
    },
    {
      title: 'Blue Horizon Estates',
      location: 'Newnan, GA',
      image: '/portfolio_newnan.png',
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">EXPLORE RECENT WORKS</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Proudly Protecting Homes with Superior Craftsmanship
            </h2>
          </div>
          <div className="flex gap-3">
            <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
              <ChevronLeft size={24} />
            </button>
            <button className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl h-[450px]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-90"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 text-white transform transition-transform duration-300 group-hover:-translate-y-4">
                <span className="text-red-400 font-medium text-sm block mb-2">{project.location}</span>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>

                {project.description && (
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                )}

                <button className="flex items-center gap-2 text-white font-bold text-sm bg-red-600/80 hover:bg-red-600 px-4 py-2 rounded transition-all">
                  READ MORE
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
