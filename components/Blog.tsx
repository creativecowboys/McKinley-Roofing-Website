
import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      title: 'Protect Your Home with Expert Roofing Services',
      excerpt: 'Your roof is the first line of defense against the elements. Our expert services...',
      author: 'Susie Connell',
      date: '23 August 2025',
      image: '/blog_expert_roofing_services.png',
    },
    {
      title: 'Protect Your Investment with Our Roofing Expertise',
      excerpt: 'We understand the importance of a keeping your home safe and secure...',
      author: 'Wilbur Huels',
      date: '24 August 2025',
      image: '/blog_roofing_investment.png',
    },
    {
      title: 'The Benefits of Upgrading to an Energy-Efficient Roof',
      excerpt: 'Energy-efficient roofs do more than just protect your home they also help...',
      author: 'Martin Graham',
      date: '26 August 2025',
      image: '/blog_energy_efficient.png',
      isFeature: true,
    },
  ];

  return (
    <section id="blog" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">BLOG & NEWS</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Roofing Insights & Tips
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article key={idx} className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full group`}>
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-6 mb-4 text-sm font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-red-600" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-red-600" />
                    {post.author}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-8 flex-grow">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 font-bold text-red-600 group/btn">
                  READ MORE
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
