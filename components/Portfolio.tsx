
import React, { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const Portfolio: React.FC = () => {
  // -1 means no arrow-selected video; hover still works independently
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const stopAll = useCallback((exceptIndex?: number) => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== exceptIndex) {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, []);

  const activateVideo = useCallback((index: number) => {
    stopAll(index);
    setActiveIndex(index);
    const v = videoRefs.current[index];
    if (v) v.play();
  }, [stopAll]);

  const handleNext = () => {
    const next = (activeIndex + 1) % projects.length;
    activateVideo(next);
  };

  const handlePrev = () => {
    const prev = (activeIndex - 1 + projects.length) % projects.length;
    activateVideo(prev);
  };

  // Hover handlers — only apply when no arrow-controlled video is active
  const handleMouseEnter = (idx: number) => {
    if (activeIndex !== -1) return; // arrows are in control
    videoRefs.current[idx]?.play();
  };

  const handleMouseLeave = (idx: number) => {
    if (activeIndex !== -1) return;
    const v = videoRefs.current[idx];
    if (v) { v.pause(); v.currentTime = 0; }
  };

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
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl h-[450px] cursor-pointer"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                <video
                  ref={(el) => { videoRefs.current[idx] = el; }}
                  src={project.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
                />

                {/* Gradient — hidden when arrow-active, fades on hover otherwise */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500 ${
                    isActive ? 'opacity-0' : 'group-hover:opacity-0'
                  }`}
                />

                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
