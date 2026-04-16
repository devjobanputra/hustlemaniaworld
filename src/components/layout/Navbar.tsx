'use client';

// ============================================================================
// Hustle Mania — Spatial Navbar
// Obsidian Frost glassmorphism — floats over the 3D canvas
// ============================================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';

const navLinks = [
  { href: '/shop', label: 'SHOP' },
  { href: '/shop?category=tees', label: 'TEES' },
  { href: '/shop?category=hoodies', label: 'HOODIES' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart } = useCartStore();
  const { user } = useAuthStore();
  const count = useCartStore((s) => s.totalItems());
  const justAdded = useCartStore((s) => s.justAdded);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* ── Spatial Navbar ─────────────────────────────────────────────── */}
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-obsidian' : 'bg-transparent'
        }`}
        style={
          !scrolled
            ? {
                background: 'rgba(13, 13, 13, 0.45)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(255, 59, 48, 0.08)',
              }
            : undefined
        }
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">

            {/* Mobile toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center w-10 h-10 text-hm-on-surface-variant transition-colors hover:text-hm-brand-red lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X size={20} strokeWidth={1.5} strokeLinecap="square" />
                : <Menu size={20} strokeWidth={1.5} strokeLinecap="square" />
              }
            </button>

            {/* Logo */}
            <Link href="/" id="logo-link" className="group flex items-center gap-2">
              <span className="text-xl font-black uppercase tracking-tight text-hm-on-surface transition-colors group-hover:text-hm-brand-red lg:text-2xl">
                HUSTLE<span className="text-hm-brand-red">MANIA</span>
              </span>
              {/* Micro status indicator */}
              <span
                className="hidden lg:inline-flex items-center gap-1 text-label-sm text-muted ml-3 border-l border-hm-brand-red/20 pl-3"
                style={{ color: 'rgba(255,180,170,0.5)' }}
              >
                <span
                  className="inline-block w-[5px] h-[5px] bg-hm-brand-red"
                  style={{ animation: 'glow-pulse 2.4s ease-in-out infinite' }}
                />
                LIVE
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-label-lg text-hm-on-surface-variant transition-colors hover:text-hm-on-surface relative
                    after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0
                    after:bg-hm-brand-red after:transition-all after:duration-200 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-1">
              {/* Account */}
              <button
                id="account-btn"
                onClick={() => user ? window.location.assign('/account') : useAuthStore.getState().openModal()}
                className="flex items-center justify-center w-10 h-10 text-hm-on-surface-variant transition-colors hover:text-hm-on-surface"
                aria-label={user ? 'My Account' : 'Sign In'}
              >
                <User size={18} strokeWidth={1.5} strokeLinecap="square" />
              </button>

              {/* Cart */}
              <button
                id="cart-toggle"
                onClick={openCart}
                className="relative flex items-center justify-center w-10 h-10 text-hm-on-surface-variant transition-colors hover:text-hm-on-surface ml-1"
                aria-label={`Cart — ${count} item${count !== 1 ? 's' : ''}`}
              >
                <ShoppingBag size={18} strokeWidth={1.5} strokeLinecap="square" />
                {count > 0 && (
                  <span
                    className={`absolute -top-0.5 -right-0.5 flex items-center justify-center w-[18px] h-[18px] bg-hm-brand-red text-white text-[9px] font-bold ${
                      justAdded ? 'animate-pulse-badge' : ''
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Overlay ─────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col lg:hidden animate-fade-in"
          style={{
            background: 'rgba(10, 10, 10, 0.97)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
          }}
        >
          {/* Close button top-right */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-10 h-10 text-hm-on-surface-variant hover:text-hm-brand-red transition-colors"
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.5} strokeLinecap="square" />
            </button>
          </div>

          {/* Mobile nav links */}
          <div className="flex flex-col justify-center flex-1 px-8 gap-6">
            {/* The Strike */}
            <div className="w-px h-24 bg-hm-brand-red/40 mb-4" />

            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-display-md text-hm-on-surface transition-colors hover:text-hm-brand-red"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                setMobileOpen(false);
                user ? window.location.assign('/account') : useAuthStore.getState().openModal();
              }}
              className="text-display-md transition-colors hover:text-hm-brand-red text-left"
              style={{ color: 'rgba(229,226,225,0.45)', animationDelay: '200ms' }}
            >
              {user ? 'ACCOUNT' : 'SIGN IN'}
            </button>
          </div>

          {/* Bottom label */}
          <p className="text-label-sm px-8 pb-8" style={{ color: 'rgba(255,180,170,0.35)' }}>
            HUSTLE MANIA — PREMIUM OVERSIZED STREETWEAR
          </p>
        </div>
      )}

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16 lg:h-[72px]" />
    </>
  );
}
