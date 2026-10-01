import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Bookmark, Check, ShieldCheck, Truck, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAffiliateRedirect: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAffiliateRedirect,
  onSelectProduct,
}) => {
  const { categories, products, cartItems, addToCart, removeFromCart, siteSettings } = useStore();
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const category = categories.find(c => c.id === product.categoryId);
  const isSaved = cartItems.some(i => i.product.id === product.id);

  const allImages = [product.imageUrl, ...(product.additionalImages || [])].filter(Boolean);

  const discountPercent = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const savingsAmount = product.originalPrice && product.price
    ? product.originalPrice - product.price
    : 0;

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id && p.status === 'active')
    .slice(0, 3);

  const toggleSave = () => {
    if (isSaved) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const currencySymbol = product.currency || siteSettings.currency || '$';

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl text-slate-100 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                <img
                  src={activeImage || product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-18 h-18 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        activeImage === img ? 'border-cyan-400 scale-95' : 'border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1.5">
                  <span>{category?.name || 'Curated'}</span>
                  <span>•</span>
                  <span className="text-slate-400 font-sans font-medium">Verified Spec</span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Price Block */}
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    {product.price !== undefined ? (
                      <>
                        <span className="text-3xl font-black text-white font-mono">
                          {currencySymbol}{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-slate-500 line-through font-mono">
                            {currencySymbol}{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-sm font-semibold text-cyan-400">
                        Check Current Price on Amazon
                      </span>
                    )}
                  </div>

                  {savingsAmount > 0 && (
                    <span className="text-xs font-bold text-emerald-400 font-mono bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-800/60">
                      Save {currencySymbol}{savingsAmount.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Truck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Prime Delivery Eligible</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Amazon Buyer Protection</span>
                  </span>
                </div>
              </div>

              {/* Short & Full Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Product Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {product.fullDescription || product.shortDescription}
                </p>
              </div>

              {/* Primary Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onAffiliateRedirect(product)}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Check Price on Amazon</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleSave}
                  className={`py-3.5 px-5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    isSaved
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                      : 'bg-slate-950 text-slate-300 hover:text-white border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved in List' : 'Save Product'}</span>
                </button>
              </div>

              {/* Affiliate Disclosure Notice */}
              <p className="text-[11px] text-slate-500 italic">
                * As an Amazon Associate we earn from qualifying purchases at no extra cost to you. Click opens the direct verified listing on Amazon.
              </p>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                You Might Also Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-cyan-500/50 flex items-center gap-3 transition-colors cursor-pointer group"
                  >
                    <img
                      src={rel.imageUrl}
                      alt={rel.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {rel.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {rel.price ? `${currencySymbol}${rel.price}` : 'Check Price'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
