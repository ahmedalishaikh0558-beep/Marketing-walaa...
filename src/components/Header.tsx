import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Shield, ExternalLink, ArrowRight, Bookmark } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  activeView: 'home' | 'shop' | 'about' | 'contact';
  setActiveView: (view: 'home' | 'shop' | 'about' | 'contact') => void;
  onSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenAdmin,
  activeView,
  setActiveView,
  onSearchQuery,
}) => {
  const { siteSettings, cartTotalCount } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput.trim());
      setActiveView('shop');
      setSearchOpen(false);
      const elem = document.getElementById('shop');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navTo = (view: 'home' | 'shop' | 'about' | 'contact') => {
    setActiveView(view);
    setMobileMenuOpen(false);
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const elem = document.getElementById(view);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner Ribbon */}
      <div className="bg-slate-950 text-slate-400 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Curated Amazon Deals:</span>
            <span className="hidden sm:inline text-slate-400">Hand-tested products with verified Prime delivery & discounts.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium">
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); navTo('about'); }}
              className="hover:text-cyan-400 transition-colors hidden md:inline"
            >
              Affiliate Transparency
            </a>
            <span className="text-slate-800 hidden md:inline">|</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3 h-3 text-cyan-400/80" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); navTo('home'); }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1 leading-none">
                {siteSettings.brandName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mt-0.5">
                Curated Deals
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <button
              onClick={() => navTo('home')}
              className={`hover:text-cyan-400 transition-colors cursor-pointer ${activeView === 'home' ? 'text-cyan-400' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => navTo('shop')}
              className={`hover:text-cyan-400 transition-colors cursor-pointer ${activeView === 'shop' ? 'text-cyan-400' : ''}`}
            >
              Shop All
            </button>
            <a
              href="#categories"
              onClick={(e) => {
                e.preventDefault();
                navTo('home');
                setTimeout(() => {
                  document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="hover:text-cyan-400 transition-colors"
            >
              Categories
            </a>
            <button
              onClick={() => navTo('about')}
              className={`hover:text-cyan-400 transition-colors cursor-pointer ${activeView === 'about' ? 'text-cyan-400' : ''}`}
            >
              About
            </button>
            <button
              onClick={() => navTo('contact')}
              className={`hover:text-cyan-400 transition-colors cursor-pointer ${activeView === 'contact' ? 'text-cyan-400' : ''}`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons: Search + Cart */}
          <div className="flex items-center gap-3">
            {/* Inline Desktop Search */}
            <form onSubmit={handleSearchSubmit} className="relative hidden lg:block w-64">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products, gear..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </form>

            {/* Mobile / Compact Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              aria-label="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Saved Products / Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer group"
              aria-label="View Saved Products Cart"
            >
              <Bookmark className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold hidden sm:inline">Saved</span>
              {cartTotalCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-black flex items-center justify-center">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="lg:hidden px-4 py-3 bg-slate-900 border-t border-slate-800">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                autoFocus
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-6 bg-slate-950 border-t border-slate-800 space-y-3">
            <button
              onClick={() => navTo('home')}
              className="block w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400"
            >
              Home
            </button>
            <button
              onClick={() => navTo('shop')}
              className="block w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400"
            >
              Shop All
            </button>
            <a
              href="#categories"
              onClick={() => { setMobileMenuOpen(false); }}
              className="block py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400"
            >
              Categories
            </a>
            <button
              onClick={() => navTo('about')}
              className="block w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400"
            >
              About
            </button>
            <button
              onClick={() => navTo('contact')}
              className="block w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400"
            >
              Contact
            </button>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="text-xs font-semibold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Admin Login</span>
              </button>
              <button
                onClick={() => { onOpenCart(); setMobileMenuOpen(false); }}
                className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved Products ({cartTotalCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
