import React from 'react';
import { ArrowRight, Grid } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CategorySectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const { categories, products } = useStore();
  const activeCategories = categories.filter(c => c.status === 'active');

  const getProductCount = (catId: string) => {
    return products.filter(p => p.categoryId === catId && p.status === 'active').length;
  };

  return (
    <section id="categories" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              <Grid className="w-3.5 h-3.5" />
              <span>Curated Departments</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Explore By Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Dive into focused categories of tested workspace gear, audiophile sound, and home intelligence.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {activeCategories.map((cat) => {
            const count = getProductCount(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 hover:border-cyan-500/60 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer"
              >
                {/* Background image preview with dark gradient */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center filter brightness-25 group-hover:scale-110 group-hover:brightness-35 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-2">
                  <span className="text-[11px] font-mono font-semibold text-cyan-400 block">
                    {count} {count === 1 ? 'Product' : 'Products'}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6 flex items-center text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                  <span>Browse Gear</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
