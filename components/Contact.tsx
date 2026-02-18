
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import ServiceAreaMap from './ServiceAreaMap';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  newClient: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    newClient: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Using Web3Forms for email delivery
      // This is a free service that sends emails without requiring backend setup
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'f0edb404-1cef-4cbd-a52c-4a2ba56b98b3',
          subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
          from_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          new_client: formData.newClient,
          message: formData.message,
          to_email: 'josh@creativecowboys.co',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          newClient: '',
          message: ''
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try calling us directly or emailing josh@creativecowboys.co');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">CONTACT US</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8">
              Start Your Roofing Journey Today—Contact Us!
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We're here to provide you with the best roofing solutions tailored to your needs. Whether you're looking for a free estimate, need a roof inspection, or have urgent repairs, our West Georgia team is ready to help.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-center gap-3">
                  <CheckCircle size={20} className="flex-shrink-0" />
                  <p className="font-medium">Thank you! Your message has been sent successfully. We'll get back to you soon!</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg flex items-center gap-3">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <p className="font-medium">{errorMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                />
              </div>
              <select
                name="newClient"
                value={formData.newClient}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none transition-all"
              >
                <option value="">Are you a new client?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={4}
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white font-bold py-5 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : 'SEND NOW'}
                <Send size={18} />
              </button>
            </form>
          </div>

          <div className="relative">
            <ServiceAreaMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
