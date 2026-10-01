import React, { useState } from 'react';
import { Calculator, TrendingUp, IndianRupee, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface RoiCalculatorProps {
  onOpenBooking: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBooking }) => {
  const { siteSettings } = useCms();
  const [avgOrderValue, setAvgOrderValue] = useState<number>(1499);
  const [dailyOrders, setDailyOrders] = useState<number>(8);
  const [profitMargin, setProfitMargin] = useState<number>(35);

  const monthlyOrders = dailyOrders * 30;
  const monthlyRevenue = monthlyOrders * avgOrderValue;
  const dailyProfit = dailyOrders * avgOrderValue * (profitMargin / 100);
  const monthlyProfit = dailyProfit * 30;
  const daysToBreakEven = Math.max(1, Math.ceil(siteSettings.currentOfferPrice / dailyProfit));

  // Shopify cost comparison (₹2,500/mo plan + 2% transaction fee + apps)
  const shopifyMonthlyFee = 2500;
  const shopifyTransactionFee = monthlyRevenue * 0.02;
  const shopifyAnnualCost = (shopifyMonthlyFee + shopifyTransactionFee + 1500) * 12;

  return (
    <section id="roi-calculator" className="py-16 lg:py-24 bg-stone-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100/70 px-3 py-1 rounded-md mb-3 border border-orange-200/60">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Profit Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
            How Fast Will Your <span className="text-orange-600">₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')}</span> Pay Off?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Slide the values below according to your product prices and expected volume to see your projected monthly returns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Slider 1: Average Order Value */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Average Product Price (AOV)
                  </label>
                  <span className="text-base font-black text-slate-900 font-mono">
                    ₹{avgOrderValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="299"
                  max="5999"
                  step="50"
                  value={avgOrderValue}
                  onChange={e => setAvgOrderValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>₹299</span>
                  <span>₹2,500</span>
                  <span>₹5,999+</span>
                </div>
              </div>

              {/* Slider 2: Daily Orders */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Expected Orders Per Day
                  </label>
                  <span className="text-base font-black text-slate-900 font-mono">
                    {dailyOrders} orders/day
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={dailyOrders}
                  onChange={e => setDailyOrders(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>1 order</span>
                  <span>25 orders</span>
                  <span>50 orders</span>
                </div>
              </div>

              {/* Slider 3: Profit Margin */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Your Product Profit Margin
                  </label>
                  <span className="text-base font-black text-slate-900 font-mono">
                    {profitMargin}%
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="70"
                  step="5"
                  value={profitMargin}
                  onChange={e => setProfitMargin(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>15% (Low margin)</span>
                  <span>40% (Average D2C)</span>
                  <span>70% (High margin)</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-orange-600 shrink-0" />
              <p className="text-xs text-slate-700">
                <span className="font-bold text-slate-900">Zero Commission Benefit:</span> On WooCommerce, 100% of this revenue goes directly to your bank account with no 2% platform deductions!
              </p>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Projected Monthly Return
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                  {monthlyOrders} Orders/Month
                </span>
              </div>

              {/* Big Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    Monthly Revenue
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                    ₹{monthlyRevenue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Gross merchandise value</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-orange-400 uppercase font-bold tracking-wider block">
                    Estimated Net Profit
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-orange-400 font-mono mt-1">
                    ₹{Math.round(monthlyProfit).toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">At {profitMargin}% margin</span>
                </div>
              </div>

              {/* Break Even Highlight */}
              <div className="bg-gradient-to-r from-orange-950/60 to-amber-950/40 p-5 rounded-2xl border border-orange-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-white shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-orange-300 font-semibold uppercase tracking-wider block">
                      Investment Payback Speed
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                      Pays for itself in {daysToBreakEven} {daysToBreakEven === 1 ? 'day' : 'days'}!
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  At {dailyOrders} orders/day, your ₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')} setup fee is fully recovered within your first {daysToBreakEven} days of active selling.
                </p>
              </div>

              {/* Shopify Savings Card */}
              <div className="text-xs text-slate-300 flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span>Annual savings vs. Shopify subscription + 2% cut:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  Save ~₹{Math.round(shopifyAnnualCost).toLocaleString('en-IN')}/yr
                </span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lock In ₹{siteSettings.currentOfferPrice.toLocaleString('en-IN')} Pricing Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
