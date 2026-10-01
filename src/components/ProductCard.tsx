import React from 'react';
import { ExternalLink, Bookmark, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAffiliateRedirect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAffiliateRedirect,
}) => {
  const { categories, cartItems, addToCart, removeFromCart, siteSettings } = useStore();
  const category = categories.find(c => c.id === product.categoryId);
  const isSaved = cartItems.some(i => i.product.id === product.id);

  const discountPercent = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const currencySymbol = product.currency || siteSettings.currency || '$';

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-slate-900/90 rounded-2xl border border-slate-800/90 hover:border-cyan-500/50 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5">
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
            {product.featured && (
              <span className="px-2 py-0.5 rounded-md bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                Featured
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={toggleSave}
            className={`pointer-events-auto p-2 rounded-xl transition-all shadow-md cursor-pointer ${
              isSaved
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-950/70 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-700/80'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Product'}
            aria-label="Save product to list"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md border border-slate-700 flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category kicker */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
            <span className="text-cyan-400 font-mono uppercase tracking-wider">
              {category?.name || 'Curated Gear'}
            </span>
            {product.clickCount > 0 && (
              <span className="text-slate-500 text-[10px]">
                {product.clickCount} views
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Buy Action */}
        <div className="pt-3 border-t border-slate-800/80 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              {product.price !== undefined ? (
                <>
                  <span className="text-lg font-black text-white font-mono">
                    {currencySymbol}{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs text-slate-500 line-through font-mono">
                      {currencySymbol}{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-xs font-semibold text-cyan-400">
                  Check Amazon Price
                </span>
              )}
            </div>

            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Check className="w-3 h-3 text-cyan-400" />
              <span>Amazon Prime</span>
            </span>
          </div>

          {/* Buy CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAffiliateRedirect(product);
            }}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
          >
            <span>Buy on Amazon</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
