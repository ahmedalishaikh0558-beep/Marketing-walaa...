import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, X, ArrowUpDown, Tag, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

interface ShopSectionProps {
  onQuickView: (product: Product) => void;
  onAffiliateRedirect: (product: Product) => void;
  selectedCategoryFilter: string | null;
  onSelectCategoryFilter: (catId: string | null) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  onQuickView,
  onAffiliateRedirect,
  selectedCategoryFilter,
  onSelectCategoryFilter,
  searchQuery,
  onSearchQueryChange,
}) => {
  const { products, categories, siteSettings } = useStore();
  const [selectedPriceBracket, setSelectedPriceBracket] = useState<'all' | 'under150' | '150to300' | 'above300'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'popular' | 'priceLow' | 'priceHigh' | 'discount'>('featured');
  const [visibleCount, setVisibleCount] = useState(8);

  const activeCategories = categories.filter(c => c.status === 'active');
  const activeProducts = products.filter(p => p.status === 'active');

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return activeProducts.filter((product) => {
      // 1. Category Filter
      if (selectedCategoryFilter && product.categoryId !== selectedCategoryFilter) {
        return false;
      }

      // 2. Keyword Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query) || product.fullDescription.toLowerCase().includes(query);
        const cat = categories.find(c => c.id === product.categoryId);
        const matchesCat = cat?.name.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // 3. Price Bracket Filter
      if (selectedPriceBracket !== 'all') {
        const p = product.price || 0;
        if (selectedPriceBracket === 'under150' && p >= 150) return false;
        if (selectedPriceBracket === '150to300' && (p < 150 || p > 300)) return false;
        if (selectedPriceBracket === 'above300' && p <= 300) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.clickCount || 0) - (a.clickCount || 0);
      }
      if (sortBy === 'popular') {
        return (b.clickCount || 0) - (a.clickCount || 0);
      }
      if (sortBy === 'priceLow') {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === 'priceHigh') {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === 'discount') {
        const discA = a.originalPrice && a.price ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice && b.price ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      }
      return 0;
    });
  }, [activeProducts, selectedCategoryFilter, searchQuery, selectedPriceBracket, sortBy, categories]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const resetAllFilters = () => {
    onSelectCategoryFilter(null);
    onSearchQueryChange('');
    setSelectedPriceBracket('all');
    setSortBy('featured');
  };

  const hasActiveFilters = Boolean(selectedCategoryFilter || searchQuery || selectedPriceBracket !== 'all');

  return (
    <section id="shop" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-900 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <Tag className="w-3.5 h-3.5" />
            <span>Complete Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Curated Affiliate Products
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Every product below has been selected for outstanding quality, high customer satisfaction, and backed by Amazon buyer protections.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-4 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="Search products by title, feature, or keyword..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => onSearchQueryChange('')}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold hidden sm:inline">Sort:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 py-2.5 px-3 rounded-xl focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="popular">Most Popular</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => onSelectCategoryFilter(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategoryFilter === null
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              All Categories ({activeProducts.length})
            </button>
            {activeCategories.map((cat) => {
              const count = activeProducts.filter(p => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategoryFilter === cat.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Price Brackets Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-500">Price:</span>
              <button
                onClick={() => setSelectedPriceBracket('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  selectedPriceBracket === 'all'
                    ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/80'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Any Price
              </button>
              <button
                onClick={() => setSelectedPriceBracket('under150')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  selectedPriceBracket === 'under150'
                    ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/80'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Under {siteSettings.currency}150
              </button>
              <button
                onClick={() => setSelectedPriceBracket('150to300')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  selectedPriceBracket === '150to300'
                    ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/80'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {siteSettings.currency}150 - {siteSettings.currency}300
              </button>
              <button
                onClick={() => setSelectedPriceBracket('above300')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  selectedPriceBracket === 'above300'
                    ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/80'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Above {siteSettings.currency}300
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <span>
            Showing <strong className="text-white">{displayedProducts.length}</strong> of{' '}
            <strong className="text-white">{filteredProducts.length}</strong> products
          </span>
        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAffiliateRedirect={onAffiliateRedirect}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We couldn't find any products matching your current filters. Try relaxing your search terms or view all categories.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer hover:border-cyan-500/50"
            >
              Load More Products ({filteredProducts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
