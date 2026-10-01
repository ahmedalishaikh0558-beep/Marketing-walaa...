import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  onQuickView: (product: Product) => void;
  onAffiliateRedirect: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onQuickView,
  onAffiliateRedirect,
  onViewAll,
}) => {
  const { products } = useStore();
  const featured = products.filter(p => p.featured && p.status === 'active');

  if (featured.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editor's Prime Selection</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Trending & Featured Picks
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Curated Gear</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAffiliateRedirect={onAffiliateRedirect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
