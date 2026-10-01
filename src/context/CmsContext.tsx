import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  PACKAGE_INCLUSIONS, 
  DEMO_PRODUCTS, 
  FAQS, 
  CONTACT_INFO 
} from '../data/websiteData';
import { PackageFeature, DemoProduct, FaqItem, LeadInquiry } from '../types';

export interface SiteSettingsData {
  brandName: string;
  tagline: string;
  currentOfferPrice: number;
  originalPrice: number;
  supportPhone: string;
  whatsappNumber: string;
  officialEmail: string;
  activePromoText: string;
  updatedAt?: string;
}

export interface LeadRecord extends LeadInquiry {
  id: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Closed' | 'Archived';
}

interface CmsContextType {
  siteSettings: SiteSettingsData;
  packageDeliverables: PackageFeature[];
  demoProducts: DemoProduct[];
  faqs: FaqItem[];
  leads: LeadRecord[];
  currentUser: User | null;
  isAdmin: boolean;
  isAuthLoading: boolean;
  isDataLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateSiteSettings: (settings: SiteSettingsData) => Promise<void>;
  updatePackageDeliverable: (item: PackageFeature) => Promise<void>;
  saveDemoProduct: (product: DemoProduct) => Promise<void>;
  deleteDemoProduct: (productId: string) => Promise<void>;
  saveFaq: (faq: FaqItem) => Promise<void>;
  deleteFaq: (faqId: string) => Promise<void>;
  submitInquiry: (lead: Omit<LeadRecord, 'id' | 'createdAt' | 'status'>) => Promise<string>;
  updateLeadStatus: (leadId: string, status: 'New' | 'Contacted' | 'Closed' | 'Archived') => Promise<void>;
  seedInitialDataToFirestore: () => Promise<void>;
}

