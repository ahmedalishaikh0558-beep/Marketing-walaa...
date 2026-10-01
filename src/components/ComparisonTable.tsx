import React from 'react';
import { Check, X, Shield, ArrowRight } from 'lucide-react';
import { COMPARISON_DATA } from '../data/websiteData';
import { useCms } from '../context/CmsContext';

interface ComparisonTableProps {
  onOpenBooking: () => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onOpenBooking }) => {
  const { siteSettings } = useCms();

  return (
    <section id="comparison" className="py-16 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md mb-3 border border-orange-100">
            <Shield className="w-3.5 h-3.5" />
            <span>Honest Evaluation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Marketingwalaa vs. The Alternatives
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Why smart Indian business owners choose our turnkey WooCommerce setup over expensive recurring SaaS platforms and unreliable freelancers.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/3">
                  Deliverable / Feature
                </th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-100/60 w-1/3 border-x border-orange-200">
                  <div className="flex items-center justify-between">
                    <span>Marketingwalaa (₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')})</span>
                    <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded font-mono font-normal">
                      RECOMMENDED
                    </span>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-700 w-1/6">
                  Shopify
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-700 w-1/6">
                  Traditional Agencies
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 font-bold text-orange-900 bg-orange-50/40 border-x border-orange-100/80">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{row.marketingwalaa}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <X className="w-3 h-3" />
                      </div>
                      <span>{row.shopify}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold">~</span>
                      </div>
                      <span>{row.customAgency}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Decision Box */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-6 bg-orange-50/80 rounded-2xl border border-orange-200 gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900">Ready to start selling online without high monthly rent?</h4>
            <p className="text-xs text-slate-600">
              Get your complete store live in 3 to 5 business days with full source code & hosting credentials.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Book ₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')} Package</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
