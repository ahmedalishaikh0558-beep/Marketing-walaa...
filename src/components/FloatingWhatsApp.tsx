import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const FloatingWhatsApp: React.FC = () => {
  const { siteSettings } = useCms();

  return (
    <motion.div
      initial={{ opacity: 0, x: 70, y: 70, scale: 0.85 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 22,
        delay: 0.7,
      }}
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end group"
    >
      {/* Hover Tooltip */}
      <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 pointer-events-none mb-2 bg-slate-900 text-white text-xs font-medium py-1.5 px-3.5 rounded-xl shadow-xl border border-slate-800 flex items-center gap-2 whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span>Get a response in minutes</span>
        <div className="absolute -bottom-1 right-8 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-slate-800" />
      </div>

      <a
        href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hi%20Marketingwalaa%2C%20I%20am%20interested%20in%20the%20WooCommerce%20E-Commerce%20Website%20Package%20for%20%E2%82%B9${siteSettings.currentOfferPrice}.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Marketingwalaa on WhatsApp - Get a response in minutes"
        title="Get a response in minutes"
        className="relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white pl-4 pr-5 py-3 rounded-full shadow-xl shadow-emerald-900/30 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
      >
        {/* Smooth, gradual ambient pulse aura around the button */}
        <motion.span
          aria-hidden="true"
          animate={{
            scale: [1, 1.08, 1.14],
            opacity: [0.4, 0.18, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 rounded-full bg-emerald-400 pointer-events-none -z-10"
        />

        {/* Gradual, smooth indicator dot pulse */}
        <span className="relative flex h-3 w-3 items-center justify-center">
          <motion.span
            animate={{
              scale: [1, 1.8, 2.2],
              opacity: [0.7, 0.3, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: [0.2, 0.8, 0.4, 1],
            }}
            className="absolute inline-flex h-full w-full rounded-full bg-emerald-200"
          />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-xs"></span>
        </span>

        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold tracking-wide uppercase">
          Chat on WhatsApp
        </span>
      </a>
    </motion.div>
  );
};
