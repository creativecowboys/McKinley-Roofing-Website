import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    MapPin,
    Phone,
    CheckCircle,
    Shield,
    Star,
    Wrench,
    Home,
    CloudRain,
    Calendar,
    Droplets,
    PaintBucket,
    ArrowRight,
    Award,
    Users,
    Clock,
} from 'lucide-react';
import { getLocationBySlug, locations } from '../data/locations';

// Photo sets — rotated by location index so each city page feels unique
const HERO_PHOTOS = [
    '/MckInley Roofing Photos/McKinley_Roofing_1.jpg',
    '/MckInley Roofing Photos/McKinley_Roofing_7.jpg',
    '/MckInley Roofing Photos/McKinley_Roofing_11.jpg',
    '/MckInley Roofing Photos/McKinley_Roofing_16.jpg',
    '/MckInley Roofing Photos/McKinley_Roofing_22.jpg',
    '/MckInley Roofing Photos/McKinley_Roofing_23.jpg',
];

const GALLERY_SETS = [
    ['/MckInley Roofing Photos/McKinley_Roofing_3.jpg', '/MckInley Roofing Photos/McKinley_Roofing_15.jpg', '/MckInley Roofing Photos/McKinley_Roofing_20.jpg'],
    ['/MckInley Roofing Photos/McKinley_Roofing_5.jpg', '/MckInley Roofing Photos/McKinley_Roofing_10.jpg', '/MckInley Roofing Photos/McKinley_Roofing_25.jpg'],
    ['/MckInley Roofing Photos/McKinley_Roofing_2.jpg', '/MckInley Roofing Photos/McKinley_Roofing_8.jpg', '/MckInley Roofing Photos/McKinley_Roofing_19.jpg'],
    ['/MckInley Roofing Photos/McKinley_Roofing_4.jpg', '/MckInley Roofing Photos/McKinley_Roofing_13.jpg', '/MckInley Roofing Photos/McKinley_Roofing_24.jpg'],
    ['/MckInley Roofing Photos/McKinley_Roofing_6.jpg', '/MckInley Roofing Photos/McKinley_Roofing_14.jpg', '/MckInley Roofing Photos/McKinley_Roofing_26.jpg'],
    ['/MckInley Roofing Photos/McKinley_Roofing_9.jpg', '/MckInley Roofing Photos/McKinley_Roofing_17.jpg', '/MckInley Roofing Photos/McKinley_Roofing_21.jpg'],
];

const SIDE_PHOTOS = [
    '/MckInley Roofing Photos/McKinley_Roofing_20.jpg',
    '/MckInley Roofing Photos/McKinley_Roofing_12.jpg',
    '/MckInley Roofing Photos/McKinley_Roofing_18.jpg',
    '/MckInley Roofing Photos/McKinley_Roofing_20.jpg',
    '/MckInley Roofing Photos/McKinley_Roofing_12.jpg',
    '/MckInley Roofing Photos/McKinley_Roofing_18.jpg',
];

const LocationPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const location = slug ? getLocationBySlug(slug) : undefined;

    if (!location) {
        return <Navigate to="/locations" replace />;
    }

    // Pick photos based on location index for variety
    const locIndex = locations.findIndex((l) => l.slug === location.slug);
    const heroPhoto = HERO_PHOTOS[locIndex % HERO_PHOTOS.length];
    const galleryPhotos = GALLERY_SETS[locIndex % GALLERY_SETS.length];
    const sidePhoto = SIDE_PHOTOS[locIndex % SIDE_PHOTOS.length];

    const services = [
        {
            icon: Wrench,
            title: 'Roof Repair',
            description: `Fast, reliable roof repair in ${location.city}. We fix leaks, damaged shingles, flashing issues, and more — preventing small problems from becoming costly disasters.`,
        },
        {
            icon: Home,
            title: 'Roof Replacement',
            description: `Complete roof replacement for ${location.city} homeowners. Premium Owens Corning materials, expert installation, and both manufacturer and labor warranties.`,
        },
        {
            icon: CloudRain,
            title: 'Storm Damage Restoration',
            description: `${location.city} storms can cause serious damage. We handle hail, wind, and impact damage — including full insurance claim coordination to maximize your benefits.`,
        },
        {
            icon: Calendar,
            title: 'Roof Maintenance',
            description: `Proactive maintenance plans for ${location.city} homeowners. Regular inspections, gutter cleaning, and minor repairs to extend the life of your roof.`,
        },
        {
            icon: Droplets,
            title: 'Gutter Installation',
            description: `Seamless gutter systems designed for ${location.city} homes. Professional installation that channels water away from your foundation and landscaping.`,
        },
        {
            icon: PaintBucket,
            title: 'Interior & Exterior Painting',
            description: `Full-service painting for ${location.city} properties. Interior and exterior applications with complete surface prep and custom color consultation.`,
        },
    ];

    const trustStats = [
        { icon: Star, value: '5-Star', label: 'Google Rating' },
        { icon: Award, value: 'Owens Corning', label: 'Preferred Contractor' },
        { icon: Users, value: 'Family-Owned', label: 'Local Business' },
        { icon: Clock, value: 'Same-Day', label: 'Inspection Available' },
    ];

    const testimonials = [
        {
            name: 'James R.',
            location: `${location.city}, GA`,
            text: `McKinley Roofing did an outstanding job on our home. The crew was professional, cleaned up completely, and the roof looks incredible. Highly recommend to anyone in ${location.city}.`,
            rating: 5,
        },
        {
            name: 'Sandra M.',
            location: `${location.county}`,
            text: 'After the storm, they worked directly with our insurance company and made the whole process stress-free. Quality work and honest pricing — exactly what you want in a roofing contractor.',
            rating: 5,
        },
        {
            name: 'David K.',
            location: `${location.city}, GA`,
            text: "From the free inspection to the final walkthrough, McKinley Roofing was communicative and thorough. They truly live by their 'Quality over Quantity' motto.",
            rating: 5,
        },
    ];

    return (
        <>
            <Helmet>
                <title>{location.metaTitle}</title>
                <meta name="description" content={location.metaDescription} />
                <link rel="canonical" href={`https://mckinleyroofing.com/locations/${location.slug}`} />
                <meta property="og:title" content={location.metaTitle} />
                <meta property="og:description" content={location.metaDescription} />
                <meta property="og:type" content="website" />
                <meta name="geo.region" content={`US-GA`} />
                <meta name="geo.placename" content={`${location.city}, Georgia`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'RoofingContractor',
                        name: 'McKinley Roofing',
                        description: location.metaDescription,
                        url: `https://mckinleyroofing.com/locations/${location.slug}`,
                        telephone: '+16789834455',
                        areaServed: {
                            '@type': 'City',
                            name: location.city,
                            containedInPlace: {
                                '@type': 'State',
                                name: 'Georgia',
                            },
                        },
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
                <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 overflow-hidden">
                    {/* Decorative background accent */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/5 skew-x-12 translate-x-1/4" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/locations" className="hover:text-white transition-colors">Service Areas</Link>
                            <span>/</span>
                            <span className="text-white">{location.city}, {location.state}</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                {/* Location badge */}
                                <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                                    <MapPin className="w-4 h-4" />
                                    {location.county}
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                    {location.headline}
                                </h1>
                                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                                    {location.subheadline}
                                </p>

                                {/* Nearby areas */}
                                <p className="text-sm text-slate-400 mb-8">
                                    Also serving:{' '}
                                    {location.nearbyAreas.map((area, i) => (
                                        <span key={area}>
                                            <span className="text-slate-300">{area}</span>
                                            {i < location.nearbyAreas.length - 1 && <span className="text-slate-500">, </span>}
                                        </span>
                                    ))}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
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

                                {/* Trust stats row */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
                                    {trustStats.map((stat) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div
                                                key={stat.label}
                                                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                                            >
                                                <Icon className="w-6 h-6 text-red-400 mx-auto mb-2" />
                                                <div className="text-sm font-bold text-white mb-0.5">{stat.value}</div>
                                                <div className="text-xs text-slate-400 uppercase tracking-wider leading-tight">{stat.label}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Hero photo */}
                            <div className="relative hidden lg:block">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
                                    <img
                                        src={heroPhoto}
                                        alt={`McKinley Roofing crew working in ${location.city}, GA`}
                                        className="w-full h-full object-cover"
                                        loading="eager"
                                    />
                                    {/* Overlay badge */}
                                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                                        <MapPin className="w-3 h-3 text-red-400" />
                                        Serving {location.city} & Surrounding Areas
                                    </div>
                                </div>
                                {/* Decorative ring */}
                                <div className="absolute -inset-3 rounded-3xl border border-white/10 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Services Grid ── */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">
                                Roofing Services in {location.city}
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Comprehensive roofing solutions for {location.city} homeowners — all backed by our Quality over Quantity philosophy.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <div
                                        key={service.title}
                                        className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                    >
                                        <div className="bg-red-50 rounded-xl w-14 h-14 flex items-center justify-center mb-5 group-hover:bg-red-100 transition-colors duration-200">
                                            <Icon className="w-7 h-7 text-red-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Why McKinley ── */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                    Why {location.city} Homeowners Choose McKinley Roofing
                                </h2>
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                    We're not a national chain — we're your neighbors. McKinley Roofing is a family-owned business rooted in West Georgia, and we treat every {location.city} home like it's our own.
                                </p>

                                <div className="space-y-5">
                                    {[
                                        {
                                            title: 'Owens Corning Preferred Contractor',
                                            desc: 'Certified status means access to premium materials, proper installation standards, and extended warranty options unavailable elsewhere.',
                                        },
                                        {
                                            title: 'Insurance Claim Experts',
                                            desc: `We work directly with insurance companies on behalf of ${location.city} homeowners — maximizing your benefits and minimizing out-of-pocket costs.`,
                                        },
                                        {
                                            title: 'Dual Warranty Protection',
                                            desc: 'Both manufacturer warranties on materials and labor warranties on our installation work — complete peace of mind.',
                                        },
                                        {
                                            title: 'Quality Over Quantity',
                                            desc: 'We limit our project load to ensure every roof in ${location.city} gets our full attention. No shortcuts, no rushing.',
                                        },
                                    ].map((item) => (
                                        <div key={item.title} className="flex items-start gap-4">
                                            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4 text-red-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Photo + Credentials card stacked */}
                            <div className="flex flex-col gap-6">
                                {/* Real photo */}
                                <div className="rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '16/9' }}>
                                    <img
                                        src={sidePhoto}
                                        alt={`McKinley Roofing serving ${location.city}, GA homeowners`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Credentials card */}
                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
                                    <Shield className="w-10 h-10 text-red-400 mb-4" />
                                    <h3 className="text-xl font-bold mb-2">Serving {location.city} & Beyond</h3>
                                    <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                                        From {location.city} to {location.nearbyAreas.slice(0, 3).join(', ')} — McKinley Roofing is the trusted choice across {location.county}.
                                    </p>

                                    <div className="space-y-2 mb-6">
                                        {['Licensed & Insured in Georgia', 'Owens Corning Preferred', 'Free Roof Inspections', 'Same-Day Emergency Response', 'Insurance Claim Assistance'].map((item) => (
                                            <div key={item} className="flex items-center gap-3 text-sm">
                                                <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                                                <span className="text-slate-300">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href="tel:+16789834455"
                                        className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                                    >
                                        <Phone className="w-5 h-5" />
                                        Call (678) 983-4455
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Testimonials ── */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">
                                What {location.city} Homeowners Are Saying
                            </h2>
                            <p className="text-xl text-slate-600">
                                Real reviews from real customers in {location.county}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {testimonials.map((t, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200"
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: t.rating }).map((_, si) => (
                                            <Star key={si} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                                    <div>
                                        <div className="font-bold text-slate-900">{t.name}</div>
                                        <div className="text-sm text-slate-500">{t.location}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Photo Gallery Strip ── */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-3">Our Work Speaks for Itself</h2>
                            <p className="text-slate-600">Real projects completed by the McKinley Roofing crew across West Georgia.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {galleryPhotos.map((photo, i) => (
                                <div key={i} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300" style={{ aspectRatio: '4/3' }}>
                                    <img
                                        src={photo}
                                        alt={`McKinley Roofing project in ${location.city}, GA — photo ${i + 1}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Other Locations ── */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                            Also Serving These West Georgia Communities
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {locations
                                .filter((loc) => loc.slug !== location.slug)
                                .map((loc) => (
                                    <Link
                                        key={loc.slug}
                                        to={`/locations/${loc.slug}`}
                                        className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3 rounded-full text-sm font-semibold hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                                    >
                                        <MapPin className="w-4 h-4" />
                                        {loc.city}, {loc.state}
                                    </Link>
                                ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready for a Free Roof Inspection in {location.city}?
                        </h2>
                        <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
                            Don't wait until a small issue becomes a major problem. Contact McKinley Roofing today — we'll come to you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-lg cursor-pointer"
                            >
                                Request Free Inspection
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

export default LocationPage;
