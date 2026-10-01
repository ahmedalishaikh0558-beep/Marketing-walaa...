import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Eye, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutSection: React.FC = () => {
  const { siteSettings } = useStore();

  return (
    <section id="about" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-900 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Independent Editorial Standards</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              We Cut Through The Clutter So You Buy With Confidence
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              At <strong className="text-white font-bold">{siteSettings.brandName}</strong>, we spend hundreds of hours researching, testing, and verifying tech and lifestyle products so you don't have to wade through thousands of fake reviews or low-grade clones.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Genuine User Review Verification</h4>
                  <p className="text-xs text-slate-400 mt-0.5">We cross-reference independent benchmark databases and long-term owner reviews before featuring any product.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">100% Unbiased Selection</h4>
                  <p className="text-xs text-slate-400 mt-0.5">We do not accept paid manufacturer placement. Our recommendations are solely chosen based on real performance and value.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Direct Amazon Fulfillment & Guarantees</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Orders are placed directly through Amazon, ensuring official manufacturer warranties, fast Prime dispatch, and seamless returns.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Disclosure Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Affiliate Transparency Disclosure</h3>
                  <span className="text-xs text-slate-400">FTC Compliance Statement</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  {siteSettings.brandName} is a participant in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                </p>
                <p>
                  When you click on an affiliate link and make a purchase, we may receive a modest commission at <strong>absolutely zero additional cost to you</strong>. Pricing, stock, and discount promotions are maintained in real-time by Amazon.
                </p>
                <p className="text-slate-400 text-xs">
                  This revenue supports our independent testing lab, editorial writers, and platform maintenance. Thank you for supporting our work!
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Verified Associate ID:</span>
                <span className="font-mono text-cyan-400 font-bold">{siteSettings.amazonAffiliateTag || 'trendvault-20'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
