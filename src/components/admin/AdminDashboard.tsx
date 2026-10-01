import React, { useState } from 'react';
import { 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  Settings, 
  Users, 
  ShoppingBag, 
  HelpCircle, 
  Layers, 
  ExternalLink, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle, 
  MessageSquare, 
  Phone, 
  RefreshCw,
  Database,
  ArrowLeft
} from 'lucide-react';
import { useCms, SiteSettingsData, LeadRecord } from '../../context/CmsContext';
import { DemoProduct, PackageFeature, FaqItem } from '../../types';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const {
    siteSettings,
    packageDeliverables,
    demoProducts,
    faqs,
    leads,
    currentUser,
    isAdmin,
    isAuthLoading,
    loginWithGoogle,
    logout,
    updateSiteSettings,
    updatePackageDeliverable,
    saveDemoProduct,
    deleteDemoProduct,
    saveFaq,
    deleteFaq,
    updateLeadStatus,
    seedInitialDataToFirestore
  } = useCms();

  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'settings' | 'products' | 'deliverables' | 'faqs'>('overview');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Form states for settings
  const [settingsForm, setSettingsForm] = useState<SiteSettingsData>(siteSettings);

  // Product modal or edit state
  const [editingProduct, setEditingProduct] = useState<DemoProduct | null>(null);
  const [newFaq, setNewFaq] = useState<FaqItem>({ question: '', answer: '' });

  const showSaveSuccess = (msg: string = 'Changes saved successfully to Firestore!') => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSiteSettings(settingsForm);
      showSaveSuccess();
    } catch (err) {
      alert("Failed to save settings. Check permissions.");
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      await saveDemoProduct(editingProduct);
      setEditingProduct(null);
      showSaveSuccess('Product catalog updated!');
    } catch (err) {
      alert("Failed to save product.");
    }
  };

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) return;
    try {
      await saveFaq(newFaq);
      setNewFaq({ question: '', answer: '' });
      showSaveSuccess('New FAQ published!');
    } catch (err) {
      alert("Failed to save FAQ.");
    }
  };

  // If Auth is loading
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin text-orange-500" />
          <span>Verifying credentials...</span>
        </div>
      </div>
    );
  }

  // If unauthenticated or non-admin
  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-600/20 text-orange-500 border border-orange-500/30 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">
              Marketingwalaa CMS
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Authorized administrator portal for content, lead management, and live pricing.
            </p>
          </div>

          {currentUser ? (
            <div className="p-4 bg-rose-950/40 border border-rose-900 rounded-2xl text-xs text-rose-300 space-y-2">
              <p>Signed in as <span className="font-bold text-white">{currentUser.email}</span></p>
              <p className="text-rose-400">
                This Google account is not configured with administrator access.
              </p>
              <button
                onClick={logout}
                className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={loginWithGoogle}
                className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-600/20"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In With Google</span>
              </button>
              <p className="text-[11px] text-slate-500">
                Pre-authorized admin: <span className="text-slate-400 font-mono">amrinkhn2@gmail.com</span>
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onBackToSite}
              className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Admin Top Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToSite}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Public Site</span>
          </button>
          <div className="h-5 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-xs">
              MW
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">
              Marketingwalaa <span className="text-orange-500">CMS</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {saveStatus && (
            <span className="text-xs text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-3 py-1 rounded-full animate-fade-in flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{saveStatus}</span>
            </span>
          )}

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>{currentUser.email}</span>
            <span className="bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono">
              ADMIN
            </span>
          </div>

          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800 p-4 space-y-1 shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'leads' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Inbound Leads</span>
            </div>
            {leads.length > 0 && (
              <span className="bg-slate-800 text-orange-400 px-2 py-0.5 rounded-full text-[10px] font-mono">
                {leads.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setSettingsForm(siteSettings);
              setActiveTab('settings');
            }}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pricing & Contact Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'products' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ShopKart Demo Catalog</span>
          </button>

          <button
            onClick={() => setActiveTab('deliverables')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'deliverables' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>9 Core Deliverables</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'faqs' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ Management</span>
          </button>

          <div className="pt-6 mt-6 border-t border-slate-800">
            <button
              onClick={async () => {
                await seedInitialDataToFirestore();
                showSaveSuccess('Initial defaults synchronized to Firestore!');
              }}
              className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
            >
              <Database className="w-3.5 h-3.5 text-orange-400" />
              <span>Sync Defaults to DB</span>
            </button>
            <p className="text-[10px] text-slate-500 mt-2 text-center">
              Populates Firestore with initial poster specifications.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8 max-w-6xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                  Business Overview
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time status of your Marketingwalaa WooCommerce service platform.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Leads</span>
                  <div className="text-3xl font-black text-white font-mono mt-1">{leads.length}</div>
                  <span className="text-[11px] text-emerald-400 mt-1 block">Prospective clients registered</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Live Package Price</span>
                  <div className="text-3xl font-black text-orange-400 font-mono mt-1">₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')}</div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Regular: ₹{siteSettings.originalPrice.toLocaleString('en-IN')}</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Demo Products</span>
                  <div className="text-3xl font-black text-white font-mono mt-1">{demoProducts.length}</div>
                  <span className="text-[11px] text-slate-500 mt-1 block">In ShopKart sandbox</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">WhatsApp Hotlines</span>
                  <div className="text-base font-bold text-white font-mono mt-2 truncate">{siteSettings.supportPhone}</div>
                  <span className="text-[11px] text-emerald-400 mt-1 block">Active instant link</span>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Recent Inbound Store Bookings
                  </h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-orange-400 hover:text-orange-300 font-semibold"
                  >
                    View All ({leads.length}) →
                  </button>
                </div>

                {leads.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    No inquiries received yet. Submit an inquiry through the booking form to see it appear here in real time!
                  </p>
                ) : (
                  <div className="divide-y divide-slate-800">
                    {leads.slice(0, 3).map(lead => (
                      <div key={lead.id} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm text-white">{lead.fullName}</div>
                          <div className="text-xs text-slate-400">
                            {lead.businessName} · <span className="text-orange-400">{lead.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                            lead.status === 'New' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {lead.status}
                          </span>
                          <a
                            href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.fullName)}%2C%20this%20is%20Marketingwalaa%20regarding%20your%20WooCommerce%20store%20inquiry.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INBOUND LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                    Inbound Client Inquiries
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time leads stored securely in Firestore with private access restriction.
                  </p>
                </div>
                <span className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-lg font-mono">
                  {leads.length} Records
                </span>
              </div>

              {leads.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-2">
                  <Users className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="text-sm font-semibold">No inquiries yet</p>
                  <p className="text-xs text-slate-500">
                    Test the booking modal on the live site to verify live Firestore persistence.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
                  <table className="w-full text-left text-xs border-collapse min-w-[640px]">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-950/50">
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Brand / Domain</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{lead.fullName}</div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-200">{lead.businessName}</div>
                            <div className="text-[10px] text-orange-400 font-mono">
                              {lead.preferredDomain || 'Domain pending'}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {lead.category}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-mono text-slate-300">+91 {lead.phone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={lead.status}
                              onChange={e => updateLeadStatus(lead.id, e.target.value as any)}
                              className="bg-slate-950 border border-slate-700 text-white rounded px-2 py-1 text-[11px] focus:outline-none focus:border-orange-500"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Closed">Closed</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <a
                              href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.fullName)}%2C%20thank%20you%20for%20reaching%20out%20to%20Marketingwalaa%20regarding%20the%20WooCommerce%20store%20setup%20for%20${encodeURIComponent(lead.businessName)}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRICING & SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                  Pricing & Contact Settings
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update live promotional prices, telephone numbers, and top bar alerts across the entire website.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Promotional Offer Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={settingsForm.currentOfferPrice}
                      onChange={e => setSettingsForm({ ...settingsForm, currentOfferPrice: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Currently displayed price on public site.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Regular / Strikethrough Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={settingsForm.originalPrice}
                      onChange={e => setSettingsForm({ ...settingsForm, originalPrice: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Crossed-out anchor price.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Support Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.supportPhone}
                      onChange={e => setSettingsForm({ ...settingsForm, supportPhone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      WhatsApp Clean Digits (with country code)
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsappNumber}
                      onChange={e => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">e.g. 916355776735 for wa.me links.</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Top Announcement Ribbon Text
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.activePromoText}
                    onChange={e => setSettingsForm({ ...settingsForm, activePromoText: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Global Settings to Firestore</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: DEMO PRODUCTS CATALOG */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                    ShopKart Demo Catalog
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage items that prospective clients test in the interactive demo store.
                  </p>
                </div>

                <button
                  onClick={() => setEditingProduct({
                    id: 'prod-' + Date.now(),
                    name: '',
                    category: 'Electronics',
                    price: 999,
                    originalPrice: 1999,
                    rating: 4.8,
                    reviewsCount: 12,
                    image: '',
                    description: '',
                    badge: ''
                  })}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Demo Product</span>
                </button>
              </div>

              {/* Product Edit Modal */}
              {editingProduct && (
                <div className="bg-slate-900 border border-orange-500/50 rounded-2xl p-6 shadow-xl space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400">
                    {editingProduct.id.includes('prod-') ? 'Edit Demo Product' : 'Add New Product'}
                  </h3>

                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Product Title</label>
                        <input
                          type="text"
                          required
                          value={editingProduct.name}
                          onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Category</label>
                        <select
                          value={editingProduct.category}
                          onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                        >
                          <option value="Electronics">Electronics</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Home & Living">Home & Living</option>
                          <option value="Beauty">Beauty</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Sale Price (₹)</label>
                        <input
                          type="number"
                          required
                          value={editingProduct.price}
                          onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Regular Price (₹)</label>
                        <input
                          type="number"
                          required
                          value={editingProduct.originalPrice}
                          onChange={e => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Badge (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. Best Seller"
                          value={editingProduct.badge || ''}
                          onChange={e => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Image URL / Path</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.image}
                        onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Short Description</label>
                      <textarea
                        rows={2}
                        required
                        value={editingProduct.description}
                        onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold"
                      >
                        Save Product
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {demoProducts.map(prod => (
                  <div key={prod.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono uppercase">
                          {prod.category}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="text-xs text-slate-400 hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteDemoProduct(prod.id)}
                            className="text-xs text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-white">{prod.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prod.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                      <span className="font-mono font-bold text-orange-400">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-500 line-through">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DELIVERABLES */}
          {activeTab === 'deliverables' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                  The 9 Included Package Deliverables
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Core specifications directly from the flyer poster.
                </p>
              </div>

              <div className="space-y-4">
                {packageDeliverables.map((item, idx) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-orange-400">0{idx + 1}</span>
                        <h4 className="font-bold text-sm text-white">{item.title}</h4>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          {item.highlight}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>

                    <button
                      onClick={() => updatePackageDeliverable(item)}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium shrink-0"
                    >
                      Sync to Firestore
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                  Frequently Asked Questions
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage answers to common client objections (hosting, ownership, delivery).
                </p>
              </div>

              {/* New FAQ Form */}
              <form onSubmit={handleAddFaq} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">Add New FAQ</h3>
                <input
                  type="text"
                  placeholder="Question..."
                  required
                  value={newFaq.question}
                  onChange={e => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Answer..."
                  required
                  value={newFaq.answer}
                  onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold"
                >
                  Publish FAQ
                </button>
              </form>

              {/* FAQs list */}
              <div className="space-y-3">
                {faqs.map((f, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs sm:text-sm text-white">{f.question}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{f.answer}</p>
                    </div>
                    <button
                      onClick={() => deleteFaq(f.question.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30))}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
