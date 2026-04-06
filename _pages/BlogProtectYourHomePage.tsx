// @ts-nocheck — Legacy Vite file, not used by Next.js App Router
'use client';


import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowLeft, Phone, MapPin } from 'lucide-react';

const BlogProtectYourHomePage: React.FC = () => {
  return (
    <main className="bg-white">

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img
          src="/blog_hero_roofing.png"
          alt="Beautiful West Georgia home with expert McKinley roofing installation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-10 md:p-16">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4">Roofing Tips</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Protect Your Home with Expert Roofing Services
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-4 text-slate-300 text-sm">
              <span className="flex items-center gap-2"><Calendar size={14} /> August 23, 2025</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> Douglasville, GA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm mb-10 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Intro */}
        <p className="text-xl text-slate-700 leading-relaxed mb-10 font-medium border-l-4 border-red-600 pl-6">
          Your roof is one of the most important investments you can make in your home. It shields your family from the elements, protects your belongings, and plays a major role in your property's overall value. When your roof is compromised — whether from age, storm damage, or wear and tear — the consequences can ripple through every part of your home.
        </p>

        <p className="text-slate-600 leading-relaxed mb-8">
          That's why choosing expert roofing services isn't just a smart decision, it's an essential one. At McKinley Roofing and Restoration, we understand what's at stake. As a locally owned, family-run roofing contractor serving Douglasville, GA and the greater West Georgia area, we've built our reputation on quality workmanship, honest assessments, and results that last.
        </p>

        {/* Section 1 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">Why Your Roof Deserves Professional Attention</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          Many homeowners don't think about their roof until something goes wrong — a leak, missing shingles, or visible damage after a storm. But waiting until problems become serious can lead to far more expensive repairs down the road. Water intrusion, for example, can compromise insulation, damage drywall, breed mold, and even weaken structural framing. What starts as a minor roof issue can quickly become a major home repair project.
        </p>
        <p className="text-slate-600 leading-relaxed mb-10">
          Regular professional inspections and timely repairs are the best way to protect your home and your wallet. A qualified roofing contractor can spot early signs of damage, assess the lifespan of your current roof, and recommend the most cost-effective course of action — whether that's a targeted repair or a full replacement.
        </p>

        {/* Inline callout */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 mb-12 flex gap-5 items-start">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
            <Phone size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-lg mb-1">Schedule Your Free Roof Inspection</p>
            <p className="text-slate-600 text-sm">Don't wait for a small problem to become a big one. Call us today at <a href="tel:6789834455" className="text-red-600 font-semibold">(678) 983-4455</a> or use the form on our site to book your free assessment.</p>
          </div>
        </div>

        {/* Section 2 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">Expert Roof Repair That Gets It Right the First Time</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          Not all roof damage requires a full replacement, and not all repairs are created equal. At McKinley Roofing, we take a thorough, no-nonsense approach to roof repair. We identify the root cause of the problem — not just the symptom — so you aren't calling us back for the same issue a few months later.
        </p>
        <p className="text-slate-600 leading-relaxed mb-10">
          From cracked or missing shingles and damaged flashing to leaks around chimneys and skylights, our team handles the full range of residential roofing repairs with precision and care. We use quality materials designed to match your existing roof and stand up to Georgia's unpredictable weather.
        </p>

        {/* Inline photo */}
        <figure className="my-12 rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/blog_storm_damage_roofing.png"
            alt="McKinley Roofing contractor inspecting storm damage on a residential roof"
            className="w-full object-cover max-h-[480px]"
          />
          <figcaption className="bg-slate-100 text-slate-500 text-sm text-center py-3 px-6 italic">
            McKinley Roofing professionals act fast after storm events to document damage and begin restoration.
          </figcaption>
        </figure>

        {/* Section 3 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">Storm Damage Restoration: Fast Response When It Matters Most</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          Georgia storms can be brutal. High winds, heavy rain, and hail can cause significant damage to your roof in a matter of minutes. If your home has been hit by a storm, prompt action is critical. Leaving storm damage unaddressed — even what looks like minor damage — can lead to leaks, structural issues, and insurance complications.
        </p>
        <p className="text-slate-600 leading-relaxed mb-10">
          McKinley Roofing and Restoration specializes in storm damage assessment and restoration. We document damage thoroughly to support your insurance claim and work efficiently to restore your roof to pre-storm condition. Our team knows the local climate and understands the types of damage common in the Douglasville area, which means faster diagnoses and smarter repairs.
        </p>

        {/* Section 4 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">Full Roof Replacement Done Right</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          When a roof has reached the end of its useful life, replacement is the right investment. A new roof not only eliminates ongoing repair costs, but it also improves energy efficiency, boosts curb appeal, and significantly increases your home's resale value.
        </p>
        <p className="text-slate-600 leading-relaxed mb-10">
          McKinley Roofing guides homeowners through every step of the replacement process — from choosing the right materials and style for your home, to managing the project timeline, to final clean-up and inspection. We stand behind our work and ensure the job is done to the highest standard.
        </p>

        {/* Section 5 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">More Than Just Roofing</h2>
        <p className="text-slate-600 leading-relaxed mb-10">
          In addition to roofing repair, replacement, and storm restoration, McKinley Roofing and Restoration also offers gutter services and exterior painting — giving homeowners a trusted partner for multiple aspects of home exterior maintenance. A well-functioning gutter system is critical to protecting your roof and foundation, and our team can install, repair, or clean gutters as part of a comprehensive home protection plan.
        </p>

        {/* Section 6 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">Serving Douglasville and West Georgia</h2>
        <p className="text-slate-600 leading-relaxed mb-10">
          McKinley Roofing and Restoration is proud to be a part of the Douglasville community. As a locally owned business, we're invested in the homes and families we serve. We don't operate like a large national chain — we build real relationships, stand behind our work, and treat every home like it's our own. If you're in Douglasville, Atlanta, or the surrounding West Georgia area and need a roofing contractor you can trust, we'd love to earn your business.
        </p>

        {/* CTA box */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-10 md:p-14 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Schedule Your Free Roof Inspection Today</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Don't wait for a small problem to become a big one. Whether you've noticed signs of damage, want a professional assessment, or are considering a full replacement, McKinley Roofing and Restoration is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:6789834455"
              className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all inline-flex items-center gap-3"
            >
              <Phone size={20} /> (678) 983-4455
            </a>
            <Link
              href="/contact"
              className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Contact Us Online
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-6">McKinley Roofing and Restoration · Douglasville, GA</p>
        </div>

      </div>
    </main>
  );
};

export default BlogProtectYourHomePage;
