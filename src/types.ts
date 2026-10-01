export interface Product {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  additionalImages?: string[];
  shortDescription: string;
  fullDescription: string;
  price?: number;
  originalPrice?: number;
  currency: string;
  categoryId: string;
  amazonAffiliateUrl: string;
  featured: boolean;
  status: 'active' | 'inactive';
  clickCount: number;
  createdAt: string;
  updatedAt: string;
  lastClicked?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  displayOrder: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface AffiliateClick {
  id: string;
  productId: string;
  productName: string;
  affiliateUrl: string;
  clickedAt: string;
  sessionId?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface SiteSettings {
  id?: string;
  brandName: string;
  logoUrl?: string;
  websiteDescription: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
  seoTitle: string;
  seoDescription: string;
  amazonAffiliateTag: string;
  currency: string;
  updatedAt: string;
}

export interface CartItem {
  product: any;
  quantity: number;
}

export interface AdminAuthSession {
  isAuthenticated: boolean;
  username: string;
  loginTime: string;
}

// Backwards-compatibility definitions
export interface PackageFeature {
  id: string;
  title: string;
  highlight: string;
  description: string;
  badge?: string;
  details: string[];
}

export interface DemoProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  description: string;
}

export interface LeadInquiry {
  fullName: string;
  phone: string;
  businessName: string;
  category: string;
  preferredDomain: string;
  currentStatus?: string;
  message?: string;
  plan: string;
}

export interface Testimonial {
  name: string;
  role: string;
  business: string;
  city: string;
  quote: string;
  metric: string;
  metricLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
