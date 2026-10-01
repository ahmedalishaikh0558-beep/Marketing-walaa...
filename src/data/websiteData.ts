import { PackageFeature, DemoProduct, Testimonial, FaqItem } from '../types';

import heroImg from '../assets/images/hero_ecommerce_setup_1790874256707.jpg';
import productAudioImg from '../assets/images/shopkart_lifestyle_product_1790874270210.jpg';
import productFashionImg from '../assets/images/shopkart_fashion_product_1790874281450.jpg';

export const ASSETS = {
  hero: heroImg,
  productAudio: productAudioImg,
  productFashion: productFashionImg,
};

export const CONTACT_INFO = {
  phone: '+91 6355776735',
  phoneClean: '916355776735',
  email: 'contact@marketingwalaa.com',
  website: 'marketingwalaa.com',
  socialHandle: 'Marketingwalaa',
  instagram: 'https://instagram.com/Marketingwalaa',
  facebook: 'https://facebook.com/Marketingwalaa',
  youtube: 'https://youtube.com/@Marketingwalaa',
  linkedin: 'https://linkedin.com/company/Marketingwalaa',
  address: 'Marketingwalaa Digital Solutions, Ahmedabad / Surat, Gujarat, India',
};

// The 9 core features listed on the flyer
export const PACKAGE_INCLUSIONS: PackageFeature[] = [
  {
    id: 'free-domain',
    title: 'FREE DOMAIN • 1 YEAR',
    highlight: '.com or .in included',
    description: 'Get your brand name registered with top-level extension (.com, .in, .store, .shop) with full DNS ownership.',
    details: [
      'Official domain registration for 1 full year',
      'Free Whois Privacy protection included',
      '100% full ownership credentials handed over',
      'Custom branded business email (info@yourbrand.com)'
    ]
  },
  {
    id: 'free-hosting',
    title: 'FREE HOSTING • 1 YEAR',
    highlight: 'Ultra-fast NVMe Cloud Server',
    description: 'Blazing fast, secure cloud hosting tuned specifically for WooCommerce speed with 99.9% uptime and free SSL.',
    details: [
      'LiteSpeed Web Server with NVMe SSD storage',
      'Free Lifetime Let\'s Encrypt SSL certificate',
      'Automated daily off-site backups',
      'Unlimited bandwidth & unmetered traffic headroom'
    ]
  },
  {
    id: 'woocommerce-store',
    title: 'WOOCOMMERCE STORE',
    highlight: 'Zero Commission, 100% Ownership',
    description: 'Modern, high-converting e-commerce storefront customized for your niche with unlimited products and zero monthly rent.',
    details: [
      'Clean modern UI tailored to your product category',
      'Unlimited product catalog, inventory & variations',
      'Discount coupons, promotional banners & flash sales',
      'Zero 2% transaction commission (Keep 100% profits)'
    ]
  },
  {
    id: 'payment-gateway',
    title: 'PAYMENT GATEWAY',
    highlight: 'Razorpay, Cashfree & UPI',
    description: 'Seamless Indian & international checkout supporting Google Pay, PhonePe, Paytm, Credit/Debit cards, Netbanking & COD.',
    details: [
      'Instant UPI payment QR code & deep links',
      'Razorpay / Cashfree / PhonePe integration',
      'Cash on Delivery (COD) with OTP verification',
      'Direct next-day settlements into your bank account'
    ]
  },
  {
    id: 'shipping-integration',
    title: 'SHIPPING INTEGRATION',
    highlight: 'Shiprocket & Delhivery Auto-Sync',
    description: 'Automate order dispatch, automated shipping label generation, pickup scheduling, and real-time package tracking.',
    details: [
      'Automated Shiprocket / Delhivery API sync',
      'Automated shipping rate calculation at checkout',
      'One-click shipping label & invoice generation',
      'Live parcel tracking links sent to customer'
    ]
  },
  {
    id: 'app-integration',
    title: 'APP INTEGRATION',
    highlight: 'PWA Mobile App Ready',
    description: 'Progressive Web App technology allows your buyers to install your store straight onto their Android or iOS home screens.',
    details: [
      'Add-to-home-screen install prompt for customers',
      'App-like full screen mobile shopping experience',
      'Fast loading even on spotty 4G/3G connections',
      'Push notification capabilities ready'
    ]
  },
  {
    id: 'whatsapp-integration',
    title: 'WHATSAPP INTEGRATION',
    highlight: 'Automated Order Alerts & Chat',
    description: 'Boost trust and conversions with instant WhatsApp order confirmations, live chat support button, and abandoned cart alerts.',
    details: [
      'Floating WhatsApp chat widget on every page',
      '"Buy on WhatsApp" button for quick customer closing',
      'Automated order confirmation alert sent to WhatsApp',
      'Abandoned checkout reminder automation'
    ]
  },
  {
    id: 'mobile-responsive',
    title: 'MOBILE RESPONSIVE',
    highlight: 'Tailored for Indian Shoppers',
    description: 'Over 85% of online purchases in India happen on mobile. We ensure thumb-friendly navigation, quick load times, and fluid UX.',
    details: [
      'Sub-2 second load speed on mobile devices',
      'Sticky Add to Cart & quick buy buttons',
      'Bottom navigation bar for one-hand browsing',
      'Tested across 20+ mobile screen dimensions'
    ]
  },
  {
    id: 'one-year-support',
    title: '1 YEAR SUPPORT',
    highlight: 'Dedicated Tech Helpdesk',
    description: 'You focus on selling; we handle the technical maintenance, security updates, bug fixes, and continuous peace of mind.',
    details: [
      'Direct WhatsApp & phone technical support',
      'Plugin updates & core WordPress maintenance',
      'Step-by-step video training on how to add products',
      'Emergency site recovery and security monitoring'
    ]
  }
];

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: 'prod-1',
    name: 'ShopKart Pro Wireless Noise-Cancelling Headphones',
    category: 'Electronics',
    price: 3499,
    originalPrice: 5999,
    rating: 4.8,
    reviewsCount: 142,
    image: productAudioImg,
    badge: 'Best Seller',
    description: 'Engineered for pristine acoustic clarity with 40-hour playback and rapid USB-C fast charging.'
  },
  {
    id: 'prod-2',
    name: 'Apex AMOLED Smartwatch with Bluetooth Calling',
    category: 'Electronics',
    price: 2299,
    originalPrice: 4499,
    rating: 4.7,
    reviewsCount: 98,
    image: productAudioImg,
    badge: 'Trending',
    description: 'Vibrant 1.96-inch curved AMOLED display, 120+ sports modes, and real-time heart rate & SpO2 tracking.'
  },
  {
    id: 'prod-3',
    name: 'Minimalist Urban Aeroknit Sneakers',
    category: 'Fashion',
    price: 1899,
    originalPrice: 3299,
    rating: 4.9,
    reviewsCount: 215,
    image: productFashionImg,
    badge: 'New Arrival',
    description: 'Feather-light breathable mesh construction with responsive cushioning for everyday active wear.'
  },
  {
    id: 'prod-4',
    name: 'Handcrafted Caramel Vegan Leather Tote Bag',
    category: 'Fashion',
    price: 1499,
    originalPrice: 2899,
    rating: 4.8,
    reviewsCount: 84,
    image: productFashionImg,
    description: 'Structured everyday carry tote crafted with water-resistant vegan leather and padded laptop sleeve.'
  },
  {
    id: 'prod-5',
    name: 'Nordic Minimalist Ceramic Accent Vase Set',
    category: 'Home & Living',
    price: 1299,
    originalPrice: 1999,
    rating: 4.6,
    reviewsCount: 63,
    image: productAudioImg,
    description: 'Hand-finished matte ceramic vases designed to elevate contemporary living rooms and dining tables.'
  },
  {
    id: 'prod-6',
    name: 'Botanical Organic Glow Vitamin C Radiance Serum',
    category: 'Beauty',
    price: 899,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 310,
    image: productFashionImg,
    badge: 'Top Rated',
    description: 'Pure 15% Ethyl Ascorbic Acid enriched with hyaluronic acid for visible glow and dark-spot reduction.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rajesh Patel',
    role: 'Founder',
    business: 'KutchCraft Handlooms',
    city: 'Ahmedabad, Gujarat',
    quote: 'Marketingwalaa delivered our complete website in just 4 days. The Razorpay UPI checkout and automated Shiprocket labels saved us 3 hours every day. ₹10,999 is an absolute steal for this quality.',
    metric: '₹2.8L',
    metricLabel: 'First Month Online Sales'
  },
  {
    name: 'Pooja Sharma',
    role: 'Co-Founder',
    business: 'VedicBliss Organics',
    city: 'Jaipur, Rajasthan',
    quote: 'We were paying Shopify almost ₹4,500 every month plus transaction fees. Switching to Marketingwalaa WooCommerce gave us 100% store control and WhatsApp order alerts that customers love.',
    metric: '+180%',
    metricLabel: 'Checkout Completion Rate'
  },
  {
    name: 'Arjun Nambiar',
    role: 'Managing Partner',
    business: 'VoltStreet Accessories',
    city: 'Bengaluru, Karnataka',
    quote: 'The team set up our payment gateway, domain, and mobile-responsive layout without any hassle. Whenever we need assistance, their WhatsApp support team replies in minutes.',
    metric: '4 Days',
    metricLabel: 'From Booking to First Order'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'Is ₹10,999 really a one-time price or are there hidden monthly charges?',
    answer: 'There are ZERO hidden monthly platform charges! Unlike Shopify which charges ₹2,500 - ₹7,000 every single month plus a 2% cut on every sale, your Marketingwalaa WooCommerce store belongs 100% to you. Domain and Cloud Hosting are completely FREE for your first year.'
  },
  {
    question: 'How long will it take for my e-commerce website to go live?',
    answer: 'Typically 3 to 5 business days! Once you share your brand name, preferred domain name, and initial product catalog/photos, our team builds the layout, tests payments, connects shipping, and hands over a fully working store.'
  },
  {
    question: 'Do I get 100% ownership of my domain and website files?',
    answer: 'Yes, absolutely. You receive full administrative access to your WordPress admin panel, cPanel/Hosting, and domain registrar credentials. You are not locked into any proprietary platform.'
  },
  {
    question: 'How do customers pay me, and when do funds hit my bank account?',
    answer: 'We configure verified Indian payment gateways such as Razorpay, Cashfree, or PhonePe PG. Customers can pay via GPay, PhonePe, Paytm UPI, Credit/Debit cards, and Netbanking. Payments settle directly into your linked bank account (T+1 or T+2 settlement cycle).'
  },
  {
    question: 'Can I add unlimited products and manage orders myself after launch?',
    answer: 'Yes! WooCommerce has no limit on the number of products you can list. We provide recorded step-by-step Hindi/English video tutorials showing how to add products, adjust prices, create discount coupons, and print shipping labels.'
  },
  {
    question: 'What happens after the 1 year of free hosting and domain expires?',
    answer: 'After 1 year, you only pay the standard nominal hosting and domain renewal fee (typically around ₹3,000 to ₹4,000 per year for high-speed cloud hosting and .com/.in domain combined). There is never any monthly commission.'
  }
];

