
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Everguard Roofing Co.',
    location: 'Carrollton, GA',
    video: '/portfolio_1.mp4',
  },
  {
    title: 'Pinnacle Roof Pros',
    location: 'Douglasville, GA',
    description: 'This project involved upgrading a traditional roof to a modern design using high-quality materials.',
    video: '/portfolio_2.mp4',
  },
  {
    title: 'Ironclad Roof Works',
    location: 'Villa Rica, GA',
    video: '/portfolio_3.mp4',
  },
  {
    title: 'Blue Horizon Estates',
    location: 'Newnan, GA',
    video: '/portfolio_4.mp4',
  },
];

interface VideoCardProps {
  project: typeof projects[0];
}

const VideoCard: React.FC<VideoCardProps> = ({ project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl h-[450px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={project.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Play indicator — fades in on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Text content */}
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
  );
};

const Portfolio: React.FC = () => {
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
            <VideoCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
