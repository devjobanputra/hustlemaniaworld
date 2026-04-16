'use client';

// ============================================================================
// Hustle Mania — Spatial Product Detail Page (Client)
// ============================================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCw } from 'lucide-react';
import { formatPrice } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import { trackViewItem, trackAddToCart } from '@/lib/gtm';
import ProductViewer from '@/components/three/ProductViewer';
import type { Product, ProductSize, ProductVariant } from '@/lib/products';

export default function ProductDetailClient({
  product,
  variants,
}: {
  product: Product;
  variants: ProductVariant[];
}) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  
  // Default to the first variant color if available, else #1A1919
  const defaultVariant = variants?.[0];
  const [activeVariant, setActiveVariant] = useState<ProductVariant | null>(defaultVariant || null);

  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // GTM View Item
  useEffect(() => {
    trackViewItem(product);
  }, [product]);

  const isOutOfStock = (size: ProductSize) =>
    product.outOfStockSizes?.includes(size) ?? false;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize, 1);
    trackAddToCart(product, selectedSize);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col pointer-events-none z-10">
      
      {/* ── 3D Viewer Container (Center 60%ish) ────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-auto flex items-center justify-center pt-16">
        <div className="w-full h-full lg:w-[60%] lg:h-[80%] relative">
          <ProductViewer 
            color={activeVariant?.color_hex || "#1A1919"} 
            modelPath={activeVariant?.glb_url}
            roughness={0.8}
            className="w-full h-full"
            showHint={false}
          />

          {/* Spatial AR-style Annotation Dots */}
          <div className="absolute top-[30%] left-[20%] items-center gap-2 hidden lg:flex">
            <div className="annotation-dot" />
            <div className="glass-subtle px-2 py-1 text-label-sm text-hm-on-surface">
              240 GSM COTTON
            </div>
          </div>
          <div className="absolute bottom-[40%] right-[15%] items-center gap-2 hidden lg:flex flex-row-reverse">
            <div className="annotation-dot" />
            <div className="glass-subtle px-2 py-1 text-label-sm text-hm-on-surface">
              REINFORCED SEAMS
            </div>
          </div>
        </div>
      </div>

      {/* ── Spatial HUD UI Overlay ─────────────────────────────────── */}
      <div className="flex-1 w-full mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row justify-between items-end lg:items-center pb-8 lg:pb-0 pt-24 z-10">
        
        {/* LEFT PANEL (Floating Glassmorphism) */}
        <div className="glass-panel p-6 lg:p-8 w-full lg:w-[320px] pointer-events-auto flex flex-col gap-4 animate-slide-in-right shrink-0 mb-4 lg:mb-0">
          <Link href="/shop" className="text-label-sm text-hm-on-surface-variant flex items-center gap-2 hover:text-hm-brand-red transition-colors w-fit pb-2">
            <ArrowLeft size={14} /> BACK TO SHOP
          </Link>
          
          <div>
            <h1 className="text-display-md text-hm-on-surface leading-tight mb-2 uppercase break-words">
              {product.name}
            </h1>
            <p className="text-price mb-4">{formatPrice(product.price)}</p>
          </div>

          <div className="flex items-center gap-2 text-label-sm text-hm-text-muted">
            <RotateCw size={14} className="animate-spin-slow" style={{ animationDuration: '4s' }} />
            <span>ROTATE TO INSPECT</span>
          </div>

          {variants.length > 0 && (
            <div className="mt-4 pt-4 border-t border-glass-border">
              <span className="text-label-md text-hm-on-surface mb-3 block">COLOR</span>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVariant(v)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      activeVariant?.id === v.id ? 'border-white scale-110' : 'border-transparent hover:border-glass-border'
                    }`}
                    style={{ backgroundColor: v.color_hex }}
                    aria-label={`Select color ${v.color_name}`}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-glass-border">
            <p className="text-sm text-hm-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* RIGHT PANEL (Floating Glassmorphism) */}
        <div className="glass-panel p-6 lg:p-8 w-full lg:w-[340px] pointer-events-auto flex flex-col gap-6 animate-slide-up lg:animate-slide-in-right shrink-0">
          
          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md text-hm-on-surface">SELECT SIZE</span>
              {sizeError && (
                <span className="text-label-sm text-hm-error">SIZE REQUIRED</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const oos = isOutOfStock(size);
                return (
                  <button
                    key={size}
                    id={`size-${size}`}
                    disabled={oos}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`size-chip ${selectedSize === size ? 'active' : ''} ${oos ? 'sold-out' : ''}`}
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <button
            id="add-to-cart"
            onClick={handleAddToCart}
            className={`btn-primary w-full py-4 text-label-lg tracking-widest ${
              added ? 'bg-hm-on-surface text-hm-bg' : ''
            }`}
          >
            {added ? 'ADDING...' : 'ADD TO CART'}
          </button>

          {/* Specs List */}
          <div className="pt-6 border-t border-glass-border space-y-4">
            <div>
              <p className="text-label-sm text-hm-text-muted mb-1">MATERIAL</p>
              <p className="text-label-md text-hm-on-surface">{product.material.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-label-sm text-hm-text-muted mb-1">FIT</p>
              <p className="text-label-md text-hm-on-surface">{product.fit.toUpperCase()}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
