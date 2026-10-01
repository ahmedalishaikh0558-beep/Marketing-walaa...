import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const FaqSection: React.FC = () => {
  const { faqs, siteSettings } = useCms();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md mb-3 border border-orange-100">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Clear, transparent answers about our ₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')} WooCommerce setup service.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                openIdx === idx
                  ? 'border-orange-500 bg-orange-50/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                id={`faq-button-${idx}`}
                aria-expanded={openIdx === idx}
                aria-controls={`faq-answer-${idx}`}
                onClick={() => toggleFaq(idx)}
                className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl"
              >
                <span className="font-bold text-sm sm:text-base text-slate-900">
                  {faq.question}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    openIdx === idx ? 'rotate-180 bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {openIdx === idx && (
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-button-${idx}`}
                  className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
