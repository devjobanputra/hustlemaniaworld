'use client';

// ============================================================================
// Hustle Mania — Spatial Shop / Catalog Page (Client)
// ============================================================================

import { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import {
  CATEGORIES,
  SORT_OPTIONS,
  sortProducts,
} from '@/lib/products';
import type { Product, ProductCategory, SortOption } from '@/lib/products';

export default function ShopClient({
  initialProducts,
  initialCategory = 'all',
}: {
  initialProducts: Product[];
  initialCategory?: ProductCategory;
}) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [activeSort, setActiveSort] = useState<SortOption>('newest');
  const [sortOpen, setSortOpen] = useState(false);

  // Filter client-side since we have all products fetched from the server
  const filteredProducts = useMemo(() => {
    let filtered = initialProducts;
    if (activeCategory !== 'all') {
      filtered = initialProducts.filter(p => p.category === activeCategory);
    }
    return sortProducts(filtered, activeSort);
  }, [initialProducts, activeCategory, activeSort]);

  return (
    <div className="min-h-screen relative z-10 pt-16 lg:pt-24 pb-20">
      {/* ── Page Header (Spatial HUD) ──────────────────────────────────── */}
      <div className="relative mb-8 lg:mb-12">
        <div className="the-strike w-px h-full left-8 lg:left-12 absolute opacity-50" />
        <div className="mx-auto max-w-[1440px] px-8 sm:px-10 lg:px-16 pt-8">
          <p className="text-label-md text-hm-brand-red mb-2 tracking-widest flex items-center gap-2">
            <span className="inline-block w-1 h-1 bg-hm-brand-red rounded-full" />
            CATALOG
          </p>
          <h1 className="text-display-md text-hm-on-surface uppercase leading-none">
            SHOP ALL
          </h1>
          <p className="text-label-sm text-hm-text-muted mt-4">
            {filteredProducts.length} PRODUCT{filteredProducts.length !== 1 ? 'S' : ''} AVAILABLE
          </p>
        </div>
      </div>

      {/* ── Filters Bar (Sticky Glass Overlay) ─────────────────────────── */}
      <div className="sticky top-16 lg:top-[72px] z-30 glass-obsidian py-4 transition-all hover:glass-panel">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-2 sm:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  id={`filter-${cat.value}`}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`filter-chip ${activeCategory === cat.value ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative shrink-0 w-full sm:w-auto">
              <button
                id="sort-toggle"
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center justify-between sm:justify-start gap-4 px-4 py-2 glass-panel hover:border-hm-brand-red transition-colors w-full sm:w-auto text-label-sm text-hm-on-surface"
              >
                <span>SORT: {SORT_OPTIONS.find(o => o.value === activeSort)?.label}</span>
                <SlidersHorizontal size={14} className="text-hm-brand-red" />
              </button>

              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-full sm:w-[220px] z-20 glass-obsidian border border-glass-border animate-fade-in">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setActiveSort(opt.value);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-label-sm transition-colors border-b border-glass-border last:border-b-0 hover:bg-[rgba(255,59,48,0.1)] hover:text-hm-brand-red ${
                          activeSort === opt.value
                            ? 'text-hm-brand-red bg-[rgba(255,59,48,0.05)]'
                            : 'text-hm-on-surface-variant'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 py-10 lg:py-16">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 glass-panel mx-auto max-w-2xl mt-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hm-brand-red to-transparent opacity-50" />
            <h3 className="text-headline-md text-hm-on-surface mb-4 tracking-widest">
              NO DROPS DETECTED
            </h3>
            <p className="text-label-md text-hm-text-muted mb-8">
              Adjust your filters to discover more streetwear.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveSort('newest');
              }}
              className="btn-ghost flex items-center gap-2"
            >
              RESET FILTERS <ArrowUpRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 animate-slide-up">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
