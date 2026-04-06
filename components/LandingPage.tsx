'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from '@/contexts/ModalContext';
import type { LandingPageConfig } from '@/lib/landing-pages';

// ─── Icons ───────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

// ─── Service-specific content config ─────────────────────────────────────────

interface ServiceContent {
  tagline: string;
  introParagraph: (city: string) => string;
  included: string[];
  whyMckinley: string[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'roof-replacement': {
    tagline: 'Built to Last — Done Right the First Time',
    introParagraph: (city) =>
      `When it's time for a full roof replacement in ${city}, GA, McKinley Roofing delivers the craftsmanship and materials your home deserves. We work with Owens Corning shingles and follow manufacturer-approved installation methods so your new roof qualifies for the strongest warranties available. Whether your current roof is showing its age or suffered serious storm damage, our West Georgia team will complete your replacement efficiently — with zero shortcuts and zero surprises.`,
    included: [
      'Full tear-off and disposal of old roofing materials',
      'Owens Corning shingles (multiple style & color options)',
      'New underlayment, drip edge, ice & water shield',
      'Flashing replacement around chimneys and vents',
      'Ridge cap and ventilation upgrade',
      'Final inspection and cleanup',
      'Lifetime Workmanship Warranty',
    ],
    whyMckinley: [
      'Owens Corning Preferred Contractor status',
      'Lifetime Workmanship Warranty on every replacement',
      'Fully licensed, insured & bonded in Georgia',
      '4.9 stars across 70+ verified Google reviews',
      'Serving ${city} and all of West Georgia',
    ],
  },
  'roof-repair': {
    tagline: 'Fast Fixes. Lasting Results.',
    introParagraph: (city) =>
      `A leaking or damaged roof doesn't get better on its own. McKinley Roofing provides dependable roof repair services throughout ${city}, GA and surrounding West Georgia communities. From missing shingles and flashing failures to sagging decking and interior water intrusion, our crew diagnoses the problem accurately and repairs it correctly — so you're not calling us back for the same issue next season.`,
    included: [
      'Thorough roof and attic inspection',
      'Shingle repair or replacement (matched to existing)',
      'Flashing repair around chimneys, vents & skylights',
      'Valley and ridge cap repair',
      'Roof deck repair for rotted or sagging sections',
      'Sealant and caulking for minor penetrations',
      'Detailed photo documentation before & after',
    ],
    whyMckinley: [
      'Same-week scheduling available for urgent repairs',
      'Transparent pricing — no hidden fees',
      'Backed by a Lifetime Workmanship Warranty',
      'Fully insured; we handle any damage caused during work',
      '4.9-star rating from over 70 happy customers',
    ],
  },
  'storm-damage-restoration': {
    tagline: 'When Storms Hit, We\'re Ready.',
    introParagraph: (city) =>
      `Georgia storms can leave your roof battered overnight. McKinley Roofing offers rapid-response storm damage restoration in ${city}, GA — helping homeowners assess wind, hail, and falling-debris damage quickly so temporary protection is in place before more rain arrives. We work directly with most major insurance carriers and can help you understand your claim, document the damage thoroughly, and restore your roof to pre-storm condition.`,
    included: [
      'Emergency tarping and temporary protection',
      'Complete storm damage inspection (wind, hail, debris)',
      'Detailed damage report for insurance claims',
      'Insurance adjuster walk-through support',
      'Full repair or replacement based on damage scope',
      'Supplement filing assistance if needed',
      'Final walkthrough and warranty documentation',
    ],
    whyMckinley: [
      'Rapid response within 24–48 hours of storm events',
      'Experienced with all major insurance carriers',
      'No-obligation free damage inspection',
      'Lifetime Workmanship Warranty post-restoration',
      'Locally rooted in West Georgia since day one',
    ],
  },
  'gutter-installation': {
    tagline: 'Stop Water Damage Before It Starts.',
    introParagraph: (city) =>
      `Properly installed gutters are the first line of defense against foundation damage, landscaping erosion, and siding rot. McKinley Roofing provides professional gutter installation in ${city}, GA — using seamless aluminum gutters cut on-site for a perfect fit. Our installations are designed to handle Georgia's intense rainfall seasons without sagging, leaking, or pulling away from the fascia.`,
    included: [
      'Seamless aluminum gutter fabrication (on-site)',
      'Multiple size options: 5" and 6" K-style',
      'Color-matched to home exterior',
      'Properly sloped and anchored installation',
      'Downspouts with underground drainage extensions',
      'Leaf guard / gutter protection options available',
      'Full cleanup and inspection on completion',
    ],
    whyMckinley: [
      'Seamless gutters eliminate the most common leak points',
      'On-site fabrication for a custom fit',
      'Paired with roofing work for a complete water management system',
      'Fully insured installation crew',
      'Competitive pricing with financing options available',
    ],
  },
  'siding-installation': {
    tagline: 'Fresh Look. Lasting Protection.',
    introParagraph: (city) =>
      `Your home's siding does more than improve curb appeal — it's a critical weather barrier. McKinley Roofing offers professional siding installation and repair throughout ${city}, GA, helping homeowners upgrade aging or damaged siding with attractive, durable materials that stand up to West Georgia's heat, humidity, and storm seasons. Whether you're replacing a few damaged panels or doing a full exterior transformation, our crew delivers a clean, properly installed result.`,
    included: [
      'Full inspection of existing siding and sheathing',
      'Removal and disposal of old siding materials',
      'Vinyl, fiber cement, or wood composite options',
      'Moisture barrier and house wrap installation',
      'Trim and corner board finishing',
      'Caulking and sealing at all penetrations',
      'Lifetime Workmanship Warranty',
    ],
    whyMckinley: [
      'Experienced with vinyl, fiber cement, and wood composite siding',
      'Matches siding work with roofing for full exterior packages',
      'Fully licensed, insured & bonded in Georgia',
      '4.9 stars across 70+ Google reviews',
      'Proudly serving ${city} and surrounding West Georgia cities',
    ],
  },
  'roof-maintenance': {
    tagline: 'Small Checkups. Big Savings.',
    introParagraph: (city) =>
      `Routine roof maintenance is the most cost-effective way to extend the life of your roof and avoid surprise repair bills. McKinley Roofing offers professional maintenance programs for homeowners throughout ${city}, GA. Our technicians perform a thorough inspection, clear debris from valleys and gutters, re-seal vulnerable penetrations, and flag any issues before they escalate — keeping your warranty active and your home protected year-round.`,
    included: [
      'Full roof surface inspection (shingles, flashing, ridge)',
      'Valley and gutter debris removal',
      'Re-sealing of pipe boots, vents, and skylights',
      'Flashing inspection and spot repair',
      'Attic moisture and ventilation check',
      'Written condition report with photos',
      'Priority scheduling for any follow-up repairs',
    ],
    whyMckinley: [
      'Proactive maintenance prevents 80% of premature roof failures',
      'Keeps Owens Corning warranty requirements current',
      'Transparent reporting — you see exactly what we find',
      'Discounted repair rates for maintenance plan members',
      'Serving ${city} homeowners all year long',
    ],
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface LandingPageProps {
  page: LandingPageConfig;
}

const LandingPage: React.FC<LandingPageProps> = ({ page }) => {
  const { openModal } = useModal();
  const { serviceName, cityName } = page;
  const content = SERVICE_CONTENT[page.serviceSlug];

  // Inject city name into dynamic placeholder strings
  const resolveString = (str: string) => str.replace(/\${city}/g, cityName);

  const included = content.included;
  const whyMckinley = content.whyMckinley.map(resolveString);
  const introParagraph = content.introParagraph(cityName);

  return (
    <main className="bg-white">

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <section
        className="relative pt-52 pb-20 md:pt-60 md:pb-24 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #b91c1c 100%)',
        }}
      >
        {/* Subtle diagonal texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.15) 40px, rgba(255,255,255,0.15) 80px)',
          }}
        />
        <div className="relative container mx-auto px-4 lg:px-8 max-w-5xl">

          <p className="text-red-200 font-semibold uppercase tracking-widest text-sm mb-4">
            West Georgia&rsquo;s Trusted Roofers
          </p>

          {/* H1 — unique per page */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">
            {serviceName} in {cityName}, GA
          </h1>

          <p className="text-red-100 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
            {content.tagline}. McKinley Roofing — Owens Corning Preferred Contractor.
          </p>

          {/* Stars */}
          <div className="flex items-center gap-2 mb-10">
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            <span className="text-red-100 text-sm font-medium">4.9 &bull; 70+ Google Reviews</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={openModal}
              className="bg-white text-red-700 font-black px-8 py-4 rounded-xl hover:bg-red-50 transition-all shadow-xl text-sm tracking-widest uppercase cursor-pointer"
            >
              GET FREE INSPECTION
            </button>
            <a
              href="tel:6789834455"
              className="flex items-center justify-center gap-2 border-2 border-white text-white font-black px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-sm tracking-widest uppercase"
            >
              <PhoneIcon />
              (678) 983-4455
            </a>
          </div>
        </div>
      </section>

      {/* ── Intro + Trust Bar ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { label: 'Owens Corning', sub: 'Preferred Contractor' },
              { label: 'Lifetime', sub: 'Workmanship Warranty' },
              { label: 'Fully', sub: 'Insured & Bonded' },
              { label: '4.9 Stars', sub: '70+ Google Reviews' },
            ].map((badge) => (
              <div
                key={badge.label}
                className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm"
              >
                <p className="font-extrabold text-slate-900 text-sm leading-tight">{badge.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{badge.sub}</p>
              </div>
            ))}
          </div>

          {/* Intro paragraph */}
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Expert {serviceName} Serving {cityName}, GA
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{introParagraph}</p>
          </div>
        </div>
      </section>

      {/* ── What's Included ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-3 block">
                What&rsquo;s Included
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Our {serviceName} Process
              </h2>
              <ul className="space-y-3">
                {included.map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative card */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 text-white shadow-2xl">
              <p className="text-red-200 font-semibold uppercase tracking-widest text-sm mb-4">
                Ready to get started?
              </p>
              <h3 className="text-2xl font-extrabold mb-4">
                Free Roof Inspection for {cityName} Homeowners
              </h3>
              <p className="text-red-100 mb-6 leading-relaxed">
                No pressure. No obligation. Just an honest assessment from West Georgia&rsquo;s most trusted roofing crew.
              </p>
              <button
                onClick={openModal}
                className="w-full bg-white text-red-700 font-black py-4 rounded-xl hover:bg-red-50 transition-all text-sm tracking-widest uppercase cursor-pointer"
              >
                SCHEDULE MY FREE INSPECTION
              </button>
              <p className="text-red-200 text-center text-sm mt-4">
                Or call us at{' '}
                <a href="tel:6789834455" className="font-bold hover:text-white transition-colors">
                  (678) 983-4455
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why McKinley ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <span className="text-red-400 font-bold uppercase tracking-widest text-sm mb-3 block">
            Why McKinley Roofing
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">
            The Choice is Clear
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyMckinley.map((reason, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shrink-0 text-sm font-black">
                  {i + 1}
                </div>
                <p className="text-slate-300 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Area Note ──────────────────────────────────────────────── */}
      <section className="py-14 md:py-18 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 md:p-10">
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-3 block">
              Our Service Area
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Proudly Serving {cityName} and All of West Georgia
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              McKinley Roofing is based in Douglasville, GA and operates throughout a 30-mile service radius
              covering all of West Georgia. In addition to {cityName}, we regularly serve Douglasville,
              Carrollton, Villa Rica, Newnan, Hiram, Powder Springs, Dallas, Lithia Springs, Austell, and Bremen.
            </p>
            <p className="text-slate-600 leading-relaxed">
              If you&rsquo;re in or near {cityName} and need a trusted local roofing contractor, McKinley Roofing
              is just a call away — and we&rsquo;ll always be upfront about whether your address is within our
              service area.
            </p>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-red-700 to-red-500 text-white text-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Protect Your {cityName} Home?
          </h2>
          <p className="text-red-100 text-lg mb-10 leading-relaxed">
            Schedule your free, no-obligation inspection today. Our team is standing by to help {cityName}{' '}
            homeowners get the {serviceName.toLowerCase()} they need — on time, on budget, and done right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openModal}
              className="bg-white text-red-700 font-black px-10 py-4 rounded-xl hover:bg-red-50 transition-all shadow-xl text-sm tracking-widest uppercase cursor-pointer"
            >
              GET MY FREE INSPECTION
            </button>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-black px-10 py-4 rounded-xl hover:bg-white/10 transition-all text-sm tracking-widest uppercase text-center"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default LandingPage;
