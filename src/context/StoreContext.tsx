import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  Product,
  Category,
  HeroSlide,
  SiteSettings,
  ContactMessage,
  AffiliateClick,
  CartItem,
  AdminAuthSession,
} from '../types';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_CATEGORIES,
  DEFAULT_HERO_SLIDES,
  DEFAULT_PRODUCTS,
} from '../data/initialData';

interface StoreContextType {
  // Public data
  products: Product[];
  categories: Category[];
  heroSlides: HeroSlide[];
  siteSettings: SiteSettings;
  loading: boolean;

  // Cart / Saved List
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartEstimatedTotal: number;

  // Affiliate Click Action
  recordAffiliateClick: (product: Product) => Promise<string>;

  // Contact Form
  submitContactMessage: (msg: { name: string; email: string; phone: string; message: string }) => Promise<void>;

  // Admin Data & Management
  adminSession: AdminAuthSession | null;
  adminLogin: (username: string, pass: string) => Promise<boolean>;
  adminLogout: () => void;
  contactMessages: ContactMessage[];
  affiliateClicks: AffiliateClick[];
  markMessageRead: (id: string, isRead: boolean) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  // Content CRUD
  saveProduct: (product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  duplicateProduct: (id: string) => Promise<void>;
  saveCategory: (category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<{ success: boolean; message?: string }>;
  saveHeroSlide: (slide: Partial<HeroSlide>) => Promise<void>;
  deleteHeroSlide: (id: string) => Promise<void>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  updateAdminPassword: (newPass: string) => Promise<void>;
  seedDefaultsToFirestore: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | null>(null);

const CART_STORAGE_KEY = 'trendvault_saved_cart_v1';
const ADMIN_SESSION_KEY = 'trendvault_admin_session_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [affiliateClicks, setAffiliateClicks] = useState<AffiliateClick[]>([]);
  const [loading, setLoading] = useState(true);

  // Cart / Saved List State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Admin Session State
  const [adminSession, setAdminSession] = useState<AdminAuthSession | null>(() => {
    try {
      const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Failed to persist cart:", e);
    }
  }, [cartItems]);

  // Firestore Subscriptions
  useEffect(() => {
    // 1. Subscribe to Site Settings
    const unsubSettings = onSnapshot(doc(db, 'site_settings', 'global'), (snap) => {
      if (snap.exists()) {
        setSiteSettings(snap.data() as SiteSettings);
      }
    }, (err) => console.log('Firestore settings stream note:', err.message));

    // 2. Subscribe to Products
    const unsubProducts = onSnapshot(collection(db, 'products'), (snap) => {
      if (!snap.empty) {
        const prods = snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
        setProducts(prods);
      }
      setLoading(false);
    }, (err) => {
      console.log('Firestore products stream note:', err.message);
      setLoading(false);
    });

    // 3. Subscribe to Categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snap) => {
      if (!snap.empty) {
        const cats = snap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
        setCategories(cats);
      }
    }, (err) => console.log('Firestore categories stream note:', err.message));

    // 4. Subscribe to Hero Slides
    const unsubSlides = onSnapshot(collection(db, 'hero_slides'), (snap) => {
      if (!snap.empty) {
        const slides = snap.docs.map(d => ({ id: d.id, ...d.data() } as HeroSlide));
        slides.sort((a, b) => a.displayOrder - b.displayOrder);
        setHeroSlides(slides);
      }
    }, (err) => console.log('Firestore slides stream note:', err.message));

    // 5. Subscribe to Contact Messages
    const unsubMessages = onSnapshot(collection(db, 'contact_messages'), (snap) => {
      if (!snap.empty) {
        const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage));
        msgs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setContactMessages(msgs);
      }
    }, (err) => console.log('Firestore messages stream note:', err.message));

    // 6. Subscribe to Affiliate Clicks
    const unsubClicks = onSnapshot(collection(db, 'affiliate_clicks'), (snap) => {
      if (!snap.empty) {
        const clicks = snap.docs.map(d => ({ id: d.id, ...d.data() } as AffiliateClick));
        clicks.sort((a, b) => new Date(b.clickedAt).getTime() - new Date(a.clickedAt).getTime());
        setAffiliateClicks(clicks);
      }
    }, (err) => console.log('Firestore clicks stream note:', err.message));

