import React, { useState } from 'react';
import { 
  Globe, Server, ShoppingBag, CreditCard, Truck, 
  Smartphone, MessageSquare, MonitorSmartphone, Headphones, 
  Check, ArrowRight, Shield, Zap 
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface PackageInclusionsProps {
  onOpenBooking: () => void;
}

export const PackageInclusions: React.FC<PackageInclusionsProps> = ({ onOpenBooking }) => {
  const { packageDeliverables, siteSettings } = useCms();
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(packageDeliverables[0]?.id || 'free-domain');

  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'free-domain': return <Globe className="w-5 h-5 text-orange-600" />;
      case 'free-hosting': return <Server className="w-5 h-5 text-orange-600" />;
      case 'woocommerce-store': return <ShoppingBag className="w-5 h-5 text-orange-600" />;
      case 'payment-gateway': return <CreditCard className="w-5 h-5 text-orange-600" />;
      case 'shipping-integration': return <Truck className="w-5 h-5 text-orange-600" />;
      case 'app-integration': return <Smartphone className="w-5 h-5 text-orange-600" />;
      case 'whatsapp-integration': return <MessageSquare className="w-5 h-5 text-orange-600" />;
      case 'mobile-responsive': return <MonitorSmartphone className="w-5 h-5 text-orange-600" />;
      case 'one-year-support': return <Headphones className="w-5 h-5 text-orange-600" />;
      default: return <Shield className="w-5 h-5 text-orange-600" />;
    }
  };

  const selectedFeature = packageDeliverables.find(f => f.id === selectedFeatureId) || packageDeliverables[0];

  return (
    <section id="features" className="py-16 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-md mb-3 border border-orange-100">
            <Zap className="w-3.5 h-3.5" />
            <span>Turnkey E-Commerce Deliverables</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Everything Included in Your <span className="text-orange-600">₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')}</span> Package
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            No hidden costs. No monthly platform rent. You receive a fully functioning, professional e-commerce enterprise built for the Indian market.
          </p>
        </div>

        {/* 9 Inclusions Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packageDeliverables.map((item, idx) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedFeatureId(item.id);
                }
              }}
              onClick={() => setSelectedFeatureId(item.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                selectedFeatureId === item.id
                  ? 'border-orange-500 bg-orange-50/30 shadow-md ring-1 ring-orange-400'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    {getFeatureIcon(item.id)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    0{idx + 1}
                  </span>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-orange-600 mb-1">
                  {item.highlight}
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Sub-bullets */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                {item.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Spotlight Callout Box */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-8 lg:p-10 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-orange-400">
                Active Selection: 0{packageDeliverables.findIndex(i => i.id === selectedFeature.id) + 1} · {selectedFeature.title}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedFeature.highlight}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {selectedFeature.description} We hand over 100% full administrative control, so you own your customer data, domain rights, and database forever without any recurring lock-in.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 px-6 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book This Package Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[11px] text-slate-400 text-center">
                ✨ Fast 3 to 5 business day delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
