import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Package,
  Layers,
  Sliders,
  BarChart3,
  Mail,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowUpRight,
  TrendingUp,
  MousePointerClick,
  Sparkles,
  Database,
  Key,
  Shield,
  X,
  AlertTriangle,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, Category, HeroSlide, SiteSettings } from '../../types';

interface AdminPortalProps {
  onBackToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  const {
    products,
    categories,
    heroSlides,
    siteSettings,
    contactMessages,
    affiliateClicks,
    adminSession,
    adminLogin,
    adminLogout,
    saveProduct,
    deleteProduct,
    duplicateProduct,
    saveCategory,
    deleteCategory,
    saveHeroSlide,
    deleteHeroSlide,
    updateSiteSettings,
    updateAdminPassword,
    markMessageRead,
    deleteMessage,
    seedDefaultsToFirestore,
  } = useStore();

  // Login Form State
  const [loginUser, setLoginUser] = useState('admin');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin Navigation
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'categories' | 'hero' | 'analytics' | 'messages' | 'settings'
  >('overview');

  // Product Modals & Filters
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Category Modals
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [categoryWarning, setCategoryWarning] = useState<string | null>(null);

  // Hero Slide Modal
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);

  // Toast / Feedback State
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Password Change
  const [newAdminPass, setNewAdminPass] = useState('');
  const [newAdminPassConfirm, setNewAdminPassConfirm] = useState('');
  const [passFeedback, setPassFeedback] = useState('');

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const success = await adminLogin(loginUser, loginPass);
      if (!success) {
        setLoginError('Invalid username or password. Default is admin / password123.');
      }
    } catch {
      setLoginError('An error occurred during authentication.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // If Not Authenticated: Render Login Page
  if (!adminSession?.isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-100">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
              Admin Authentication
            </h1>
            <p className="text-xs text-slate-400">
              Sign in to manage {siteSettings.brandName} affiliate catalog and settings.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="password123"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-cyan-400 font-semibold">Initial Dev Credentials:</strong>
              <div className="mt-0.5 font-mono text-slate-300">User: <code className="text-white">admin</code> | Pass: <code className="text-white">password123</code></div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onBackToSite}
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Analytics Math
  const totalClicksCount = affiliateClicks.length || products.reduce((acc, p) => acc + (p.clickCount || 0), 0);
  const now = new Date();
  const todayString = now.toISOString().split('T')[0];
  const todayClicksCount = affiliateClicks.filter(c => c.clickedAt.startsWith(todayString)).length;
  const unreadMessagesCount = contactMessages.filter(m => !m.isRead).length;
  const activeProductsCount = products.filter(p => p.status === 'active').length;
  const featuredCount = products.filter(p => p.featured).length;

  // Filtered Products for Admin Table
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.shortDescription.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCatFilter === 'all' || p.categoryId === productCatFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Toast Notification */}
      {feedbackMsg && (
        <div className="fixed top-5 right-5 z-50 p-4 bg-emerald-950 border border-emerald-700 text-emerald-200 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
              {siteSettings.brandName} <span className="text-cyan-400 font-normal text-xs">Admin CMS</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Store</span>
          </button>

          <button
            onClick={adminLogout}
            className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-800/80"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Body: Sidebar + Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800/80 p-4 space-y-1 shrink-0">
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 px-3 py-2">
            Navigation
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>Products</span>
            </div>
            <span className="text-[10px] opacity-75 font-mono">{products.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>Categories</span>
            </div>
            <span className="text-[10px] opacity-75 font-mono">{categories.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sliders className="w-4 h-4" />
              <span>Hero Slider</span>
            </div>
            <span className="text-[10px] opacity-75 font-mono">{heroSlides.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4" />
              <span>Click Analytics</span>
            </div>
            <span className="text-[10px] opacity-75 font-mono">{totalClicksCount}</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4" />
              <span>Contact Inquiries</span>
            </div>
            {unreadMessagesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" />
              <span>Site & SEO Settings</span>
            </div>
          </button>

          {/* Seed Initial Defaults */}
          <div className="pt-6 border-t border-slate-800 mt-6">
            <button
              onClick={async () => {
                await seedDefaultsToFirestore();
                showToast('Synchronized demo products, slides, and settings to Firestore!');
              }}
              className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sync Defaults to DB</span>
            </button>
            <p className="text-[10px] text-slate-500 text-center mt-1.5">
              Populates Firestore with initial curated products and banners.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl overflow-x-hidden">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                  Business Overview
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Real-time affiliate referral tracking and product catalog health.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Products</span>
                  <div className="text-2xl font-black text-white font-mono">{activeProductsCount}</div>
                  <span className="text-[11px] text-slate-400 block">Total in catalog: {products.length}</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Total Clicks</span>
                  <div className="text-2xl font-black text-cyan-400 font-mono">{totalClicksCount}</div>
                  <span className="text-[11px] text-slate-400 block">Outbound referrals</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Today's Clicks</span>
                  <div className="text-2xl font-black text-amber-400 font-mono">{todayClicksCount}</div>
                  <span className="text-[11px] text-slate-400 block">Logged today</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Categories</span>
                  <div className="text-2xl font-black text-white font-mono">{categories.length}</div>
                  <span className="text-[11px] text-slate-400 block">Active departments</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Unread Inquiries</span>
                  <div className="text-2xl font-black text-white font-mono">{unreadMessagesCount}</div>
                  <span className="text-[11px] text-slate-400 block">Total: {contactMessages.length}</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Featured Picks</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono">{featuredCount}</div>
                  <span className="text-[11px] text-slate-400 block">Highlighted items</span>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Top Clicked Products Leaderboard */}
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span>Top Performing Affiliate Products</span>
                    </h3>
                    <span className="text-xs text-slate-500">By Total Amazon Clicks</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[...products]
                      .sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0))
                      .slice(0, 5)
                      .map((p, idx) => {
                        const maxClicks = Math.max(...products.map(pr => pr.clickCount || 1));
                        const pct = Math.round(((p.clickCount || 0) / maxClicks) * 100);
                        return (
                          <div key={p.id} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-200 truncate max-w-sm">
                                {idx + 1}. {p.name}
                              </span>
                              <span className="font-mono font-bold text-cyan-400">{p.clickCount || 0} clicks</span>
                            </div>
                            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Quick Actions & Recent Messages */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>Recent Customer Notes</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {contactMessages.slice(0, 3).map((m) => (
                      <div key={m.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{m.name}</span>
                          <span className="text-[10px] text-slate-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{m.message}</p>
                      </div>
                    ))}
                    {contactMessages.length === 0 && (
                      <p className="text-xs text-slate-500 italic py-4 text-center">No contact messages received yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                    Product Management
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Add, edit, duplicate, and configure Amazon affiliate URLs.
                  </p>
                </div>

                <button
                  onClick={() => setEditingProduct({
                    name: '',
                    slug: '',
                    imageUrl: '',
                    additionalImages: [],
                    shortDescription: '',
                    fullDescription: '',
                    price: 99,
                    originalPrice: 129,
                    currency: siteSettings.currency || '$',
                    categoryId: categories[0]?.id || 'cat-electronics',
                    amazonAffiliateUrl: 'https://amazon.com',
                    featured: false,
                    status: 'active',
                    clickCount: 0,
                  })}
                  className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products by title..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>

                <select
                  value={productCatFilter}
                  onChange={(e) => setProductCatFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-300 py-2 px-3 rounded-xl focus:outline-none focus:border-cyan-500 cursor-pointer w-full sm:w-auto"
                >
                  <option value="all">All Departments</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Products Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden overflow-x-auto shadow-md">
                <table className="w-full text-left border-collapse min-w-[760px]">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="py-3.5 px-4 w-16">Image</th>
                      <th className="py-3.5 px-4">Product Name</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Clicks</th>
                      <th className="py-3.5 px-4">Featured</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-xs">
                    {filteredProducts.map((p) => {
                      const cat = categories.find(c => c.id === p.categoryId);
                      return (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4">
                            <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-slate-950" />
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <div className="font-bold text-white truncate">{p.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono truncate">{p.slug}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-400">{cat?.name || 'Unknown'}</td>
                          <td className="py-3 px-4 font-mono font-bold text-white">
                            {p.price ? `${p.currency || '$'}${p.price}` : '—'}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                            {p.clickCount || 0}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={async () => {
                                await saveProduct({ id: p.id, featured: !p.featured });
                                showToast(`Product marked as ${!p.featured ? 'Featured' : 'Standard'}`);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer ${
                                p.featured ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-500'
                              }`}
                            >
                              {p.featured ? 'Featured' : 'Regular'}
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={async () => {
                                const newStatus = p.status === 'active' ? 'inactive' : 'active';
                                await saveProduct({ id: p.id, status: newStatus });
                                showToast(`Product is now ${newStatus}`);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer ${
                                p.status === 'active'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              }`}
                            >
                              {p.status}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setEditingProduct(p)}
                                className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                                title="Edit Product"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  await duplicateProduct(p.id);
                                  showToast('Product cloned successfully!');
                                }}
                                className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                                title="Duplicate Product"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(p.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                    Category Management
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage store departments and featured category banners.
                  </p>
                </div>

                <button
                  onClick={() => setEditingCategory({
                    name: '',
                    slug: '',
                    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
                    description: '',
                    status: 'active',
                  })}
                  className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              {categoryWarning && (
                <div className="p-4 bg-amber-950/60 border border-amber-800 text-amber-300 rounded-2xl text-xs flex items-center justify-between">
                  <span>{categoryWarning}</span>
                  <button onClick={() => setCategoryWarning(null)} className="text-amber-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((c) => {
                  const assignedCount = products.filter(p => p.categoryId === c.id).length;
                  return (
                    <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 relative overflow-hidden flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="aspect-16/9 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                          <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-white">{c.name}</h3>
                          <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/80">
                            {assignedCount} Products
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          c.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {c.status}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingCategory(c)}
                            className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800"
                            title="Edit Category"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={async () => {
                              const res = await deleteCategory(c.id);
                              if (!res.success) {
                                setCategoryWarning(res.message || 'Cannot delete category.');
                              } else {
                                showToast('Category deleted successfully.');
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: HERO SLIDER */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                    Hero Slider Management
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage top homepage promotional banners, CTA buttons, and display orders.
                  </p>
                </div>

                <button
                  onClick={() => setEditingSlide({
                    title: 'Special Headline',
                    description: 'Engaging subtitle explaining verified affiliate picks.',
                    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1920&q=80',
                    ctaText: 'Explore Now',
                    ctaUrl: '#shop',
                    displayOrder: heroSlides.length + 1,
                    status: 'active',
                  })}
                  className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Slide</span>
                </button>
              </div>

              <div className="space-y-4">
                {heroSlides.map((slide, idx) => (
                  <div key={slide.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full md:w-56 h-32 rounded-xl object-cover bg-slate-950 shrink-0"
                    />

                    <div className="flex-1 space-y-1.5 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/80">
                          Order #{slide.displayOrder || idx + 1}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          slide.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {slide.status}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{slide.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{slide.description}</p>
                      <div className="text-[11px] text-cyan-400 font-semibold pt-1">
                        CTA: "{slide.ctaText}" → {slide.ctaUrl}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingSlide(slide)}
                        className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-xl"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          await deleteHeroSlide(slide.id);
                          showToast('Slide removed.');
                        }}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CLICK ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                  Real-Time Affiliate Click Analytics
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Track every outbound link click with timestamps, product breakdown, and conversion trendlines.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Recorded Clicks</span>
                  <div className="text-3xl font-black text-cyan-400 font-mono mt-1">{totalClicksCount}</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Clicks Today</span>
                  <div className="text-3xl font-black text-amber-400 font-mono mt-1">{todayClicksCount}</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tracked Products</span>
                  <div className="text-3xl font-black text-white font-mono mt-1">{products.length}</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Active Associate Tag</span>
                  <div className="text-lg font-black text-emerald-400 font-mono mt-1 truncate">
                    {siteSettings.amazonAffiliateTag || 'trendvault-20'}
                  </div>
                </div>
              </div>

              {/* Click Log Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Real-Time Click Stream Log
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-2.5 px-3">Timestamp</th>
                        <th className="py-2.5 px-3">Product Name</th>
                        <th className="py-2.5 px-3">Affiliate Tag URL</th>
                        <th className="py-2.5 px-3">Session ID</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-xs font-mono">
                      {affiliateClicks.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/40">
                          <td className="py-2.5 px-3 text-slate-400">
                            {new Date(c.clickedAt).toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3 text-white font-sans font-bold">
                            {c.productName}
                          </td>
                          <td className="py-2.5 px-3 text-cyan-400 truncate max-w-xs">
                            {c.affiliateUrl}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500">
                            {c.sessionId || 'anonymous'}
                          </td>
                        </tr>
                      ))}
                      {affiliateClicks.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-slate-500 italic font-sans">
                            No clicks recorded yet. Outbound product clicks will appear here instantly.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT INQUIRIES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                  Contact Inquiries
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Customer feedback, gear requests, and partnership proposals.
                </p>
              </div>

              <div className="space-y-4">
                {contactMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-slate-900 border rounded-2xl p-5 space-y-3 transition-colors ${
                      msg.isRead ? 'border-slate-800' : 'border-cyan-500/60 bg-slate-900/90'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <span className="font-bold text-white text-sm">{msg.name}</span>
                        <div className="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
                          <a href={`mailto:${msg.email}`} className="text-cyan-400 hover:underline">{msg.email}</a>
                          {msg.phone && <span>Tel: {msg.phone}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500 font-mono">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        <button
                          onClick={async () => {
                            await markMessageRead(msg.id, !msg.isRead);
                            showToast(msg.isRead ? 'Marked as unread' : 'Marked as read');
                          }}
                          className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                            msg.isRead
                              ? 'bg-slate-800 text-slate-400 hover:text-white'
                              : 'bg-cyan-500 text-slate-950 font-bold'
                          }`}
                        >
                          {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        <button
                          onClick={async () => {
                            await deleteMessage(msg.id);
                            showToast('Message deleted.');
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))}

                {contactMessages.length === 0 && (
                  <div className="p-12 text-center text-slate-500 bg-slate-900/60 rounded-3xl border border-slate-800">
                    No contact submissions in inbox.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: SITE SETTINGS & SEO */}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                  Site Settings & SEO
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Configure brand identity, global Amazon associate tag, currency, and SEO meta tags.
                </p>
              </div>

              {/* General Form */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  showToast('Site settings updated successfully!');
                }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
                  Brand Identity & Amazon Associate Tag
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Brand Name *
                    </label>
                    <input
                      type="text"
                      value={siteSettings.brandName}
                      onChange={(e) => updateSiteSettings({ brandName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Amazon Affiliate Tag *
                    </label>
                    <input
                      type="text"
                      value={siteSettings.amazonAffiliateTag}
                      onChange={(e) => updateSiteSettings({ amazonAffiliateTag: e.target.value })}
                      placeholder="tag-20"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Currency Symbol
                    </label>
                    <input
                      type="text"
                      value={siteSettings.currency}
                      onChange={(e) => updateSiteSettings({ currency: e.target.value })}
                      placeholder="$"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Editorial Email
                    </label>
                    <input
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => updateSiteSettings({ contactEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      value={siteSettings.contactPhone}
                      onChange={(e) => updateSiteSettings({ contactPhone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Website Tagline / Description
                  </label>
                  <textarea
                    rows={2}
                    value={siteSettings.websiteDescription}
                    onChange={(e) => updateSiteSettings({ websiteDescription: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pt-4 pb-3">
                  SEO Configuration
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Default SEO Page Title
                  </label>
                  <input
                    type="text"
                    value={siteSettings.seoTitle}
                    onChange={(e) => updateSiteSettings({ seoTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Default Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={siteSettings.seoDescription}
                    onChange={(e) => updateSiteSettings({ seoDescription: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </form>

              {/* Password Change Form */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-cyan-400" />
                  <span>Update Admin Password</span>
                </h3>

                {passFeedback && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-cyan-800 text-cyan-300 text-xs">
                    {passFeedback}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newAdminPass}
                      onChange={(e) => setNewAdminPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={newAdminPassConfirm}
                      onChange={(e) => setNewAdminPassConfirm(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    if (!newAdminPass || newAdminPass.length < 6) {
                      setPassFeedback('Password must be at least 6 characters.');
                      return;
                    }
                    if (newAdminPass !== newAdminPassConfirm) {
                      setPassFeedback('Passwords do not match.');
                      return;
                    }
                    await updateAdminPassword(newAdminPass);
                    setPassFeedback('Password changed successfully! Stored securely.');
                    setNewAdminPass('');
                    setNewAdminPassConfirm('');
                  }}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase rounded-xl transition-colors cursor-pointer"
                >
                  Save New Password
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: ADD / EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto space-y-5 my-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white uppercase">
                {editingProduct.id ? 'Edit Product' : 'Add New Affiliate Product'}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveProduct(editingProduct);
                setEditingProduct(null);
                showToast('Product saved successfully!');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="e.g. Sony WH-1000XM5 Headphones"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 uppercase mb-1">Category *</label>
                  <select
                    value={editingProduct.categoryId || categories[0]?.id}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-400 uppercase mb-1">Product Slug</label>
                  <input
                    type="text"
                    value={editingProduct.slug || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    placeholder="sony-wh-1000xm5"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 uppercase mb-1">Sale Price</label>
                  <input
                    type="number"
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    placeholder="348"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 uppercase mb-1">Original Price (Strike)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    placeholder="399"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 uppercase mb-1">Currency</label>
                  <input
                    type="text"
                    value={editingProduct.currency || siteSettings.currency || '$'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, currency: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Amazon Affiliate URL *</label>
                <input
                  type="url"
                  required
                  value={editingProduct.amazonAffiliateUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, amazonAffiliateUrl: e.target.value })}
                  placeholder="https://www.amazon.com/dp/B09XS7JWHH/?tag=yourtag-20"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Main Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingProduct.imageUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProduct.shortDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  placeholder="One or two sentences highlighting standout feature..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Full In-Depth Review / Description</label>
                <textarea
                  rows={4}
                  value={editingProduct.fullDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, fullDescription: e.target.value })}
                  placeholder="Full specifications, real-world testing feedback..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="w-4 h-4 accent-cyan-500"
                  />
                  <span className="font-semibold text-slate-300">Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.status === 'active'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.checked ? 'active' : 'inactive' })}
                    className="w-4 h-4 accent-cyan-500"
                  />
                  <span className="font-semibold text-slate-300">Active (Visible in Store)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT CATEGORY */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white uppercase">
                {editingCategory.id ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={() => setEditingCategory(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveCategory(editingCategory);
                setEditingCategory(null);
                showToast('Category saved.');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingCategory.imageUrl || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, imageUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase rounded-xl"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE PRODUCT CONFIRMATION */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete this product?</h3>
            <p className="text-xs text-slate-400">
              This will remove the product and its click logs from the database. This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                  showToast('Product deleted from database.');
                }}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold uppercase"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
