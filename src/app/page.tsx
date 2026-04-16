// ============================================================================
// Hustle Mania — Spatial Homepage (Server Component)
// 3D-first layout: all sections are glassmorphism overlays on the 3D canvas
// ============================================================================

import Link from 'next/link';
import { ArrowRight, ChevronDown, ArrowUpRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getFeaturedProducts, getNewArrivals } from '@/lib/products';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const newArrivals = await getNewArrivals();

  return (
    <>
      <HomeClient featuredProducts={featuredProducts} newArrivals={newArrivals}>
        {/* ================================================================
            HERO — Full viewport, no background image.
            The 3D canvas IS the background. Text is a spatial HUD overlay.
            ================================================================ */}
        <section
          id="hero"
          className="relative min-h-[100vh] flex items-end overflow-hidden"
        >
          {/* Ambient gradient — softens the very bottom of the 3D scene */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 30% 60%, rgba(255,59,48,0.04) 0%, transparent 70%)',
            }}
          />

          {/* The Strike — vertical red line */}
          <div className="the-strike left-8 lg:left-16" />

          {/* ── Hero Text Block — bottom-left HUD style ───────────────── */}
          <div className="relative z-10 w-full mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16 pb-16 lg:pb-24">
            <div className="max-w-3xl">
              {/* Micro label */}
              <p
                className="text-label-md mb-6 flex items-center gap-3"
                style={{ color: 'rgba(255,59,48,0.85)', letterSpacing: '0.14em' }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 bg-hm-brand-red"
                  style={{ animation: 'glow-pulse 2.4s ease-in-out infinite' }}
                />
                PREMIUM OVERSIZED STREETWEAR — SS26
              </p>

              {/* Headline */}
              <h1 className="text-display-lg leading-none mb-2">
                <span
                  className="block text-hm-on-surface"
                  style={{ WebkitTextStroke: '1px rgba(229,226,225,0.15)' }}
                >
                  HUSTLE
                </span>
                <span
                  className="block"
                  style={{ color: '#FF3B30', WebkitTextStroke: '0px' }}
                >
                  HARDER
                </span>
              </h1>

              {/* Sub-line */}
              <p
                className="text-base lg:text-lg max-w-md mb-10 leading-relaxed"
                style={{ color: 'rgba(229,226,225,0.6)' }}
              >
                Born from the streets, engineered for precision.
                Oversized silhouettes crafted for those who move with intent.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  id="hero-cta-primary"
                  className="btn-primary group"
                >
                  SHOP THE DROP
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    strokeLinecap="square"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/shop?category=tees"
                  id="hero-cta-secondary"
                  className="btn-ghost"
                >
                  EXPLORE TEES
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll pill */}
          <div className="absolute bottom-8 right-8 lg:right-16 flex items-center gap-2 z-10">
            <span
              className="glass-panel px-3 py-2 text-label-sm flex items-center gap-2"
              style={{ color: 'rgba(231,189,183,0.6)' }}
            >
              <ChevronDown size={12} strokeWidth={1.5} strokeLinecap="square" className="animate-bounce" />
              SCROLL
            </span>
          </div>
        </section>

        {/* ================================================================
            MARQUEE STRIP — thin glass band
            ================================================================ */}
        <section
          style={{
            background: 'rgba(13,13,13,0.8)',
            borderTop: '1px solid rgba(255,59,48,0.1)',
            borderBottom: '1px solid rgba(255,59,48,0.1)',
            overflow: 'hidden',
            padding: '12px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '3rem',
              whiteSpace: 'nowrap',
              animation: 'marquee 22s linear infinite',
            }}
          >
            {Array(10).fill(null).map((_, i) => (
              <span
                key={i}
                className="text-label-sm"
                style={{ color: 'rgba(255,59,48,0.35)' }}
              >
                HUSTLE MANIA ✦ OVERSIZED ✦ STREETWEAR ✦ PREMIUM ✦
              </span>
            ))}
          </div>
          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
          `}</style>
        </section>

        {/* ================================================================
            FEATURED DROPS — Floating glass product cards
            ================================================================ */}
        <section
          id="featured-section"
          className="py-16 lg:py-28"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16">

            {/* Section header */}
            <div className="flex items-end justify-between mb-10 lg:mb-16">
              <div className="relative pl-5">
                <div className="the-strike" style={{ height: '100%', opacity: 0.5 }} />
                <p className="text-label-md mb-2" style={{ color: 'rgba(255,59,48,0.8)' }}>
                  CURATED
                </p>
                <h2 className="text-headline-lg text-hm-on-surface">
                  FEATURED DROPS
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-2 text-label-md transition-colors hover:text-hm-on-surface group"
                style={{ color: 'rgba(231,189,183,0.5)' }}
              >
                VIEW ALL
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  strokeLinecap="square"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {featuredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 2} />
              ))}
            </div>

            <Link
              href="/shop"
              className="sm:hidden flex items-center justify-center gap-2 mt-8 text-label-md transition-colors hover:text-hm-on-surface"
              style={{ color: 'rgba(231,189,183,0.5)' }}
            >
              VIEW ALL PRODUCTS
              <ArrowRight size={14} strokeWidth={1.5} strokeLinecap="square" />
            </Link>
          </div>
        </section>

        {/* ================================================================
            BRAND MANIFESTO — Full-bleed text statement
            ================================================================ */}
        <section
          id="manifesto-section"
          className="relative py-20 lg:py-36 overflow-hidden"
          style={{
            background: 'rgba(10,10,10,0.92)',
            borderTop: '1px solid rgba(255,59,48,0.08)',
            borderBottom: '1px solid rgba(255,59,48,0.08)',
          }}
        >
          {/* Background gradient sweep */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 50% 80% at 80% 50%, rgba(255,59,48,0.05) 0%, transparent 70%)',
            }}
          />

          {/* The Strike */}
          <div className="the-strike left-12 lg:left-24" />

          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-24">
            <p
              className="text-label-md mb-6"
              style={{ color: 'rgba(255,59,48,0.7)', letterSpacing: '0.15em' }}
            >
              THE MANIFESTO
            </p>
            <h2 className="text-display-md max-w-3xl mb-8">
              <span className="text-hm-on-surface">NOT JUST CLOTHING.</span>
              <br />
              <span style={{ color: 'rgba(229,226,225,0.35)' }}>A STATEMENT.</span>
            </h2>
            <p
              className="text-base lg:text-lg max-w-xl leading-relaxed mb-10"
              style={{ color: 'rgba(229,226,225,0.55)' }}
            >
              Every thread is chosen with intention. Every stitch is placed with precision.
              We don&apos;t follow trends — we set the standard.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center gap-3 text-label-lg transition-colors hover:text-hm-brand-red group"
              style={{ color: 'rgba(255,180,170,0.7)' }}
            >
              DISCOVER THE COLLECTION
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                strokeLinecap="square"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>

        {/* ================================================================
            NEW ARRIVALS
            ================================================================ */}
        <section
          id="new-arrivals-section"
          className="py-16 lg:py-28"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16">
            <div className="flex items-end justify-between mb-10 lg:mb-16">
              <div className="relative pl-5">
                <div className="the-strike" style={{ height: '100%', opacity: 0.5 }} />
                <p className="text-label-md mb-2" style={{ color: 'rgba(255,59,48,0.8)' }}>
                  JUST DROPPED
                </p>
                <h2 className="text-headline-lg text-hm-on-surface">NEW ARRIVALS</h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-2 text-label-md transition-colors hover:text-hm-on-surface group"
                style={{ color: 'rgba(231,189,183,0.5)' }}
              >
                SHOP NEW
                <ArrowUpRight size={14} strokeWidth={1.5} strokeLinecap="square" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            CATEGORY BLOCKS — Two large spatial panels
            ================================================================ */}
        <section
          id="category-section"
          className="py-16 lg:py-24"
          style={{ background: 'rgba(10,10,10,0.6)' }}
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">

              {/* Tees block */}
              <Link
                href="/shop?category=tees"
                className="group relative overflow-hidden"
                style={{ height: '420px' }}
              >
                {/* Background — spatial glass gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(26,25,25,0.9) 0%, rgba(42,10,8,0.7) 100%)',
                    border: '1px solid rgba(255,59,48,0.15)',
                    transition: 'border-color 300ms ease-out',
                  }}
                />
                {/* Hover glow sweep */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 30% 70%, rgba(255,59,48,0.12) 0%, transparent 60%)',
                    opacity: 0,
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-10 z-10">
                  <div className="the-strike" style={{ height: '80px', bottom: 'auto', transform: 'translateX(-32px)' }} />
                  <p className="text-label-md mb-3" style={{ color: 'rgba(255,59,48,0.7)' }}>COLLECTION</p>
                  <h3 className="text-headline-lg text-hm-on-surface mb-5">OVERSIZED TEES</h3>
                  <span className="flex items-center gap-2 text-label-md transition-colors group-hover:text-hm-brand-red" style={{ color: 'rgba(229,226,225,0.5)' }}>
                    SHOP NOW
                    <ArrowRight size={14} strokeWidth={1.5} strokeLinecap="square" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                {/* Right edge accent */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-px transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,59,48,0.4), transparent)', opacity: 0 }}
                />
              </Link>

              {/* Hoodies block */}
              <Link
                href="/shop?category=hoodies"
                className="group relative overflow-hidden"
                style={{ height: '420px' }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(14,14,14,0.95) 0%, rgba(26,25,25,0.8) 100%)',
                    border: '1px solid rgba(255,59,48,0.12)',
                    transition: 'border-color 300ms ease-out',
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-10 z-10">
                  <p className="text-label-md mb-3" style={{ color: 'rgba(255,59,48,0.7)' }}>COLLECTION</p>
                  <h3 className="text-headline-lg text-hm-on-surface mb-5">HOODIES</h3>
                  <span className="flex items-center gap-2 text-label-md transition-colors group-hover:text-hm-brand-red" style={{ color: 'rgba(229,226,225,0.5)' }}>
                    SHOP NOW
                    <ArrowRight size={14} strokeWidth={1.5} strokeLinecap="square" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <div
                  className="absolute right-0 top-0 bottom-0 w-px transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,59,48,0.4), transparent)', opacity: 0 }}
                />
              </Link>
            </div>
          </div>
        </section>
      </HomeClient>
    </>
  );
}
