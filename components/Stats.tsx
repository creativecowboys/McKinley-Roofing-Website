
import React from 'react';
import { Home, Users, Heart, Award } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    {
      value: '2.5k',
      label: 'Projects Completed',
      icon: <Home size={32} className="text-red-600" />,
    },
    {
      value: '84+',
      label: 'Workers in Company',
      icon: <Users size={32} className="text-red-600" />,
    },
    {
      value: '12+',
      label: 'Benefit Every Day',
      icon: <Heart size={32} className="text-red-600" />,
    },
    {
      value: '05+',
      label: 'Received Awards',
      icon: <Award size={32} className="text-red-600" />,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">OUR SUCCESS IN NUMBERS</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
              Excellence in Every Project <br />
              Success in Every Roof
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Our success is a direct result of unwavering commitment to quality, customer satisfaction, & excellence in every project we undertake. With years of experience and a dedicated team of roofing experts.
            </p>
            <button className="bg-red-600 text-white px-10 py-5 rounded-md font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-600/20">
              GET AN ESTIMATED QUOTE
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-50 p-10 rounded-2xl flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-slate-100">
                <div className="bg-white p-5 rounded-xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-2">{stat.value}</h3>
                <p className="text-slate-500 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
