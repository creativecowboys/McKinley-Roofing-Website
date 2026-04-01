
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Phone, MapPin, CheckCircle } from 'lucide-react';

const BlogRoofingExpertisePage: React.FC = () => {
  return (
    <main className="bg-white">

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img
          src="/blog_investment_hero.png"
          alt="Beautiful West Georgia brick home with new dark architectural shingle roof"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-10 md:p-16">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4">Roofing Tips</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Protect Your Investment with Our Roofing Expertise
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-4 text-slate-300 text-sm">
              <span className="flex items-center gap-2"><Calendar size={14} /> August 24, 2025</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> Douglasville, GA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm mb-10 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Intro */}
        <p className="text-xl text-slate-700 leading-relaxed mb-8 font-medium border-l-4 border-red-600 pl-6">
          Your home is likely the single largest investment you'll ever make. And while most homeowners focus on interior upgrades, landscaping, or curb appeal, there's one element that quietly protects everything else — your roof.
        </p>

        <p className="text-slate-600 leading-relaxed mb-8">
          A well-maintained roof keeps moisture out, regulates energy efficiency, and preserves the structural integrity of your entire home. When it fails, the damage can cascade quickly and cost far more than the roof itself. At McKinley Roofing and Restoration, we help homeowners in Douglasville, GA and throughout the West Georgia area safeguard that investment with expert roofing services backed by real craftsmanship and local know-how.
        </p>

        {/* Section 1 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">The True Cost of Neglecting Your Roof</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          A deteriorating roof rarely announces itself loudly. More often, it starts small — a lifted shingle, a slow leak, a patch of granule loss on aging asphalt. Homeowners can easily miss these early warning signs, especially without regular professional inspections. By the time water stains appear on the ceiling or drywall starts to sag, the damage has usually been building for months.
        </p>
        <p className="text-slate-600 leading-relaxed mb-10">
          The financial impact can be significant. Water intrusion leads to mold growth, rotted decking, damaged insulation, and compromised framing. What could have been a modest repair job can balloon into a major restoration project — or worse, a full roof replacement combined with interior repairs. Protecting your investment means staying ahead of those issues before they escalate.
        </p>

        {/* Section 2 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">What Sets Expert Roofing Apart</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          Not all roofing work is equal. There's a meaningful difference between a quick patch job and a proper repair done by someone who understands roofing systems from the ground up. At McKinley Roofing, our approach is diagnostic first — we assess the full picture before recommending any work. We look at the roof deck, flashing, ventilation, and drainage, not just the surface-level damage.
        </p>
        <p className="text-slate-600 leading-relaxed mb-10">
          That thoroughness matters. It means we catch underlying issues that a less experienced contractor might miss, and it means the work we do lasts. We use quality materials appropriate for Georgia's climate — materials that hold up against summer heat, heavy rain, and the occasional severe storm that rolls through the region.
        </p>

        {/* Services list */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-6">Residential Roofing Services Tailored to Your Needs</h2>
        <p className="text-slate-600 leading-relaxed mb-8">Every roof and every homeowner's situation is different. McKinley Roofing offers a full range of residential roofing services to meet you where you are:</p>

        <div className="space-y-5 mb-12">
          {[
            { title: 'Roof Repair', desc: 'Whether you\'re dealing with a few damaged shingles, a flashing leak, or storm-related damage, our repair services are designed to resolve the problem completely, not just cosmetically. We identify and fix the source of the issue so you\'re not dealing with the same problem again next season.' },
            { title: 'Roof Replacement', desc: 'When a roof has run its course, replacement is often the most cost-effective long-term solution. We help homeowners choose the right roofing system for their home and budget, manage the project professionally, and leave the property clean and the job done right.' },
            { title: 'Storm Damage Restoration', desc: 'Georgia storms can be sudden and severe. High winds and hail leave behind damage that isn\'t always obvious to an untrained eye. McKinley Roofing responds quickly to assess and restore storm-damaged roofs, and we help homeowners navigate the insurance claims process with thorough documentation and professional support.' },
            { title: 'Roof Maintenance', desc: 'Routine maintenance extends the life of your roof and protects your investment over the long haul. From inspections to minor tune-ups and cleaning, proactive maintenance is one of the smartest things a homeowner can do.' },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <CheckCircle size={22} className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 mb-1">{item.title}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Inline photo */}
        <figure className="my-12 rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/blog_gutter_roofing.png"
            alt="McKinley Roofing contractor installing gutters on a suburban West Georgia home"
            className="w-full object-cover max-h-[480px]"
          />
          <figcaption className="bg-slate-100 text-slate-500 text-sm text-center py-3 px-6 italic">
            Proper gutter installation is a critical part of a complete home exterior protection plan.
          </figcaption>
        </figure>

        {/* Section 3 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">Gutters: The Unsung Partner of a Healthy Roof</h2>
        <p className="text-slate-600 leading-relaxed mb-10">
          A roof is only as effective as its drainage system. Clogged or damaged gutters can cause water to back up under roofing materials, pool around your foundation, and create the exact moisture problems you're trying to prevent. McKinley Roofing also handles gutter installation and repair, giving homeowners a comprehensive exterior protection solution from a single trusted contractor.
        </p>

        {/* Section 4 */}
        <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">A Local Contractor You Can Count On</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          McKinley Roofing and Restoration is a family-owned business rooted in the Douglasville community. We're not a franchise or a large out-of-town operation — we're your neighbors, and we treat every project with the care and accountability that comes with that. Our reputation is built on word-of-mouth, repeat customers, and results that speak for themselves.
        </p>
        <p className="text-slate-600 leading-relaxed mb-10">
          When you hire McKinley Roofing, you get a team that shows up on time, communicates clearly, and stands behind its work. That's the standard we hold ourselves to on every job, regardless of size.
        </p>

        {/* CTA box */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-10 md:p-14 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Get a Free Roof Inspection Today</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            The best way to protect your investment is to know exactly where things stand. Our free roof inspections give you an honest, professional assessment — no pressure, no upselling, just the facts you need to make an informed decision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:6789834455"
              className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all inline-flex items-center gap-3"
            >
              <Phone size={20} /> (678) 983-4455
            </a>
            <Link
              to="/contact"
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

export default BlogRoofingExpertisePage;
