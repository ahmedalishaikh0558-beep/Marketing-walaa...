import React, { useState } from 'react';
import { ShoppingCart, Star, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, Truck, CreditCard, RotateCcw, X, Search } from 'lucide-react';
import { CONTACT_INFO } from '../data/websiteData';
import { DemoProduct, CartItem } from '../types';
import { useCms } from '../context/CmsContext';

interface InteractiveDemoStoreProps {
  onOpenBooking: () => void;
}

export const InteractiveDemoStore: React.FC<InteractiveDemoStoreProps> = ({ onOpenBooking }) => {
  const { demoProducts } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  // Checkout form state
  const [buyerName, setBuyerName] = useState('Rahul Verma');
  const [buyerPhone, setBuyerPhone] = useState('9876543210');
  const [buyerAddress, setBuyerAddress] = useState('Flat 402, Sunshine Heights, MG Road, Pune');

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Beauty'];

  const filteredProducts = demoProducts.filter(product => {
    const matchesCat = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + ((item.product.price || 0) * item.quantity), 0);
  const shippingFee = cartSubtotal > 999 ? 0 : 99;
  const grandTotal = cartSubtotal + shippingFee;

  const addToCart = (product: DemoProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCompleted(true);
  };

  const resetCheckout = () => {
    setOrderCompleted(false);
    setCheckoutModalOpen(false);
    setIsCartOpen(false);
    setCart([]);
  };

  return (
    <section id="demo-store" className="py-16 lg:py-24 bg-slate-900 text-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span>Interactive Customer Experience Demo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Experience the <span className="text-orange-500">"ShopKart"</span> Storefront
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              This is the high-converting WooCommerce storefront your customers will shop on. Try adding items to the cart, test the UPI payment options, and see automated WhatsApp order alerts in action.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-orange-400" />
              <span>Shopping Cart</span>
              {cartTotalCount > 0 && (
                <span className="bg-orange-500 text-white font-mono text-[11px] px-2 py-0.5 rounded-full font-bold">
                  {cartTotalCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
            >
              Build My Store Like This
            </button>
          </div>
        </div>

        {/* Store Navigation Bar Simulation */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Buttons (Compliant interactive filter buttons) */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search demo products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group"
            >
              {/* Image Container with Fallback */}
              <div className="relative aspect-[4/3] bg-slate-800 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded backdrop-blur-xs border border-white/10 uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold block">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-3.5 py-2 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Store Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
          <div className="flex flex-col items-center">
            <Truck className="w-6 h-6 text-orange-500 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Courier Dispatch</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Shiprocket automated courier pickup</p>
          </div>
          <div className="flex flex-col items-center">
            <CreditCard className="w-6 h-6 text-orange-500 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Safe Payments</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">UPI, Cards, Netbanking & COD</p>
          </div>
          <div className="flex flex-col items-center">
            <RotateCcw className="w-6 h-6 text-orange-500 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Easy Return Policy</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Automated return workflow</p>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare className="w-6 h-6 text-orange-500 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">WhatsApp Alerts</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Direct notifications to buyer phone</p>
          </div>
        </div>
      </div>

      {/* Cart Drawer Slide-over */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 text-white flex flex-col shadow-2xl">
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-orange-500" />
                  <h3 className="text-base font-bold uppercase tracking-wider">Your Shopping Cart</h3>
                  <span className="text-xs bg-slate-800 text-orange-400 px-2 py-0.5 rounded-full font-mono">
                    {cartTotalCount} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 space-y-3">
                    <ShoppingCart className="w-12 h-12 mx-auto text-slate-600" />
                    <p className="text-sm">Your demo cart is empty</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-lg hover:bg-orange-500"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 bg-slate-900 rounded-xl border border-slate-800/80 items-center"
                    >
                      <img
                        src={(item.product as any).image || item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg bg-slate-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                        <p className="text-xs font-bold text-orange-400 mt-0.5">
                          ₹{((item.product as any).price || 0).toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold font-mono">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-500 hover:text-rose-400 text-xs transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-800 bg-slate-900/60 space-y-3">
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping (All India)</span>
                      <span className="font-mono text-emerald-400">
                        {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                      <span>Grand Total</span>
                      <span className="text-orange-400 font-mono text-base">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutModalOpen(true);
                    }}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Test Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-slate-500">
                    ⚡ Integrated with Razorpay, PhonePe & Cash on Delivery
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Simulated Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-950 border border-slate-800 text-white w-full max-w-lg rounded-2xl p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderCompleted ? (
              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                    WooCommerce Checkout Experience
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">Complete Test Order</h3>
                  <p className="text-xs text-slate-400">
                    See how quick and smooth the Indian checkout flow is for your future customers.
                  </p>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Full Name</label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={e => setBuyerName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile / WhatsApp No.</label>
                      <input
                        type="tel"
                        required
                        value={buyerPhone}
                        onChange={e => setBuyerPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">City & State</label>
                      <input
                        type="text"
                        defaultValue="Pune, Maharashtra"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Shipping Address</label>
                    <textarea
                      rows={2}
                      required
                      value={buyerAddress}
                      onChange={e => setBuyerAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Payment Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('upi')}
                        className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                          selectedPaymentMethod === 'upi'
                            ? 'border-orange-500 bg-orange-950/40 text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-bold">UPI / QR</div>
                        <div className="text-[10px] text-slate-400">GPay, PhonePe</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('card')}
                        className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                          selectedPaymentMethod === 'card'
                            ? 'border-orange-500 bg-orange-950/40 text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-bold">Cards / Netbanking</div>
                        <div className="text-[10px] text-slate-400">All Indian Banks</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('cod')}
                        className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                          selectedPaymentMethod === 'cod'
                            ? 'border-orange-500 bg-orange-950/40 text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-bold">Cash on Delivery</div>
                        <div className="text-[10px] text-slate-400">OTP Verified</div>
                      </button>
                    </div>
                  </div>

                  {/* Order Summary in modal */}
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Total Payable Amount:</span>
                    <span className="text-base font-bold text-orange-400 font-mono">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Place Test Order (Instant Simulation)</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* Success / Confirmation Screen showing Simulated WhatsApp Notification */
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Order Confirmed! (#SK-8821)</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    This is the exact high-trust automated experience your clients get.
                  </p>
                </div>

                {/* Simulated WhatsApp Notification Card */}
                <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-xl p-4 text-left space-y-2">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold border-b border-emerald-900 pb-2">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Notification Preview</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Just Now</span>
                  </div>
                  <p className="text-xs text-emerald-100 font-mono leading-relaxed">
                    "Hi {buyerName}! 🎉 Thank you for shopping with ShopKart! Your order <span className="font-bold text-white">#SK-8821</span> of ₹{grandTotal.toLocaleString('en-IN')} is confirmed. Our courier partner is preparing shipment. Track live: <span className="underline text-emerald-300">track.shiprocket.in/sk8821</span>"
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={onOpenBooking}
                    className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Book Your Store for ₹10,999
                  </button>
                  <button
                    onClick={resetCheckout}
                    className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Back to Store
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
