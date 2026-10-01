import React from 'react';
import { ArrowUp, Shield, Twitter, Instagram, Youtube, Facebook, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onOpenAdmin: () => void;
  onNavigate: (view: 'home' | 'shop' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onNavigate }) => {
  const { siteSettings, categories } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/20">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                {siteSettings.brandName}
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              {siteSettings.websiteDescription}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {siteSettings.socialLinks?.twitter && (
                <a
                  href={siteSettings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {siteSettings.socialLinks?.instagram && (
                <a
                  href={siteSettings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteSettings.socialLinks?.youtube && (
                <a
                  href={siteSettings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {siteSettings.socialLinks?.facebook && (
                <a
                  href={siteSettings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Editorial Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact Editorial Team
                </button>
              </li>
            </ul>
          </div>

          {/* Top Departments */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Featured Departments
            </h4>
            <ul className="space-y-2 text-slate-400">
              {categories.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onNavigate('shop');
                      setTimeout(() => {
                        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Compliance Box */}
        <div className="pt-8 pb-6 text-[11px] text-slate-400 leading-relaxed space-y-2 border-b border-slate-900">
          <p>
            <strong>Amazon Associate Disclosure:</strong> {siteSettings.brandName} is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. Certain content that appears on this site comes from Amazon Services LLC. This content is provided 'as is' and is subject to change or removal at any time.
          </p>
          <p>
            Amazon, the Amazon logo, and Amazon Prime are trademarks of Amazon.com, Inc. or its affiliates. Product prices and availability are accurate as of the date/time indicated and are subject to change.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} {siteSettings.brandName}. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400/80" />
              <span>Admin Access</span>
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
