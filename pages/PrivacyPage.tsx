
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="bg-slate-900 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-red-500 font-bold uppercase tracking-widest text-sm mb-4 block">Legal</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-slate-400 mt-4">Last updated: April 1, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 space-y-10 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p>McKinley Roofing & Restoration ("we," "us," or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or contact us for services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information when you interact with our website or submit a form:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and home address</li>
              <li><strong>Service Information:</strong> Details about your roofing needs submitted through our inspection request form</li>
              <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on the site (collected automatically)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>Respond to your inquiries and schedule free roof inspections</li>
              <li>Provide roofing estimates and communicate service details</li>
              <li>Improve our website and customer experience</li>
              <li>Send relevant updates or promotional offers (only with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our website or conducting business, provided those parties agree to keep the information confidential.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cookies</h2>
            <p>Our website may use cookies to enhance your browsing experience. Cookies are small files stored on your device that help us understand how visitors use our site. You may disable cookies through your browser settings, though this may affect some website functionality.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Third-Party Services</h2>
            <p>Our website may use third-party tools such as Google Maps or analytics services. These third parties have their own privacy policies governing their use of your data. We encourage you to review those policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of your personal data at any time. To make such a request, please contact us using the information below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children's Privacy</h2>
            <p>Our website is not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such data, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated date. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please reach out:</p>
            <div className="mt-4 bg-slate-50 rounded-xl p-6 border border-slate-200">
              <p className="font-bold text-slate-900">McKinley Roofing & Restoration</p>
              <p>Douglasville, Georgia</p>
              <p>Phone: (678) 983-4455</p>
              <p>Email: mckinleyrandr@gmail.com</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
