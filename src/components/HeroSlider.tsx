import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroSliderProps {
  onCtaClick: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onCtaClick }) => {
  const { heroSlides } = useStore();
  const activeSlides = heroSlides.filter(s => s.status === 'active');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (activeSlides.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [activeSlides.length, isPaused]);

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIdx] || activeSlides[0];

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
  };

  return (
    <section
      className="relative overflow-hidden bg-slate-950 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {activeSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center filter brightness-40 scale-105 transition-transform duration-7000 ease-out"
          />
          {/* Radial gradient vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>
      ))}

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tested & Verified Recommendations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.1]">
            {currentSlide.title}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
            {currentSlide.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onCtaClick}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{currentSlide.ctaText || 'Shop Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#about"
              className="px-5 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>How We Pick Gear</span>
            </a>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      {activeSlides.length > 1 && (
        <div className="absolute right-6 bottom-6 z-20 flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 border border-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 border border-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Slide Indicators */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentIdx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
