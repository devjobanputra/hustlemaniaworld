'use client';

// ============================================================================
// Hustle Mania — Spatial Product Card
// Floating glassmorphism panel — hovers over the 3D canvas
// ============================================================================

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import type { ProductSize } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const availableSize = product.sizes.find(
      (s) => !product.outOfStockSizes?.includes(s)
    ) as ProductSize | undefined;
    if (availableSize) {
      addItem(product, availableSize, 1);
    }
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-103"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 500ms ease-out' }}
        />

        {/* Dark overlay that lightens on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.1) 60%, transparent 100%)',
            opacity: hovered ? 0.7 : 0.5,
          }}
        />

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 left-3 px-2 py-1 text-label-sm"
            style={{ background: '#FF3B30', color: '#FFFFFF' }}
          >
            {product.badge}
          </div>
        )}

        {/* Quick add — appears on hover */}
        <div
          className="absolute bottom-3 left-3 right-3 flex justify-between items-center transition-all duration-200"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)' }}
        >
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            className="flex items-center gap-2 btn-primary text-[11px] py-2 px-3 tracking-widest"
            aria-label={`Quick add ${product.name} to cart`}
          >
            <ShoppingBag size={12} strokeWidth={1.5} strokeLinecap="square" />
            ADD
          </button>
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{ background: 'rgba(13,13,13,0.75)', border: '1px solid rgba(255,59,48,0.25)' }}
          >
            <ArrowUpRight size={14} strokeWidth={1.5} strokeLinecap="square" className="text-hm-on-surface-variant" />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div
        className="px-4 py-4"
        style={{ borderTop: '1px solid rgba(255,59,48,0.1)' }}
      >
        {/* Category label */}
        <p className="text-label-sm mb-1" style={{ color: 'rgba(255,59,48,0.7)' }}>
          {product.category.toUpperCase()} · {product.fit.toUpperCase()}
        </p>

        {/* Name */}
        <h3
          className="text-label-lg text-hm-on-surface mb-3 transition-colors group-hover:text-white"
          style={{ letterSpacing: '0.04em' }}
        >
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-price" style={{ fontSize: '1.1rem' }}>
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span
                className="text-sm line-through"
                style={{ color: 'rgba(231,189,183,0.4)' }}
              >
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          {/* Size dots — available sizes */}
          <div className="flex gap-1">
            {product.sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                className="text-label-sm"
                style={{
                  color: product.outOfStockSizes?.includes(size)
                    ? 'rgba(231,189,183,0.2)'
                    : 'rgba(231,189,183,0.5)',
                }}
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-label-sm" style={{ color: 'rgba(231,189,183,0.3)' }}>+</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