    return () => {
      unsubSettings();
      unsubProducts();
      unsubCategories();
      unsubSlides();
      unsubMessages();
      unsubClicks();
    };
  }, []);

  // Cart Operations
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartEstimatedTotal = cartItems.reduce(
    (acc, item) => acc + (item.product.price || 0) * item.quantity,
    0
  );

  // Click Tracking Action
  const recordAffiliateClick = async (product: Product): Promise<string> => {
    const timestamp = new Date().toISOString();
    const sessionId = 'sess_' + Math.random().toString(36).substring(2, 10);

    // Build finalized affiliate URL ensuring the affiliate tag is included
    let finalUrl = product.amazonAffiliateUrl;
    if (siteSettings.amazonAffiliateTag && !finalUrl.includes('tag=')) {
      const separator = finalUrl.includes('?') ? '&' : '?';
      finalUrl = `${finalUrl}${separator}tag=${encodeURIComponent(siteSettings.amazonAffiliateTag)}`;
    }

    try {
      // 1. Record click in affiliate_clicks collection
      await addDoc(collection(db, 'affiliate_clicks'), {
        productId: product.id,
        productName: product.name,
        affiliateUrl: finalUrl,
        clickedAt: timestamp,
        sessionId,
      });

      // 2. Increment clickCount and update lastClicked on product
      const productRef = doc(db, 'products', product.id);
      await updateDoc(productRef, {
        clickCount: increment(1),
        lastClicked: timestamp,
        updatedAt: timestamp,
      });
    } catch (err) {
      console.warn("Click tracking locally handled:", err);
      // Optimistic local update
      setProducts(prev =>
        prev.map(p => p.id === product.id ? { ...p, clickCount: (p.clickCount || 0) + 1, lastClicked: timestamp } : p)
      );
    }

    return finalUrl;
  };

  // Submit Contact Form
  const submitContactMessage = async (msg: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    const newMsg: Omit<ContactMessage, 'id'> = {
      ...msg,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    await addDoc(collection(db, 'contact_messages'), newMsg);
  };

  // Admin Auth
  const adminLogin = async (username: string, pass: string): Promise<boolean> => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Check custom credentials from localStorage/session or default
    const storedPass = localStorage.getItem('trendvault_admin_pwd') || 'password123';
    const storedUser = localStorage.getItem('trendvault_admin_user') || 'admin';

    if (cleanUser === storedUser && cleanPass === storedPass) {
      const session: AdminAuthSession = {
        isAuthenticated: true,
        username: storedUser,
        loginTime: new Date().toISOString(),
      };
      setAdminSession(session);
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdminSession(null);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  };

  const updateAdminPassword = async (newPass: string) => {
    localStorage.setItem('trendvault_admin_pwd', newPass);
  };

  // Content Operations
  const saveProduct = async (productData: Partial<Product>) => {
    const id = productData.id || 'prod-' + Date.now();
    const now = new Date().toISOString();
    const fullProd: Product = {
      id,
      name: productData.name || 'Untitled Product',
      slug: productData.slug || (productData.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      imageUrl: productData.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      additionalImages: productData.additionalImages || [],
      shortDescription: productData.shortDescription || '',
      fullDescription: productData.fullDescription || '',
      price: productData.price,
      originalPrice: productData.originalPrice,
      currency: productData.currency || siteSettings.currency || '$',
      categoryId: productData.categoryId || (categories[0]?.id || 'cat-electronics'),
      amazonAffiliateUrl: productData.amazonAffiliateUrl || 'https://amazon.com',
      featured: productData.featured ?? false,
      status: productData.status || 'active',
      clickCount: productData.clickCount || 0,
      createdAt: productData.createdAt || now,
      updatedAt: now,
    };

    await setDoc(doc(db, 'products', id), fullProd, { merge: true });
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = fullProd;
        return next;
      }
      return [fullProd, ...prev];
    });
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts(prev => prev.filter(p => p.id !== id));
    removeFromCart(id);
  };

  const duplicateProduct = async (id: string) => {
    const target = products.find(p => p.id === id);
    if (!target) return;

    const newId = 'prod-' + Date.now();
    const clone: Product = {
      ...target,
      id: newId,
      name: `[Copy] ${target.name}`,
      slug: `${target.slug}-copy-${Date.now().toString().slice(-4)}`,
      clickCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'products', newId), clone);
    setProducts(prev => [clone, ...prev]);
  };

  const saveCategory = async (catData: Partial<Category>) => {
    const id = catData.id || 'cat-' + Date.now();
    const now = new Date().toISOString();
    const fullCat: Category = {
      id,
      name: catData.name || 'New Category',
      slug: catData.slug || (catData.name || 'category').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      imageUrl: catData.imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      description: catData.description || '',
      status: catData.status || 'active',
      createdAt: catData.createdAt || now,
      updatedAt: now,
    };

    await setDoc(doc(db, 'categories', id), fullCat, { merge: true });
    setCategories(prev => {
      const idx = prev.findIndex(c => c.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = fullCat;
        return next;
      }
      return [...prev, fullCat];
    });
  };

  const deleteCategory = async (id: string): Promise<{ success: boolean; message?: string }> => {
    const assignedProducts = products.filter(p => p.categoryId === id);
    if (assignedProducts.length > 0) {
      return {
        success: false,
        message: `Cannot delete: ${assignedProducts.length} product(s) are currently assigned to this category. Please reassign them first.`,
      };
    }
    await deleteDoc(doc(db, 'categories', id));
    setCategories(prev => prev.filter(c => c.id !== id));
    return { success: true };
  };

  const saveHeroSlide = async (slideData: Partial<HeroSlide>) => {
    const id = slideData.id || 'slide-' + Date.now();
    const now = new Date().toISOString();
    const fullSlide: HeroSlide = {
      id,
      imageUrl: slideData.imageUrl || 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1920&q=80',
      title: slideData.title || 'Discover Trending Products',
      description: slideData.description || 'Explore our verified collection of top-rated deals.',
      ctaText: slideData.ctaText || 'Shop Now',
      ctaUrl: slideData.ctaUrl || '#shop',
      displayOrder: slideData.displayOrder ?? (heroSlides.length + 1),
      status: slideData.status || 'active',
      createdAt: slideData.createdAt || now,
      updatedAt: now,
    };

    await setDoc(doc(db, 'hero_slides', id), fullSlide, { merge: true });
    setHeroSlides(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = fullSlide;
        return next.sort((a, b) => a.displayOrder - b.displayOrder);
      }
      return [...prev, fullSlide].sort((a, b) => a.displayOrder - b.displayOrder);
    });
  };

  const deleteHeroSlide = async (id: string) => {
    await deleteDoc(doc(db, 'hero_slides', id));
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  const updateSiteSettings = async (settingsData: Partial<SiteSettings>) => {
    const updated = {
      ...siteSettings,
      ...settingsData,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'site_settings', 'global'), updated, { merge: true });
    setSiteSettings(updated);
  };

  const markMessageRead = async (id: string, isRead: boolean) => {
    await updateDoc(doc(db, 'contact_messages', id), { isRead });
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, isRead } : m));
  };

  const deleteMessage = async (id: string) => {
    await deleteDoc(doc(db, 'contact_messages', id));
    setContactMessages(prev => prev.filter(m => m.id !== id));
  };

  const seedDefaultsToFirestore = async () => {
    // 1. Settings
    await setDoc(doc(db, 'site_settings', 'global'), DEFAULT_SITE_SETTINGS, { merge: true });
    setSiteSettings(DEFAULT_SITE_SETTINGS);

    // 2. Categories
    for (const cat of DEFAULT_CATEGORIES) {
      await setDoc(doc(db, 'categories', cat.id), cat, { merge: true });
    }
    setCategories(DEFAULT_CATEGORIES);

    // 3. Hero Slides
    for (const slide of DEFAULT_HERO_SLIDES) {
      await setDoc(doc(db, 'hero_slides', slide.id), slide, { merge: true });
    }
    setHeroSlides(DEFAULT_HERO_SLIDES);

    // 4. Products
    for (const prod of DEFAULT_PRODUCTS) {
      await setDoc(doc(db, 'products', prod.id), prod, { merge: true });
    }
    setProducts(DEFAULT_PRODUCTS);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        heroSlides,
        siteSettings,
        loading,

        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartEstimatedTotal,

        recordAffiliateClick,
        submitContactMessage,

        adminSession,
        adminLogin,
        adminLogout,
        contactMessages,
        affiliateClicks,
        markMessageRead,
        deleteMessage,

        saveProduct,
        deleteProduct,
        duplicateProduct,
        saveCategory,
        deleteCategory,
        saveHeroSlide,
        deleteHeroSlide,
        updateSiteSettings,
        updateAdminPassword,
        seedDefaultsToFirestore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
