import React, { useEffect, useState } from 'react';
import { ExternalLink, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface AffiliateRedirectModalProps {
  product: Product | null;
  onClose: () => void;
}

export const AffiliateRedirectModal: React.FC<AffiliateRedirectModalProps> = ({
  product,
  onClose,
}) => {
  const { recordAffiliateClick } = useStore();
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!product) return;

    let timeoutId: NodeJS.Timeout;

    const performTrackAndRedirect = async () => {
      try {
        const finalUrl = await recordAffiliateClick(product);
        setRedirectUrl(finalUrl);
        setIsReady(true);

        // Auto open after 1.2s to reassure user with transparent feedback
        timeoutId = setTimeout(() => {
          window.open(finalUrl, '_blank', 'noopener,noreferrer');
          onClose();
        }, 1200);
      } catch (err) {
        console.error("Redirect tracking error:", err);
        const fallback = product.amazonAffiliateUrl || 'https://amazon.com';
        setRedirectUrl(fallback);
        setIsReady(true);
        window.open(fallback, '_blank', 'noopener,noreferrer');
        onClose();
      }
    };

    performTrackAndRedirect();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl relative">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
          <ExternalLink className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Verified Partner Redirect
          </span>
          <h3 className="text-xl font-black text-white">
            Taking You to Amazon
          </h3>
          <p className="text-xs text-slate-400">
            Checking real-time stock and authentic merchant pricing for:
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-left flex items-center gap-3">
            <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
            <span className="text-xs font-bold text-slate-200 truncate flex-1">{product.name}</span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 animate-[pulse_1s_infinite] w-full" />
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Prime delivery & Amazon A-to-z Buyer Guarantee</span>
        </div>

        {/* Fallback button if popup blocked */}
        {isReady && redirectUrl && (
          <div className="pt-2">
            <a
              href={redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
            >
              Click here if you are not redirected automatically
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
