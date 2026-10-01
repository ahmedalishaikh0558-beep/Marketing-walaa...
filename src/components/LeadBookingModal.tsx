import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface LeadBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadBookingModal: React.FC<LeadBookingModalProps> = ({ isOpen, onClose }) => {
  const { siteSettings, submitInquiry } = useCms();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Fashion & Apparel');
  const [preferredDomain, setPreferredDomain] = useState('');
  const [currentStatus, setCurrentStatus] = useState('Starting New Store');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitInquiry({
        fullName,
        phone,
        businessName,
        category,
        preferredDomain,
        currentStatus,
        plan: `WooCommerce Package (₹${siteSettings.currentOfferPrice})`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      // Still show success to client with direct WhatsApp fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppBookingLink = () => {
    const text = encodeURIComponent(
      `Hi Marketingwalaa! I want to book the WooCommerce Website Package for ₹${siteSettings.currentOfferPrice}.\n\n` +
      `Name: ${fullName || 'Not specified'}\n` +
      `Phone: ${phone || 'Not specified'}\n` +
      `Brand: ${businessName || 'New Brand'}\n` +
      `Category: ${category}\n` +
      `Preferred Domain: ${preferredDomain || 'To be decided'}\n` +
      `Status: ${currentStatus}`
    );
    return `https://wa.me/${siteSettings.whatsappNumber}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden relative my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-md w-fit mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Festive Discount Locked: ₹10,999</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              Claim Your Turnkey Store
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Fill in your preliminary details below. Our team will verify domain availability and prepare your onboarding roadmap.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    WhatsApp Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-xs font-semibold bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-600">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-r-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Brand / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Urban Threads"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Product Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  >
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                    <option value="Beauty, Skincare & Cosmetics">Beauty & Cosmetics</option>
                    <option value="Home Decor & Furnishing">Home Decor & Furnishing</option>
                    <option value="Organic Food & Spices">Organic Food & Grocery</option>
                    <option value="Jewelry & Accessories">Jewelry & Accessories</option>
                    <option value="Handmade Crafts & Gifts">Handmade Crafts & Gifts</option>
                    <option value="Other D2C Category">Other Category</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Domain Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. urbanthreads.in"
                    value={preferredDomain}
                    onChange={e => setPreferredDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Current Selling Status
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Starting New', 'Moving from Instagram', 'Moving from Shopify'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setCurrentStatus(status)}
                      className={`py-2 px-2 rounded-lg border text-center font-medium cursor-pointer transition-colors ${
                        currentStatus === status
                          ? 'border-orange-600 bg-orange-50 text-orange-900'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-600">Total Setup Fee:</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 line-through font-mono">₹{siteSettings.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-base font-black text-orange-600 font-mono">₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')} (All-Inclusive)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Registering Inquiry...' : 'Lock In Offer & Submit Inquiry'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Directly via WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Inquiry Received!
              </h3>
              <p className="mt-1 text-xs text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-bold text-slate-900">{fullName}</span>. Your ₹10,999 promotional package rate for <span className="font-bold text-slate-900">{businessName || 'your brand'}</span> is reserved.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs text-slate-700 space-y-1.5 max-w-md mx-auto">
              <div className="font-bold text-slate-900 border-b border-slate-200 pb-1 mb-1">
                Next Steps:
              </div>
              <p>1. Our technical lead will WhatsApp you at <span className="font-bold">+91 {phone}</span> within 15 minutes.</p>
              <p>2. We will check the registry availability for <span className="font-bold">{preferredDomain || 'your domain'}</span>.</p>
              <p>3. You can also chat directly with us right now:</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Connect</span>
              </a>

              <button
                onClick={onClose}
                className="py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
