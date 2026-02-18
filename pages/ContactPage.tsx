import React from 'react';
import ContactForm from '../components/ContactForm';
import ServiceAreaMap from '../components/ServiceAreaMap';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-red-600 to-red-700 py-36">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-red-100 leading-relaxed">
                            Ready to protect your home with quality roofing? Contact us today for a free inspection and consultation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16">
                        <div className="bg-white rounded-xl p-6 shadow-xl border-t-4 border-red-600">
                            <div className="bg-red-100 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                                <Phone className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Phone</h3>
                            <a href="tel:6789834455" className="text-red-600 hover:text-red-700 font-medium text-lg">
                                (678) 983-4455
                            </a>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-xl border-t-4 border-red-600">
                            <div className="bg-red-100 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                                <Mail className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Email</h3>
                            <a href="mailto:mckinleyrandr@gmail.com" className="text-red-600 hover:text-red-700 font-medium break-all">
                                mckinleyrandr@gmail.com
                            </a>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-xl border-t-4 border-red-600">
                            <div className="bg-red-100 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                                <MapPin className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Service Area</h3>
                            <p className="text-slate-600">
                                Douglasville & West Georgia
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-xl border-t-4 border-red-600">
                            <div className="bg-red-100 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                                <Clock className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Availability</h3>
                            <p className="text-slate-600">
                                Emergency Services Available
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Info */}
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                Let's Discuss Your Roofing Needs
                            </h2>
                            <p className="text-lg text-slate-600 mb-8">
                                Whether you need a repair, replacement, or just have questions about your roof, we're here to help. Fill out the form and we'll get back to you promptly.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-100 rounded-lg p-3 flex-shrink-0">
                                        <Phone className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Call Us Directly</h3>
                                        <p className="text-slate-600 mb-2">
                                            Prefer to talk? Give us a call and speak with our team directly.
                                        </p>
                                        <a href="tel:6789834455" className="text-red-600 hover:text-red-700 font-semibold text-lg">
                                            (678) 983-4455
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-red-100 rounded-lg p-3 flex-shrink-0">
                                        <Mail className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Email Us</h3>
                                        <p className="text-slate-600 mb-2">
                                            Send us an email and we'll respond as soon as possible.
                                        </p>
                                        <a href="mailto:mckinleyrandr@gmail.com" className="text-red-600 hover:text-red-700 font-semibold break-all">
                                            mckinleyrandr@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-red-100 rounded-lg p-3 flex-shrink-0">
                                        <Clock className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Emergency Services</h3>
                                        <p className="text-slate-600">
                                            We offer emergency roof repair services for urgent situations like active leaks during storms.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-slate-50 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-slate-900 mb-4">What to Expect</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-white text-sm font-bold">1</span>
                                        </div>
                                        <p className="text-slate-600">We'll respond to your inquiry within 24 hours</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-white text-sm font-bold">2</span>
                                        </div>
                                        <p className="text-slate-600">Schedule a free, no-obligation roof inspection</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-white text-sm font-bold">3</span>
                                        </div>
                                        <p className="text-slate-600">Receive a detailed assessment and transparent pricing</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-white text-sm font-bold">4</span>
                                        </div>
                                        <p className="text-slate-600">Get expert guidance on the best solution for your needs</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Area Map */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Service Area</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Proudly serving Douglasville and the surrounding West Georgia communities
                        </p>
                    </div>
                    <ServiceAreaMap />
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-slate-600">
                            Quick answers to common questions about our services
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Do you offer free inspections?</h3>
                            <p className="text-slate-600">
                                Yes! We provide free, no-obligation roof inspections to assess your roof's condition and identify any issues.
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Do you work with insurance companies?</h3>
                            <p className="text-slate-600">
                                Absolutely. We have extensive experience working with insurance companies and can help you navigate the claims process to maximize your benefits and minimize out-of-pocket expenses.
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">What areas do you serve?</h3>
                            <p className="text-slate-600">
                                We're headquartered in Douglasville and serve homeowners throughout the West Georgia region with responsive service and local expertise.
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">What types of warranties do you offer?</h3>
                            <p className="text-slate-600">
                                We provide both manufacturer warranties on materials and labor warranties on our installation work, giving you comprehensive protection for your investment.
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Do you offer emergency services?</h3>
                            <p className="text-slate-600">
                                Yes, we offer emergency roof repair services for urgent situations such as active leaks during storms that require immediate attention.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Protect Your Home?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Contact McKinley Roofing today and experience the difference of working with a trusted local contractor.
                    </p>
                    <a
                        href="tel:6789834455"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg"
                    >
                        <Phone className="w-5 h-5" />
                        Call (678) 983-4455 Now
                    </a>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;
