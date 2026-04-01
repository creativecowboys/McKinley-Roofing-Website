
import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="bg-slate-900 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-red-500 font-bold uppercase tracking-widest text-sm mb-4 block">Legal</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Terms & Conditions</h1>
          <p className="text-slate-400 mt-4">Last updated: April 1, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 space-y-10 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the website of McKinley Roofing & Restoration ("Company," "we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Services</h2>
            <p>McKinley Roofing & Restoration provides residential and commercial roofing services including roof replacement, storm damage restoration, roof repair, maintenance, gutter installation, and siding installation and repair in the West Georgia area. All services are subject to a separate written agreement and estimate provided prior to work commencing.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Website Use</h2>
            <p>You agree to use this website only for lawful purposes. You may not use this site to transmit any harmful, offensive, or disruptive content. We reserve the right to restrict access to any user who violates these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Estimates & Quotes</h2>
            <p>Any estimates or quotes provided through this website or by our team are not binding contracts. Final pricing is subject to on-site inspection, material costs, and a signed written agreement between the customer and McKinley Roofing & Restoration.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and graphics, is the property of McKinley Roofing & Restoration and is protected by applicable copyright laws. You may not reproduce, distribute, or use any content without our express written permission.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
            <p>McKinley Roofing & Restoration is not liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on information contained herein. We make no warranties, expressed or implied, regarding the accuracy or completeness of information on this site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Third-Party Links</h2>
            <p>This website may contain links to third-party websites. We are not responsible for the content, privacy practices, or accuracy of any third-party websites. Accessing those links is at your own risk.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Changes to Terms</h2>
            <p>We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Governing Law</h2>
            <p>These terms are governed by the laws of the State of Georgia. Any disputes arising from these terms shall be resolved in the courts of Douglas County, Georgia.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
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

export default TermsPage;
