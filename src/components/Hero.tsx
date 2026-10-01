import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, Sparkles, Smartphone, Laptop, Clock, ShoppingBag } from 'lucide-react';
import { ASSETS } from '../data/websiteData';
import { useCms } from '../context/CmsContext';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreDemo }) => {
  const [activeDevice, setActiveDevice] = useState<'laptop' | 'mobile'>('laptop');
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });
  const { siteSettings, packageDeliverables } = useCms();

  // Countdown timer simulation for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="offer" className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-gradient-to-b from-orange-50/60 via-stone-50 to-white border-b border-slate-200 scroll-mt-20">
      {/* Background subtle geometric accents reminiscent of the poster */}
      <div className="absolute top-12 right-6 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-72 h-72 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Brand Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1.5 rounded-md border border-orange-200/60">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Best Place For Marketing Solutions</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="uppercase tracking-widest text-slate-800 font-bold">Your Online Store Starts Here</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Offer Content & Feature Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight block">
                Get Your
              </span>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-slate-950 uppercase leading-none mt-1">
                <span className="text-orange-600 block">WooCommerce</span>
                <span>E-Commerce Website</span>
              </h1>
              <p className="mt-3 text-lg font-bold tracking-wide uppercase text-slate-700 flex items-center gap-2">
                <span className="w-8 h-1 bg-orange-500 inline-block rounded-full" />
                <span>Sell Anything, Anywhere</span>
              </p>
            </div>

            {/* Checklist: All 9 items from poster */}
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {packageDeliverables.map((item) => (
                  <div key={item.id} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0 text-white shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Callout box from the flyer */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-2.5 bg-orange-50/70 p-3 rounded-xl border border-orange-100">
                <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700">
                  <span className="font-bold text-slate-900">A complete eCommerce solution</span> to grow your business online with 100% data ownership and zero monthly commission fees.
                </p>
              </div>
            </div>

            {/* Price Burst and Limited Time Timer */}
            <div className="flex flex-wrap items-center gap-5 pt-1">
              {/* Circular Price Stamp (Identical to Poster Badge) */}
              <div className="relative group">
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 text-white p-3 flex flex-col items-center justify-center text-center shadow-lg shadow-orange-500/25 border-4 border-white transition-transform group-hover:scale-105">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded-full mb-0.5">
                    Limited Time Only
                  </span>
                  <div className="text-sm font-semibold text-orange-100 line-through decoration-white/80 decoration-2 font-mono">
                    ₹{siteSettings.originalPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight leading-none mt-0.5 font-mono">
                    ₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-orange-100 font-medium mt-1">
                    Save ₹{(siteSettings.originalPrice - siteSettings.currentOfferPrice).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Urgency & Primary CTA */}
              <div className="flex-1 min-w-[240px] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
                  <Clock className="w-3.5 h-3.5 text-orange-600 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Offer Expires In:</span>
                  <span className="font-mono text-orange-600 font-bold">
                    {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={onOpenBooking}
                    className="w-full sm:w-auto px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-600/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Your Store Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onExploreDemo}
                    className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm rounded-xl transition-colors border border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                    <span>Test Demo Store</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Live in 3-5 days
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>100% Full Ownership</span>
                  <span aria-hidden="true">·</span>
                  <span>No Monthly Rent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Device Mockups (Laptop + Smartphone "ShopKart" preview) */}
          <div className="lg:col-span-6 relative">
            {/* Device Switcher */}
            <div className="flex items-center justify-between mb-3 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs max-w-sm mx-auto lg:ml-auto">
              <span className="text-xs font-semibold text-slate-500 px-3">Live Preview:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveDevice('laptop')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    activeDevice === 'laptop'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Laptop View</span>
                </button>
                <button
                  onClick={() => setActiveDevice('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    activeDevice === 'mobile'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile View</span>
                </button>
              </div>
            </div>

            {/* Laptop Frame */}
            {activeDevice === 'laptop' ? (
              <div className="relative mx-auto transition-all duration-300">
                {/* Laptop Chassis */}
                <div className="bg-slate-900 rounded-t-2xl p-3 pt-2.5 shadow-2xl border-4 border-slate-800">
                  <div className="flex items-center justify-between px-3 pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 bg-slate-950 px-4 py-0.5 rounded-md border border-slate-800 flex items-center gap-2">
                      <span className="text-emerald-400">🔒</span>
                      <span>shopkart.yourbrand.com</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      ShopKart Demo
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
                    {/* Mock Store Header */}
                    <div className="bg-white px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 tracking-tight text-base">
                          Shop<span className="text-orange-600">Kart</span>
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 text-xs text-slate-600 font-medium">
                        <span className="text-orange-600 font-semibold">Home</span>
                        <span>Shop</span>
                        <span>Categories</span>
                        <span>Deals</span>
                        <span>Contact</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <button
                          onClick={onExploreDemo}
                          className="px-2.5 py-1 text-[11px] font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors"
                        >
                          Explore Store
                        </button>
                      </div>
                    </div>

                    {/* Store Hero Banner */}
                    <div className="relative bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/50 p-6 flex flex-col justify-between min-h-[220px]">
                      <div className="max-w-xs space-y-2 z-10">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-orange-600">
                          Modern Living Collection
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                          Upgrade Your Shopping Experience
                        </h2>
                        <p className="text-xs text-slate-600">
                          Quality Products. Great Prices. Happier You.
                        </p>
                        <button
                          onClick={onExploreDemo}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-orange-700 transition-colors"
                        >
                          <span>Shop Now</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Preview Image Inside Mockup */}
                      <div className="absolute right-4 bottom-2 w-44 sm:w-56 h-36 rounded-xl overflow-hidden shadow-md border border-white">
                        <img
                          src={ASSETS.hero}
                          alt="ShopKart E-commerce Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Feature Ribbons from Poster */}
                      <div className="grid grid-cols-4 gap-2 pt-4 border-t border-amber-200/50 mt-4 text-[10px] text-slate-700 font-medium z-10">
                        <div>🚚 Free Shipping</div>
                        <div>🔒 100% Safe Payments</div>
                        <div>🔄 Easy 7-Day Returns</div>
                        <div>📞 24/7 Dedicated Support</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Laptop Base */}
                <div className="h-3 bg-slate-700 rounded-b-xl max-w-[96%] mx-auto shadow-md" />
                <div className="h-1 bg-slate-600 rounded-b-md max-w-[30%] mx-auto" />
              </div>
            ) : (
              /* Mobile Smartphone Frame */
              <div className="max-w-[280px] sm:max-w-[320px] mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800">
                {/* Speaker notch */}
                <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-800 mr-2" />
                  <div className="w-8 h-1 bg-slate-800 rounded-full" />
                </div>

                {/* Mobile screen */}
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 min-h-[460px] flex flex-col">
                  {/* Mobile Top Bar */}
                  <div className="bg-white px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">
                      Shop<span className="text-orange-600">Kart</span>
                    </span>
                    <div className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      UPI Ready
                    </div>
                  </div>

                  {/* Banner */}
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl m-2">
                    <span className="text-[9px] uppercase font-bold tracking-wider opacity-90">Best Deals On Top Brands</span>
                    <h3 className="text-sm font-bold mt-0.5">Shop More, Save More</h3>
                    <button
                      onClick={onExploreDemo}
                      className="mt-2 text-[10px] font-bold bg-white text-orange-600 px-2.5 py-1 rounded shadow-xs"
                    >
                      Shop Now →
                    </button>
                  </div>

                  {/* Category Pills */}
                  <div className="px-3 py-1 flex items-center gap-2 overflow-x-auto text-[10px] font-semibold text-slate-700">
                    <span className="bg-slate-900 text-white px-2 py-0.5 rounded-full shrink-0">Electronics</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full shrink-0">Fashion</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full shrink-0">Home</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full shrink-0">Beauty</span>
                  </div>

                  {/* Product Grid Mock */}
                  <div className="p-2 grid grid-cols-2 gap-2 flex-1">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div className="aspect-square rounded-lg overflow-hidden bg-slate-200">
                        <img src={ASSETS.productAudio} alt="Headphones" className="w-full h-full object-cover" />
                      </div>
                      <div className="mt-1.5">
                        <p className="text-[11px] font-bold text-slate-900 truncate">ANC Headphones</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-black text-orange-600">₹3,499</span>
                          <span className="text-[9px] text-slate-400 line-through">₹5,999</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div className="aspect-square rounded-lg overflow-hidden bg-slate-200">
                        <img src={ASSETS.productFashion} alt="Sneakers" className="w-full h-full object-cover" />
                      </div>
                      <div className="mt-1.5">
                        <p className="text-[11px] font-bold text-slate-900 truncate">Urban Sneakers</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-black text-orange-600">₹1,899</span>
                          <span className="text-[9px] text-slate-400 line-through">₹3,299</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Bottom Navigation */}
                  <div className="bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around text-[10px] font-medium text-slate-600">
                    <span className="text-orange-600 font-bold">Home</span>
                    <span>Search</span>
                    <span>Orders</span>
                    <span>Cart (0)</span>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
