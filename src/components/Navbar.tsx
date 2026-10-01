import React, { useState } from 'react';
import { Phone, MessageSquare, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { siteSettings, isAdmin } = useCms();

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-medium text-white">OFFER:</span>
            <span>{siteSettings.activePromoText}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <a
              href={`tel:${siteSettings.whatsappNumber}`}
              className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>{siteSettings.supportPhone}</span>
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hi%20Marketingwalaa%2C%20I%20am%20interested%20in%20the%20WooCommerce%20E-Commerce%20Website%20Package%20for%20%E2%82%B9${siteSettings.currentOfferPrice}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-400"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px] font-semibold text-slate-400 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>{isAdmin ? 'Admin CMS' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Conforms to Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:bg-orange-700 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                Marketing<span className="text-orange-600">walaa</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-tight">
                E-Commerce Solutions
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Clean text links with hover state) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#offer" className="hover:text-orange-600 transition-colors">
              Offer Package
            </a>
            <a href="#features" className="hover:text-orange-600 transition-colors">
              What's Included
            </a>
            <a href="#demo-store" className="hover:text-orange-600 transition-colors">
              Live Demo Store
            </a>
            <a href="#roi-calculator" className="hover:text-orange-600 transition-colors">
              ROI Calculator
            </a>
            <a href="#comparison" className="hover:text-orange-600 transition-colors">
              Why WooCommerce
            </a>
            <a href="#faqs" className="hover:text-orange-600 transition-colors">
              FAQs
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3">
            <div className="relative group/navwa">
              <a
                href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hi%20Marketingwalaa%2C%20I%20am%20interested%20in%20the%20WooCommerce%20Website%20Package%20for%20%E2%82%B9${siteSettings.currentOfferPrice}.`}
                target="_blank"
                rel="noopener noreferrer"
                title="Get a response in minutes"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/navwa:opacity-100 transition-all duration-200 pointer-events-none bg-slate-900 text-white text-[11px] font-medium py-1 px-2.5 rounded-lg shadow-xl border border-slate-800 whitespace-nowrap z-50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Get a response in minutes</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-t border-slate-800" />
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-700 active:scale-95 rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Claim ₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')} Deal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#offer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-orange-600"
            >
              Offer Package
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-orange-600"
            >
              What's Included
            </a>
            <a
              href="#demo-store"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-orange-600"
            >
              Live Demo Store (ShopKart)
            </a>
            <a
              href="#roi-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-orange-600"
            >
              ROI & Profit Calculator
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-orange-600"
            >
              WooCommerce vs Shopify
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-orange-600"
            >
              FAQs
            </a>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${siteSettings.whatsappNumber}`}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-slate-800 bg-slate-100 rounded-lg"
              >
                <Phone className="w-4 h-4 text-orange-600" />
                <span>Call {siteSettings.supportPhone}</span>
              </a>
              <a
                href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hi%20Marketingwalaa%2C%20I%20am%20interested%20in%20the%20WooCommerce%20Website%20Package%20for%20%E2%82%B9${siteSettings.currentOfferPrice}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
