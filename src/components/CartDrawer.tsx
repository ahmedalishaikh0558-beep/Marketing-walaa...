import React from 'react';
import { X, Trash2, Plus, Minus, ExternalLink, Bookmark, ArrowRight, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAffiliateRedirect: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onAffiliateRedirect,
}) => {
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotalCount,
    cartEstimatedTotal,
    siteSettings,
  } = useStore();

  if (!isOpen) return null;

  const currencySymbol = siteSettings.currency || '$';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-none">
                My Saved Products
              </h3>
              <span className="text-[11px] text-slate-400">
                {cartTotalCount} {cartTotalCount === 1 ? 'item' : 'items'} in your wishlist
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Banner: Crucial Affiliate transparency requirement */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            This list is saved locally to compare products. Final checkout and Prime delivery are completed securely on Amazon.
          </p>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center gap-3 group"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-900"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h4>
                  <div className="text-xs font-mono font-bold text-cyan-400">
                    {product.price ? `${currencySymbol}${product.price}` : 'Check Price'}
                  </div>

                  {/* Quantity & Buy Button */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono px-1.5 text-white text-xs">{quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAffiliateRedirect(product)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] uppercase rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                        title="View & purchase on Amazon"
                      >
                        <span>Buy on Amazon</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Your list is empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Bookmark items you're interested in while browsing to track price and compare specs.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Estimated Total Value:</span>
              <span className="text-xl font-black text-white font-mono">
                {currencySymbol}{cartEstimatedTotal.toLocaleString()}
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={clearCart}
                className="w-full py-2 text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                Clear Saved List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
