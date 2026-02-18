import React from 'react';
import { Shield, Award, Users, TrendingUp, CheckCircle, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                            About McKinley Roofing
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            Family-owned, locally operated roofing contractor serving Douglasville and West Georgia with honest work, quality craftsmanship, and exceptional customer service.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-lg text-slate-600">
                                <p>
                                    McKinley Roofing and Restoration is a family-owned business deeply rooted in the Douglasville and West Georgia community. We've built our reputation on a foundation of trust, quality, and exceptional service.
                                </p>
                                <p>
                                    As a locally operated business, our decision-makers are directly accessible to customers and deeply invested in maintaining our reputation within our own community. This isn't just business for us—it's personal.
                                </p>
                                <p>
                                    Our core philosophy centers on <strong>"Quality over Quantity"</strong>, emphasizing thorough workmanship and customer satisfaction rather than rushing through projects.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-600 rounded-lg p-3">
                                        <Heart className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Family-Owned</h3>
                                        <p className="text-slate-600">Local ownership means personalized service and deep community ties.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-600 rounded-lg p-3">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Quality First</h3>
                                        <p className="text-slate-600">We prioritize getting the job done right the first time.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-600 rounded-lg p-3">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Community Focused</h3>
                                        <p className="text-slate-600">Serving West Georgia with pride and dedication.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Philosophy Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Philosophy</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Quality over Quantity—we focus on thorough, reliable service that exceeds expectations
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <div className="bg-red-100 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                                <CheckCircle className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Comprehensive Inspections</h3>
                            <p className="text-slate-600">
                                Thorough assessments before beginning work to identify all issues, not just the obvious ones.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <div className="bg-red-100 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                                <Award className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Quality Materials</h3>
                            <p className="text-slate-600">
                                We use only high-quality materials from trusted manufacturers like Owens Corning.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <div className="bg-red-100 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                                <Shield className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Attention to Detail</h3>
                            <p className="text-slate-600">
                                Meticulous care throughout the entire project lifecycle ensures lasting results.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <div className="bg-red-100 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                                <TrendingUp className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Long-Term Relationships</h3>
                            <p className="text-slate-600">
                                We focus on building lasting customer relationships, not just completing transactions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credentials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Industry Credentials</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Owens Corning Preferred Contractor—meeting strict operational, financial, and quality standards
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-12 text-white">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-bold mb-6">Owens Corning Preferred Contractor</h3>
                                <p className="text-slate-300 text-lg mb-6">
                                    This prestigious designation requires meeting strict standards set by one of North America's leading roofing material manufacturers.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                                        <p className="text-slate-200">Access to extended warranty options</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                                        <p className="text-slate-200">Assurance of proper installation techniques</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                                        <p className="text-slate-200">Use of certified, quality roofing materials</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                                        <p className="text-slate-200">Ongoing training and education for technicians</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                                <div className="text-center">
                                    <Award className="w-24 h-24 text-red-400 mx-auto mb-6" />
                                    <h4 className="text-2xl font-bold mb-4">Certified Excellence</h4>
                                    <p className="text-slate-300">
                                        Our Preferred Contractor status demonstrates our commitment to excellence and provides you with added confidence in our work.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Area Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Proudly Serving West Georgia</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Headquartered in Douglasville, we serve homeowners throughout the West Georgia region with responsive service and local expertise.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-xl">
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-5xl font-bold text-red-600 mb-2">Local</div>
                                <p className="text-slate-600 text-lg">Douglasville-based with deep community roots</p>
                            </div>
                            <div>
                                <div className="text-5xl font-bold text-red-600 mb-2">Expert</div>
                                <p className="text-slate-600 text-lg">Specialized knowledge of regional climate challenges</p>
                            </div>
                            <div>
                                <div className="text-5xl font-bold text-red-600 mb-2">Responsive</div>
                                <p className="text-slate-600 text-lg">Quick service times throughout West Georgia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Work with a Trusted Local Roofer?
                    </h2>
                    <p className="text-xl text-red-100 mb-8">
                        Experience the McKinley difference—quality workmanship, honest service, and exceptional results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors duration-200 shadow-lg"
                        >
                            Get Your Free Inspection
                        </a>
                        <a
                            href="tel:6789834455"
                            className="inline-flex items-center justify-center px-8 py-4 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition-colors duration-200 border-2 border-white/20"
                        >
                            Call (678) 983-4455
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
