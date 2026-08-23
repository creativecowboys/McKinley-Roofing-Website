'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '@/contexts/ModalContext';

interface HeroProps {}

const HERO_VIDEO = '/McKinley-Roofing-Web-Banner-v1.mp4';

const Hero: React.FC<HeroProps> = () => {
  const { openModal } = useModal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  /**
   * The hero video is ~12MB. `autoPlay` makes the browser fetch it immediately and
   * ignore any `preload` hint, so it competes with the CSS and fonts needed for the
   * first paint. Instead the poster image renders on its own (it's the LCP element),
   * and the video source is attached only once the page has finished loading — then
   * faded in over the poster, which is frame 0 of the video, so the swap is seamless.
   *
   * Anyone with reduced-motion preferences keeps the still and never pays for the video.
   */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Safari has no requestIdleCallback, so fall back to a short timeout.
    const hasIdle = typeof window.requestIdleCallback === 'function';
    let idleId: number | undefined;

    const attach = () => {
      const start = () => {
        if (el.src) return;
        el.src = HERO_VIDEO;
        // Autoplay can still be refused (low power mode, etc.) — the poster simply stays.
        el.play().catch(() => {});
      };
      idleId = hasIdle
        ? window.requestIdleCallback(start, { timeout: 2000 })
        : window.setTimeout(start, 200);
    };

    if (document.readyState === 'complete') attach();
    else window.addEventListener('load', attach, { once: true });

    return () => {
      window.removeEventListener('load', attach);
      if (idleId === undefined) return;
      if (hasIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return (
    <section className="relative px-4 lg:px-8 pt-40 pb-12 overflow-hidden bg-white">
      <div className="container mx-auto">
        {/* Main Hero Container with Rounded Corners */}
        <div className="relative h-[650px] lg:h-[800px] w-full rounded-[3rem] overflow-hidden group shadow-2xl">
          {/* Background — poster paints immediately, video fades in once loaded (see effect above) */}
          <img
            src="/hero-poster.webp"
            alt="McKinley Roofing crew installing underlayment on a residential roof in Douglasville, GA"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-right lg:object-center scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
            className={`absolute inset-0 w-full h-full object-cover object-right lg:object-center scale-105 group-hover:scale-100 transition-[transform,opacity] duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Subtle Gradient Overlay to ensure the white text box is perfectly legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30"></div>



          {/* Floating Content Box - Compact Version */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-auto lg:max-w-2xl z-10">
            <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-2xl animate-slideUp border border-slate-100">
              {/* Top Label */}
              <div className="inline-block bg-red-50 text-red-600 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-3">
                QUALITY OVER QUANTITY - DOUGLASVILLE, GA
              </div>

              {/* Main Content */}
              <div className="space-y-4">
                {/* Title */}
                <h1 className="text-2xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  West Georgia's Trusted <br />
                  Roofing Contractor
                </h1>

                {/* Description */}
                <p className="text-slate-500 text-base lg:text-lg leading-relaxed">
                  Based in Douglasville, GA — family-owned and locally operated. We specialize in roof repair, replacement, and storm damage restoration with expert insurance claim assistance.
                </p>

                {/* Button */}
                <button
                  onClick={openModal}
                  className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-sm lg:text-base hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 group w-full lg:w-auto uppercase tracking-wider cursor-pointer"
                >
                  GET FREE ROOF INSPECTION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
