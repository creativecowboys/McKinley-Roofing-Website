import React from 'react';
import { Wrench, Home, CloudRain, Calendar, Droplets, PaintBucket, Shield, CheckCircle, Phone } from 'lucide-react';

const ServicesPage: React.FC = () => {
    const services = [
        {
            icon: Wrench,
            title: 'Roof Repair Services',
            description: 'Comprehensive repair services designed to address damage quickly and effectively, preventing minor issues from becoming major problems.',
            features: [
                'Thorough inspection to assess full extent of damage',
                'Prompt and efficient repairs using high-quality materials',
                'Professional leak detection and repair',
                'Shingle replacement for damaged or missing shingles',
                'Flashing repair around chimneys, vents, and valleys',
                'Emergency roof repair services for urgent situations'
            ],
            color: 'red'
        },
        {
            icon: Home,
            title: 'Roof Replacement Services',
            description: 'Complete replacement services for residential and commercial properties when repairs are no longer cost-effective.',
            features: [
                'Comprehensive inspection to assess existing roof condition',
                'Customized replacement plan tailored to needs and budget',
                'High-quality roofing materials from trusted manufacturers',
                'Professional installation by skilled craftsmen',
                'Meticulous attention to detail for durability',
                'Both manufacturer and labor warranties'
            ],
            color: 'blue'
        },
        {
            icon: CloudRain,
            title: 'Storm Damage Restoration',
            description: 'Specialized help for homeowners recovering from storm damage, including hail and wind damage, with expert insurance coordination.',
            features: [
                'Detailed damage assessment and documentation',
                'Direct coordination with insurance companies',
                'Assistance with claims process and paperwork',
                'Expert testimony on damage extent when needed',
                'Complete restoration to pre-damage condition or better',
                'Maximize insurance benefits and minimize out-of-pocket costs'
            ],
            color: 'purple'
        },
        {
            icon: Calendar,
            title: 'Proactive Roof Maintenance',
            description: 'Preventive maintenance services to protect your roofing investment and extend the lifespan of your roof.',
            features: [
                'Regular inspections to identify potential issues early',
                'Cleaning gutters and downspouts to prevent water buildup',
                'Repairing minor issues before they escalate',
                'Applying protective coatings to extend roof life',
                'Expert advice on roof care and maintenance best practices'
            ],
            color: 'green'
        },
        {
            icon: Droplets,
            title: 'Gutter Installation',
            description: 'Professional seamless gutter systems designed to effectively channel water away from your structure.',
            features: [
                'Customized gutter design for each property',
                'High-quality, durable gutter materials',
                'Professional installation by experienced technicians',
                'Downspout installation and strategic water redirection',
                'Maintenance tips to keep systems functioning optimally'
            ],
            color: 'cyan'
        },
        {
            icon: PaintBucket,
            title: 'Interior & Exterior Painting',
            description: 'Comprehensive painting services for both interior and exterior applications, allowing you to address multiple home improvement needs.',
            features: [
                'Interior painting for walls, ceilings, trim, and more',
                'Exterior painting for siding, trim, doors, and windows',
                'Complete surface preparation (cleaning, sanding, priming)',
                'Custom color consultation services',
                'Professional application techniques for flawless results'
            ],
            color: 'orange'
        }
    ];

    const colorClasses = {
        red: {
            bg: 'bg-red-100',
            text: 'text-red-600',
            hover: 'hover:border-red-600'
        },
        blue: {
            bg: 'bg-blue-100',
            text: 'text-blue-600',
            hover: 'hover:border-blue-600'
        },
        purple: {
            bg: 'bg-purple-100',
            text: 'text-purple-600',
            hover: 'hover:border-purple-600'
        },
        green: {
            bg: 'bg-green-100',
            text: 'text-green-600',
            hover: 'hover:border-green-600'
        },
        cyan: {
            bg: 'bg-cyan-100',
            text: 'text-cyan-600',
            hover: 'hover:border-cyan-600'
        },
        orange: {
            bg: 'bg-orange-100',
            text: 'text-orange-600',
            hover: 'hover:border-orange-600'
        }
    };

    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-36">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Our Services
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed">
                            Comprehensive roofing solutions from repair to replacement, storm damage restoration to preventive maintenance—all backed by our Quality over Quantity philosophy.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            const colors = colorClasses[service.color as keyof typeof colorClasses];

                            return (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl p-8 shadow-lg border-2 border-transparent ${colors.hover} transition-all duration-300 cursor-pointer hover:shadow-xl`}
                                >
                                    <div className={`${colors.bg} rounded-lg w-16 h-16 flex items-center justify-center mb-6`}>
                                        <Icon className={`w-8 h-8 ${colors.text}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

                                    <div className="space-y-3">
                                        {service.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start gap-3">
                                                <CheckCircle className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                                                <p className="text-slate-700 text-sm">{feature}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Service Process</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            A structured approach to ensure quality and customer satisfaction at every step
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { step: '1', title: 'Initial Contact', description: 'Reach out via phone, email, or website' },
                            { step: '2', title: 'Free Inspection', description: 'Comprehensive roof inspection to assess condition' },
                            { step: '3', title: 'Proposal', description: 'Customized solution with transparent pricing' },
                            { step: '4', title: 'Execution', description: 'Professional installation or repair by skilled crews' },
                            { step: '5', title: 'Warranty', description: 'Complete warranty documentation and support' }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose McKinley Roofing?</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            What sets us apart from other roofing contractors
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <Shield className="w-12 h-12 text-red-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Owens Corning Preferred</h3>
                            <p className="text-slate-600">
                                Certified contractor status ensures quality materials, proper installation, and extended warranty options.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <Home className="w-12 h-12 text-red-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Family-Owned & Local</h3>
                            <p className="text-slate-600">
                                Deep community roots in Douglasville with personalized service and direct access to decision-makers.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <CloudRain className="w-12 h-12 text-red-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Insurance Experts</h3>
                            <p className="text-slate-600">
                                Extensive experience working with insurance companies to maximize your benefits and minimize costs.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <CheckCircle className="w-12 h-12 text-red-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Over Quantity</h3>
                            <p className="text-slate-600">
                                We prioritize thorough, excellent work over volume—getting things done right the first time.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <Shield className="w-12 h-12 text-red-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Dual Warranties</h3>
                            <p className="text-slate-600">
                                Both manufacturer warranties on materials and labor warranties on installation work for complete protection.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <Wrench className="w-12 h-12 text-red-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Comprehensive Services</h3>
                            <p className="text-slate-600">
                                One-stop solution for roofing, gutters, painting, and maintenance—consistency across all projects.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-red-100 mb-8">
                        Contact us today for a free roof inspection and customized solution for your home.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors duration-200 shadow-lg"
                        >
                            Request Free Inspection
                        </a>
                        <a
                            href="tel:6789834455"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition-colors duration-200 border-2 border-white/20"
                        >
                            <Phone className="w-5 h-5" />
                            (678) 983-4455
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ServicesPage;
