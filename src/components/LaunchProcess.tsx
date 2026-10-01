import React from 'react';
import { ArrowRight, MessageSquare, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/websiteData';

interface LaunchProcessProps {
  onOpenBooking: () => void;
}

export const LaunchProcess: React.FC<LaunchProcessProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'Consultation & Domain Setup',
      desc: 'You choose your preferred .com or .in domain name and send your brand logo, colors, and initial product list.',
      duration: 'Day 1'
    },
    {
      num: '02',
      title: 'Storefront Design & Catalog',
      desc: 'Our design team builds your clean, mobile-first WooCommerce shop with high-converting banners and category layout.',
      duration: 'Day 2–3'
    },
    {
      num: '03',
      title: 'Payments, Shipping & WhatsApp',
      desc: 'We configure Razorpay/UPI gateways, connect your Shiprocket courier API, and set up automated WhatsApp alerts.',
      duration: 'Day 4'
    },
    {
      num: '04',
      title: 'Testing, Go-Live & Handover',
      desc: 'We place live test orders, verify payment settlement, deliver your login credentials, and provide Hindi/English training.',
      duration: 'Day 5'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Process Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100/70 px-3 py-1 rounded-md mb-3 border border-orange-200/60">
            <span>Fast Turnaround</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            From Order to Live Store in <span className="text-orange-600">4 Steps</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            No technical knowledge needed. Our engineering team handles all the heavy lifting while you prepare inventory.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-orange-600 font-mono">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-orange-100 text-orange-600 border border-orange-200 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Proof of Impact / Testimonials */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Merchant Proof
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase mt-1">
              Built for Indian Business Owners
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-7 h-7 text-orange-200" />
                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900 font-mono">
                        {t.metric}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {t.metricLabel}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="font-bold text-slate-900 text-xs">{t.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {t.role}, {t.business} · <span className="text-slate-400">{t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