const defaultSettings: SiteSettingsData = {
  brandName: 'Marketingwalaa',
  tagline: 'Best Place for Marketing Solutions',
  currentOfferPrice: 10999,
  originalPrice: 19999,
  supportPhone: CONTACT_INFO.phone,
  whatsappNumber: CONTACT_INFO.phoneClean,
  officialEmail: CONTACT_INFO.email,
  activePromoText: 'LIMITED TIME FESTIVE OFFER: Turnkey WooCommerce E-Commerce Store at ₹10,999 (Regular ₹19,999) · Instant Delivery in 3-5 Days',
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>(defaultSettings);
  const [packageDeliverables, setPackageDeliverables] = useState<PackageFeature[]>(PACKAGE_INCLUSIONS);
  const [demoProducts, setDemoProducts] = useState<DemoProduct[]>(DEMO_PRODUCTS);
  const [faqs, setFaqs] = useState<FaqItem[]>(FAQS);
  const [leads, setLeads] = useState<LeadRecord[]>([]);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  // Monitor auth status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Check bootstrapped email or admin document
        const isBootstrapped = user.email === 'amrinkhn2@gmail.com';
        if (isBootstrapped) {
          setIsAdmin(true);
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', user.uid));
            setIsAdmin(adminDoc.exists());
          } catch {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to public collections
  useEffect(() => {
    // 1. Site Settings
    const unsubSettings = onSnapshot(doc(db, 'siteSettings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setSiteSettings(docSnap.data() as SiteSettingsData);
      }
    }, (error) => {
      console.warn("Using local settings fallback:", error.message);
    });

    // 2. Deliverables
    const unsubDeliverables = onSnapshot(collection(db, 'packageDeliverables'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => d.data() as PackageFeature);
        setPackageDeliverables(items);
      }
    }, (error) => {
      console.warn("Using local deliverables fallback:", error.message);
    });

    // 3. Demo Products
    const unsubProducts = onSnapshot(collection(db, 'demoProducts'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => d.data() as DemoProduct);
        setDemoProducts(items);
      }
    }, (error) => {
      console.warn("Using local demo products fallback:", error.message);
    });

    // 4. FAQs
    const unsubFaqs = onSnapshot(collection(db, 'faqs'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => d.data() as FaqItem);
        setFaqs(items);
      }
      setIsDataLoading(false);
    }, (error) => {
      console.warn("Using local FAQs fallback:", error.message);
      setIsDataLoading(false);
    });

    return () => {
      unsubSettings();
      unsubDeliverables();
      unsubProducts();
      unsubFaqs();
    };
  }, []);

  // Subscribe to leads if user is admin
  useEffect(() => {
    if (!isAdmin) {
      setLeads([]);
      return;
    }

    const unsubLeads = onSnapshot(collection(db, 'leads'), (snapshot) => {
      const items = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      } as LeadRecord));
      setLeads(items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'leads');
    });

    return () => unsubLeads();
  }, [isAdmin]);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const updateSiteSettings = async (newSettings: SiteSettingsData) => {
    const path = 'siteSettings/global';
    try {
      await setDoc(doc(db, 'siteSettings', 'global'), {
        ...newSettings,
        updatedAt: new Date().toISOString()
      });
      setSiteSettings(newSettings);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const updatePackageDeliverable = async (item: PackageFeature) => {
    const path = `packageDeliverables/${item.id}`;
    try {
      await setDoc(doc(db, 'packageDeliverables', item.id), {
        ...item,
        isActive: true,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const saveDemoProduct = async (product: DemoProduct) => {
    const path = `demoProducts/${product.id}`;
    try {
      await setDoc(doc(db, 'demoProducts', product.id), {
        ...product,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const deleteDemoProduct = async (productId: string) => {
    const path = `demoProducts/${productId}`;
    try {
      await deleteDoc(doc(db, 'demoProducts', productId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const saveFaq = async (faq: FaqItem) => {
    const id = faq.question.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40) || 'faq-' + Date.now();
    const path = `faqs/${id}`;
    try {
      await setDoc(doc(db, 'faqs', id), {
        ...faq,
        id,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const deleteFaq = async (faqId: string) => {
    const path = `faqs/${faqId}`;
    try {
      await deleteDoc(doc(db, 'faqs', faqId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const submitInquiry = async (leadData: Omit<LeadRecord, 'id' | 'createdAt' | 'status'>) => {
    const leadId = 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    const path = `leads/${leadId}`;
    const newRecord: LeadRecord = {
      ...leadData,
      id: leadId,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'leads', leadId), newRecord);
      return leadId;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      return leadId;
    }
  };

  const updateLeadStatus = async (leadId: string, status: 'New' | 'Contacted' | 'Closed' | 'Archived') => {
    const path = `leads/${leadId}`;
    try {
      await updateDoc(doc(db, 'leads', leadId), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const seedInitialDataToFirestore = async () => {
    try {
      // 1. Seed Site Settings
      await setDoc(doc(db, 'siteSettings', 'global'), {
        ...defaultSettings,
        updatedAt: new Date().toISOString()
      });

      // 2. Seed 9 Deliverables
      for (const item of PACKAGE_INCLUSIONS) {
        await setDoc(doc(db, 'packageDeliverables', item.id), {
          ...item,
          isActive: true,
          updatedAt: new Date().toISOString()
        });
      }

      // 3. Seed Demo Products
      for (const prod of DEMO_PRODUCTS) {
        await setDoc(doc(db, 'demoProducts', prod.id), {
          ...prod,
          updatedAt: new Date().toISOString()
        });
      }

      // 4. Seed FAQs
      for (const faq of FAQS) {
        const faqId = faq.question.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30) || 'faq-' + Date.now();
        await setDoc(doc(db, 'faqs', faqId), {
          ...faq,
          id: faqId,
          updatedAt: new Date().toISOString()
        });
      }

      console.log("Firestore successfully populated with initial seed data.");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  };

  return (
    <CmsContext.Provider
      value={{
        siteSettings,
        packageDeliverables,
        demoProducts,
        faqs,
        leads,
        currentUser,
        isAdmin,
        isAuthLoading,
        isDataLoading,
        loginWithGoogle,
        logout,
        updateSiteSettings,
        updatePackageDeliverable,
        saveDemoProduct,
        deleteDemoProduct,
        saveFaq,
        deleteFaq,
        submitInquiry,
        updateLeadStatus,
        seedInitialDataToFirestore,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
