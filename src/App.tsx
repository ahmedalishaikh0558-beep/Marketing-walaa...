/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { CategorySection } from './components/CategorySection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ShopSection } from './components/ShopSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AffiliateRedirectModal } from './components/AffiliateRedirectModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminPortal } from './components/admin/AdminPortal';
import { Product } from './types';

function StorefrontApp() {
  const { products, siteSettings, loading } = useStore();

  const [activeView, setActiveView] = useState<'home' | 'shop' | 'about' | 'contact'>('home');
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.hash.startsWith('#admin') || window.location.pathname.startsWith('/admin');
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [redirectingProduct, setRedirectingProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Shop Filters
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL Hash Navigation & Deep Linking:
  // e.g. #admin, #go/:slug, #product/:slug
  useEffect(() => {
    const handleLocationRoute = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (hash.startsWith('#admin') || path.startsWith('/admin')) {
        setIsAdminView(true);
        return;
      }

      // Check /go/:slug affiliate tracking route
      if (hash.startsWith('#go/') || path.startsWith('/go/')) {
        const slug = hash.startsWith('#go/') ? hash.replace('#go/', '') : path.replace('/go/', '');
        const target = products.find(p => p.slug === slug || p.id === slug);
        if (target) {
          setRedirectingProduct(target);
        }
        return;
      }

      // Check /product/:slug dynamic product page route
      if (hash.startsWith('#product/') || path.startsWith('/product/')) {
        const slug = hash.startsWith('#product/') ? hash.replace('#product/', '') : path.replace('/product/', '');
        const target = products.find(p => p.slug === slug || p.id === slug);
        if (target) {
          setSelectedProduct(target);
        }
        return;
      }
    };

    handleLocationRoute();
    window.addEventListener('hashchange', handleLocationRoute);
    return () => window.removeEventListener('hashchange', handleLocationRoute);
  }, [products]);

  // Update document title for SEO
  useEffect(() => {
    if (siteSettings?.seoTitle) {
      document.title = siteSettings.seoTitle;
    }
  }, [siteSettings]);

  const openAdmin = () => {
    window.location.hash = 'admin';
    setIsAdminView(true);
  };

  const closeAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  const handleAffiliateClick = (product: Product) => {
    setRedirectingProduct(product);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setActiveView('shop');
    setTimeout(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleViewAllProducts = () => {
    setSelectedCategoryFilter(null);
    setActiveView('shop');
    setTimeout(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  if (isAdminView) {
    return <AdminPortal onBackToSite={closeAdmin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Header */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={openAdmin}
        activeView={activeView}
        setActiveView={setActiveView}
        onSearchQuery={(q) => setSearchQuery(q)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider onCtaClick={handleViewAllProducts} />

        {/* Featured Products */}
        <FeaturedProducts
          onQuickView={(p) => setSelectedProduct(p)}
          onAffiliateRedirect={handleAffiliateClick}
          onViewAll={handleViewAllProducts}
        />

        {/* Categories Department Grid */}
        <CategorySection onSelectCategory={handleCategorySelect} />

        {/* Shop All Section with Filters, Search & Sort */}
        <ShopSection
          onQuickView={(p) => setSelectedProduct(p)}
          onAffiliateRedirect={handleAffiliateClick}
          selectedCategoryFilter={selectedCategoryFilter}
          onSelectCategoryFilter={setSelectedCategoryFilter}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        {/* About & Affiliate Disclosure */}
        <AboutSection />

        {/* Contact Editorial Team */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={openAdmin}
        onNavigate={(view) => {
          setActiveView(view);
          if (view === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            document.getElementById(view)?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAffiliateRedirect={handleAffiliateClick}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <AffiliateRedirectModal
        product={redirectingProduct}
        onClose={() => setRedirectingProduct(null)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onAffiliateRedirect={handleAffiliateClick}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StorefrontApp />
    </StoreProvider>
  );
}
