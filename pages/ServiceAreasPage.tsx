import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { locations } from '../data/locations';
import ServiceAreaMap from '../components/ServiceAreaMap';

const ServiceAreasPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Roofing Service Areas in West Georgia | McKinley Roofing</title>
                <meta
                    name="description"
                    content="McKinley Roofing serves Carrollton, Douglasville, Villa Rica, Newnan, Bremen, Dallas, and surrounding West Georgia communities. Owens Corning Preferred contractor. Free inspections."
                />
                <link rel="canonical" href="https://mckinleyroofing.com/locations" />
                <meta property="og:title" content="Roofing Service Areas in West Georgia | McKinley Roofing" />
                <meta
                    property="og:description"
                    content="McKinley Roofing serves Carrollton, Douglasville, Villa Rica, Newnan, Bremen, Dallas, and surrounding West Georgia communities."
                />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'RoofingContractor',
                        name: 'McKinley Roofing',
                        url: 'https://mckinleyroofing.com',
                        telephone: '+16789834455',
                        areaServed: locations.map((loc) => ({
                            '@type': 'City',
                            name: loc.city,
                            containedInPlace: { '@type': 'State', name: 'Georgia' },
                        })),
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'Carrollton',
                            addressRegion: 'GA',
                            addressCountry: 'US',
                        },
                    })}
                </script>
            </Helmet>

            <main className="pt-24">
                {/* ── Hero ── */}
                <section className="relative py-28 overflow-hidden">
                    {/* Real photo background */}
                    <div className="absolute inset-0">
                        <img
                            src="/MckInley Roofing Photos/McKinley_Roofing_1.jpg"
                            alt="McKinley Roofing crew at work in West Georgia"
                            className="w-full h-full object-cover object-center"
                            loading="eager"
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-slate-900/80" />
                        {/* Subtle red accent */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-transparent" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                            <MapPin className="w-4 h-4" />
                            West Georgia's Trusted Roofer
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Our Service Areas
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                            McKinley Roofing proudly serves homeowners across West Georgia. Select your city below to learn about our local roofing services.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-red-600/30 cursor-pointer"
                            >
                                Get a Free Inspection
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href="tel:+16789834455"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-white/20 transition-all duration-200 cursor-pointer"
                            >
                                <Phone className="w-4 h-4" />
                                (678) 983-4455
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── Location Cards ── */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">Cities We Serve</h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Click on your city to see local roofing services, testimonials, and more.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {locations.map((loc) => (
                                <Link
                                    key={loc.slug}
                                    to={`/locations/${loc.slug}`}
                                    className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-red-50 rounded-xl w-12 h-12 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-200">
                                            <MapPin className="w-6 h-6 text-red-600" />
                                        </div>
                                        {loc.isHQ && (
                                            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                HQ
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors duration-200">
                                        {loc.city}, {loc.state}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-4">{loc.county}</p>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{loc.subheadline}</p>

                                    <div className="flex items-center gap-2 text-red-600 font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                                        View Local Services
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Photo Strip ── */}
                <section className="py-12 bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { src: '/MckInley Roofing Photos/McKinley_Roofing_22.jpg', alt: 'McKinley crew nailing shingles' },
                                { src: '/MckInley Roofing Photos/McKinley_Roofing_10.jpg', alt: 'Roofer laying underlayment' },
                                { src: '/MckInley Roofing Photos/McKinley_Roofing_15.jpg', alt: 'McKinley roofer with nail gun' },
                                { src: '/MckInley Roofing Photos/McKinley_Roofing_20.jpg', alt: 'McKinley team consulting homeowner' },
                            ].map((photo, i) => (
                                <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Map ── */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Service Area Map</h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                We cover a 30-mile radius across West Georgia — from Carrollton to Douglasville and beyond.
                            </p>
                        </div>
                        <ServiceAreaMap />
                    </div>
                </section>

                {/* ── Why McKinley strip ── */}
                <section className="py-16 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: Star, title: '5-Star Rated', desc: 'Consistently top-rated by West Georgia homeowners on Google.' },
                                { icon: CheckCircle, title: 'Owens Corning Preferred', desc: 'Certified contractor with access to premium materials and extended warranties.' },
                                { icon: MapPin, title: 'Locally Owned', desc: 'Family-owned and operated right here in West Georgia.' },
                                { icon: Phone, title: 'Free Inspections', desc: 'No cost, no obligation roof inspections for all service area cities.' },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
                                        <div className="bg-red-50 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-6 h-6 text-red-600" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Don't See Your City?
                        </h2>
                        <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
                            We may still be able to help. Give us a call or send us a message — we'll let you know if you're in our service area.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-lg cursor-pointer"
                            >
                                Contact Us
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href="tel:+16789834455"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-800 text-white font-bold rounded-xl hover:bg-red-900 transition-colors duration-200 border-2 border-white/20 cursor-pointer"
                            >
                                <Phone className="w-5 h-5" />
                                (678) 983-4455
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default ServiceAreasPage;
