'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowLeft, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { insuranceClaimFaqs as faqs } from '@/lib/blog-insurance-faqs';

const BlogInsuranceClaimsPage: React.FC = () => {
  return (
    <main className="bg-white">

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img
          src="/blog_storm_damage_roofing.png"
          alt="Roofing contractor inspecting shingle roof for a storm damage insurance claim in Douglasville, Georgia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-10 md:p-16">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4">Insurance Claims</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              How Roofing Insurance Claims Work in Georgia: A Homeowner's Guide
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-4 text-slate-300 text-sm">
              <span className="flex items-center gap-2"><Calendar size={14} /> August 9, 2026</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> Douglasville, GA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 py-16">

        <Link href="/" className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm mb-10 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Intro */}
        <p className="text-xl text-slate-700 leading-relaxed mb-10 font-medium border-l-4 border-red-600 pl-6">
          A hailstorm rolls through Douglas County, the sky clears, and everything looks fine from the driveway. Six months later there's a water stain spreading across the ceiling — and the insurance clock has been ticking the whole time. If you own a home in West Georgia, understanding how roofing insurance claims actually work is the difference between a fully covered roof and a five-figure bill.
        </p>

        <p className="text-slate-600 leading-relaxed mb-8">
          At McKinley Roofing and Restoration, we've walked hundreds of Douglasville-area homeowners through the claims process after wind and hail events. This guide covers what your policy actually pays for, the steps of a claim from first inspection to final payment, and the mistakes that get legitimate claims denied.
        </p>

        {/* Section 1 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">What Homeowners Insurance Covers — and What It Doesn't</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          Standard homeowners policies cover roof damage caused by sudden, accidental events: wind, hail, falling trees, and fire. In West Georgia, wind and hail are the big two — our spring and summer storm seasons produce exactly the kind of damage policies were written for.
        </p>
        <p className="text-slate-600 leading-relaxed mb-5">
          What insurance does <em>not</em> cover is aging and neglect. A 25-year-old roof that leaks because the shingles have worn out is a maintenance issue, not a claim. Insurers also increasingly write policies that pay less as a roof ages, which brings up the most important terms in your policy:
        </p>
        <ul className="space-y-3 mb-10">
          <li className="flex gap-3 text-slate-600 leading-relaxed">
            <CheckCircle2 size={22} className="text-red-600 shrink-0 mt-0.5" />
            <span><strong className="text-slate-900">Replacement Cost Value (RCV)</strong> — pays the full cost of replacing your roof at today's prices. The insurer typically holds back depreciation until the work is done, then releases it.</span>
          </li>
          <li className="flex gap-3 text-slate-600 leading-relaxed">
            <CheckCircle2 size={22} className="text-red-600 shrink-0 mt-0.5" />
            <span><strong className="text-slate-900">Actual Cash Value (ACV)</strong> — pays replacement cost <em>minus</em> depreciation for the roof's age. On an older roof, that deduction can be most of the bill.</span>
          </li>
          <li className="flex gap-3 text-slate-600 leading-relaxed">
            <CheckCircle2 size={22} className="text-red-600 shrink-0 mt-0.5" />
            <span><strong className="text-slate-900">Your deductible</strong> — many Georgia policies carry a separate wind/hail deductible, often a percentage of your home's insured value rather than a flat dollar amount. Know yours before you file.</span>
          </li>
        </ul>

        {/* Inline callout */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 mb-12 flex gap-5 items-start">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
            <Phone size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-lg mb-1">Not Sure If Your Damage Justifies a Claim?</p>
            <p className="text-slate-600 text-sm">That's exactly what a free inspection is for. Call <a href="tel:6789834455" className="text-red-600 font-semibold">(678) 983-4455</a> and we'll document what's up there before you ever call your insurer.</p>
          </div>
        </div>

        {/* Section 2 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">The Claims Process, Step by Step</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          <strong className="text-slate-900">1. Get the roof inspected and documented.</strong> Before you file anything, have a professional look at the roof. Hail bruising and lifted shingles are nearly impossible to spot from the ground, and you want photographic evidence tied to a date. This inspection also tells you whether the damage is likely to exceed your deductible — if it isn't, filing a claim gains you nothing.
        </p>
        <p className="text-slate-600 leading-relaxed mb-5">
          <strong className="text-slate-900">2. File the claim promptly.</strong> Policies require "prompt" notice, and many set hard deadlines measured from the storm date. Your insurer will open a claim, assign a claim number, and schedule an adjuster.
        </p>
        <p className="text-slate-600 leading-relaxed mb-5">
          <strong className="text-slate-900">3. Meet the adjuster — with your roofer present.</strong> The insurance adjuster inspects the roof and writes an estimate of covered damage. We strongly recommend having your contractor on the roof at the same time. Adjusters are human; a roofer who documented the damage beforehand makes sure nothing gets missed, from soft-metal hits on vents and flashing to matted ridge caps.
        </p>
        <p className="text-slate-600 leading-relaxed mb-5">
          <strong className="text-slate-900">4. Review the settlement and scope of work.</strong> The insurer issues an estimate and first payment (on RCV policies, depreciation is held back). If the adjuster's scope missed damage or underpriced the work, your contractor can submit a supplement with evidence — this is routine, not adversarial.
        </p>
        <p className="text-slate-600 leading-relaxed mb-10">
          <strong className="text-slate-900">5. Complete the work and recover depreciation.</strong> Once the roof is replaced and the final invoice is submitted, RCV policyholders receive the held-back depreciation. You pay your deductible — and legally, that's not optional. Any contractor who offers to "eat the deductible" is committing insurance fraud in Georgia, and that's a contractor to avoid.
        </p>

        {/* Section 3 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">Why Legitimate Claims Get Denied</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          Most denials we see in West Georgia come down to four things: the damage was reported too late, the damage was attributed to wear and tear rather than a storm, the documentation was thin, or the homeowner filed for damage that never reached the deductible in the first place.
        </p>
        <p className="text-slate-600 leading-relaxed mb-10">
          Every one of those is avoidable with the same habit: after any serious storm, get a free professional inspection with photos, even if the roof looks fine. If there's damage, you have dated evidence connecting it to the event. If there isn't, you have peace of mind and a baseline record for the future. Our <Link href="/storm-damage-restoration-douglasville-ga" className="text-red-600 font-semibold hover:underline">storm damage restoration team in Douglasville</Link> does exactly this documentation work every storm season.
        </p>

        {/* Section 4 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">Repair or Replace? Let the Evidence Decide</h2>
        <p className="text-slate-600 leading-relaxed mb-10">
          Insurance outcomes range from a targeted repair to a full replacement, depending on the extent and distribution of damage. Scattered wind damage on one slope may warrant <Link href="/roof-repair-douglasville-ga" className="text-red-600 font-semibold hover:underline">professional roof repair</Link>; widespread hail bruising usually justifies <Link href="/roof-replacement-douglasville-ga" className="text-red-600 font-semibold hover:underline">full roof replacement</Link> — and if your shingle line has been discontinued, matching rules can push a partial loss toward a full one. As an Owens Corning Preferred Contractor, McKinley installs materials with manufacturer-backed warranties, so the roof you get after a claim is better than the one the storm took.
        </p>

        {/* FAQ */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-slate-50 border border-slate-100 rounded-2xl p-7">
              <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-2 mt-8 italic">
          This article is general information, not legal or insurance advice. Coverage varies by policy — always confirm the details of your own policy with your insurance provider.
        </p>

        {/* CTA box */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-10 md:p-14 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Storm Damage? Start with a Free Inspection</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Before you call your insurance company, know exactly what's on your roof. McKinley Roofing and Restoration provides free, documented inspections across Douglasville and West Georgia — and we'll walk the claim with you from adjuster meeting to final nail.
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

export default BlogInsuranceClaimsPage;
