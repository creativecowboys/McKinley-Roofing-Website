'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle, Phone, Shield } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

const InspectionModal: React.FC = () => {
  const { isModalOpen: isOpen, closeModal: onClose } = useModal();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'f0edb404-1cef-4cbd-a52c-4a2ba56b98b3',
          subject: `Free Roof Inspection Request from ${formData.firstName} ${formData.lastName}`,
          from_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.message || 'No additional notes.',
          to_email: 'mckinleyrandr@gmail.com',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please call us at (678) 983-4455 or email mckinleyrandr@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', message: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ animation: 'modalSlideIn 0.25s ease-out' }}
      >
        {/* Header Banner */}
        <div className="bg-red-600 rounded-t-2xl px-8 pt-8 pb-6 text-white">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Shield size={28} className="text-white/90" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">100% Free — No Obligation</span>
          </div>
          <h2 className="text-2xl font-black leading-tight">Get Your Free Roof Inspection</h2>
          <p className="text-red-100 text-sm mt-1">Fill out the form below and we'll be in touch within 24 hours.</p>
        </div>

        {/* Form Body */}
        <div className="px-8 py-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-2">Request Sent!</h3>
              <p className="text-slate-600 mb-6">
                Thanks! We'll reach out within 24 hours to schedule your free inspection.
              </p>
              <a
                href="tel:+16789834455"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all"
              >
                <Phone size={16} />
                Call Us Now: (678) 983-4455
              </a>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2 text-sm">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Property Address (optional)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any details about your roof concern? (optional)"
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white font-black py-4 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? 'Sending...' : 'Request My Free Inspection'}
                {!isSubmitting && <Send size={16} />}
              </button>

              <p className="text-center text-xs text-slate-400 pb-2">
                By submitting, you agree to be contacted by McKinley Roofing. We never share your info.
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(-20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
      `}</style>
    </div>
  );
};

export default InspectionModal;
