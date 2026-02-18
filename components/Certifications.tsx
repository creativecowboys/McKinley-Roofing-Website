
import React from 'react';
import { Shield, Award, Clock, CheckCircle } from 'lucide-react';

const Certifications: React.FC = () => {
    const badges = [
        {
            icon: <Shield size={32} />,
            title: 'Fully Insured',
            subtitle: '& Bonded',
        },
        {
            icon: <Award size={32} />,
            title: 'Owens Corning',
            subtitle: 'Preferred',
        },
        {
            icon: <Clock size={32} />,
            title: 'Family',
            subtitle: 'Owned',
        },
        {
            icon: <CheckCircle size={32} />,
            title: 'Warranty',
            subtitle: 'Protected',
        },
    ];

    const certifications = [
        {
            name: 'Owens Corning Preferred Contractor',
            logo: '/owens_corning_badge.png',
        },
    ];

    return (
        <section className="py-16 bg-white border-y border-slate-200">
            <div className="container mx-auto px-4">
                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer group"
                        >
                            <div className="text-[#0F172A] mb-3 group-hover:text-red-600 transition-colors">
                                {badge.icon}
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 text-center leading-tight">
                                {badge.title}
                            </h4>
                            <p className="text-sm text-slate-600 font-medium">{badge.subtitle}</p>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        Owens Corning Preferred Contractor
                    </h3>
                    <p className="text-slate-600">
                        Meeting strict industry standards for quality, service, and professionalism
                    </p>
                </div>

                <div className="flex justify-center">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center p-6 bg-white border-2 border-red-600 rounded-lg hover:shadow-xl transition-all duration-200 cursor-pointer max-w-xs"
                        >
                            <img
                                src={cert.logo}
                                alt={cert.name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Warranty Highlight */}
                <div className="mt-12 bg-gradient-to-r from-[#0F172A] to-[#334155] rounded-2xl p-8 md:p-12 text-center text-white">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Lifetime Workmanship Warranty
                        </h3>
                        <p className="text-lg text-slate-300 mb-6">
                            We stand behind our work with a comprehensive lifetime warranty on all installations.
                            Your investment is protected, and your peace of mind is guaranteed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle size={20} className="text-red-600" />
                                <span>Manufacturer Warranties Honored</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle size={20} className="text-red-600" />
                                <span>Transferable to New Owners</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle size={20} className="text-red-600" />
                                <span>No Hidden Fees</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