export const COMPARISON_DATA = [
  {
    feature: 'Setup Cost',
    marketingwalaa: '₹10,999 (Limited Time Offer)',
    shopify: 'Free trial then ₹2,500 - ₹7,500/mo',
    customAgency: '₹35,000 - ₹75,000 upfront'
  },
  {
    feature: 'Annual Platform Commission',
    marketingwalaa: '0% (Keep 100% of revenue)',
    shopify: 'Up to 2.0% on every order',
    customAgency: '0%'
  },
  {
    feature: 'Free Domain (.com / .in)',
    marketingwalaa: 'Included Free for 1 Year',
    shopify: 'Extra ₹1,200 - ₹2,000/yr',
    customAgency: 'Billed separately'
  },
  {
    feature: 'Free Cloud Hosting',
    marketingwalaa: 'Included Free for 1 Year (NVMe)',
    shopify: 'Bundled with monthly rent',
    customAgency: 'Extra ₹5,000 - ₹12,000/yr'
  },
  {
    feature: 'Indian Payment Gateways (UPI, Cards)',
    marketingwalaa: 'Pre-Integrated & Configured',
    shopify: 'Plugin apps required',
    customAgency: 'Additional integration fee'
  },
  {
    feature: 'Shiprocket / Delhivery Courier API',
    marketingwalaa: 'Included & Tested',
    shopify: 'Requires paid third-party apps',
    customAgency: 'Extra developer hours'
  },
  {
    feature: 'WhatsApp Order Notifications & Chat',
    marketingwalaa: 'Pre-Built Integration',
    shopify: '$15 - $29/month app subscription',
    customAgency: 'Extra addon fee'
  },
  {
    feature: '1 Year Dedicated Technical Support',
    marketingwalaa: 'Included with direct WhatsApp helpline',
    shopify: 'Community forum / generic ticket',
    customAgency: 'Paid retainer AMC (₹15,000+/yr)'
  }
];
