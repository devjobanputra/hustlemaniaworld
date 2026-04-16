'use client';

// ============================================================================
// Hustle Mania — Spatial Cart Drawer
// Obsidian Frost glassmorphism drawer overlay
// ============================================================================

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/products';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore();
  const total = subtotal();

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    if (isOpen) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  return (
    <>
      {/* ── Backdrop ────────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[99] transition-all duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
        onClick={closeCart}
        aria-hidden
      />

      {/* ── Drawer Panel ───────────────────────────────────────────────── */}
      <div
        id="cart-drawer"
        role="dialog"
        aria-label="Shopping Cart"
        aria-modal="true"
        className={`fixed top-0 right-0 z-[100] h-full w-full sm:w-[420px] xl:w-[460px] flex flex-col transition-transform duration-300 ease-out glass-drawer ${
          isOpen ? 'translate-x-0 animate-slide-in-right' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,59,48,0.12)' }}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={16} strokeWidth={1.5} strokeLinecap="square" className="text-hm-brand-red" />
            <h2 className="text-label-lg text-hm-on-surface tracking-widest">
              YOUR CART
              <span className="text-muted ml-2 font-normal normal-case tracking-normal" style={{ fontSize: '0.75rem', color: 'rgba(255,180,170,0.5)' }}>
                ({items.length})
              </span>
            </h2>
          </div>
          <button
            id="close-cart"
            onClick={closeCart}
            className="flex items-center justify-center w-9 h-9 text-hm-on-surface-variant transition-colors hover:text-hm-brand-red"
            aria-label="Close cart"
          >
            <X size={18} strokeWidth={1.5} strokeLinecap="square" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              {/* Empty state */}
              <div
                className="w-16 h-16 flex items-center justify-center mb-6"
                style={{ border: '1px solid rgba(255,59,48,0.2)', background: 'rgba(42,42,42,0.4)' }}
              >
                <ShoppingBag size={24} strokeWidth={1.5} strokeLinecap="square" className="text-hm-brand-red opacity-60" />
              </div>
              <h3 className="text-label-lg text-hm-on-surface mb-2 tracking-widest">CART EMPTY</h3>
              <p className="text-sm mb-8" style={{ color: 'rgba(231,189,183,0.5)' }}>
                Add some heat to your wardrobe.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-primary text-sm px-8 py-3"
              >
                SHOP NOW
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-5"
                  style={{
                    background: index % 2 === 0
                      ? 'rgba(26,25,25,0.4)'
                      : 'rgba(14,14,14,0.4)',
                    borderBottom: '1px solid rgba(255,59,48,0.06)',
                  }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-[72px] h-[88px] flex-shrink-0 overflow-hidden"
                    style={{ border: '1px solid rgba(255,59,48,0.12)' }}
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-label-md text-hm-on-surface truncate tracking-widest">
                        {item.product.name}
                      </h4>
                      <p className="text-label-sm mt-1" style={{ color: 'rgba(231,189,183,0.55)' }}>
                        SIZE: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls */}
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-hm-on-surface-variant transition-colors hover:text-hm-brand-red"
                          style={{ background: 'rgba(42,42,42,0.7)', border: '1px solid rgba(255,59,48,0.12)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} strokeWidth={1.5} strokeLinecap="square" />
                        </button>
                        <span
                          className="w-9 h-7 flex items-center justify-center text-xs font-bold text-hm-on-surface"
                          style={{ background: 'rgba(53,52,52,0.8)', border: '1px solid rgba(255,59,48,0.08)' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-hm-on-surface-variant transition-colors hover:text-hm-brand-red"
                          style={{ background: 'rgba(42,42,42,0.7)', border: '1px solid rgba(255,59,48,0.12)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} strokeWidth={1.5} strokeLinecap="square" />
                        </button>
                      </div>

                      {/* Price + remove */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-hm-brand-red">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-hm-on-surface-variant transition-colors hover:text-hm-error"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} strokeWidth={1.5} strokeLinecap="square" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Cart Summary ──────────────────────────────────────────────── */}
        {items.length > 0 && (
          <div
            className="px-6 py-5 space-y-4"
            style={{
              borderTop: '1px solid rgba(255,59,48,0.15)',
              background: 'rgba(13,13,13,0.85)',
            }}
          >
            {/* Subtotal row */}
            <div className="flex items-center justify-between">
              <span className="text-label-md" style={{ color: 'rgba(231,189,183,0.55)' }}>
                SUBTOTAL
              </span>
              <span className="text-lg font-black text-hm-on-surface">
                {formatPrice(total)}
              </span>
            </div>
            <p className="text-label-sm" style={{ color: 'rgba(231,189,183,0.35)' }}>
              SHIPPING CALCULATED AT CHECKOUT
            </p>

            {/* CTA */}
            <button
              id="checkout-button"
              className="btn-primary w-full justify-between py-4"
            >
              <span>CHECKOUT</span>
              <span className="font-normal text-sm">{formatPrice(total)}</span>
            </button>

            <button
              onClick={closeCart}
              className="w-full text-center py-2 text-label-sm transition-colors hover:text-hm-on-surface"
              style={{ color: 'rgba(231,189,183,0.4)' }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </>
  );
}
