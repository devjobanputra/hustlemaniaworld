'use client';

// ============================================================================
// Hustle Mania — ProductViewer (SSR-safe)
// Dynamic import wrapper — prevents WebGL hydration crashes.
// Use this in pages instead of importing ProductViewer3D directly.
//
// Usage:
//   import ProductViewer from '@/components/three/ProductViewer';
//   <ProductViewer color="#FF3B30" className="h-[500px]" />
// ============================================================================

import dynamic from 'next/dynamic';
import type { ProductViewer3DProps } from './ProductViewer3D';

const ProductViewer3D = dynamic(
  () => import('./ProductViewer3D'),
  {
    ssr: false,
    loading: () => (
      // Spatial Scanner Skeleton — matches the Obsidian Frost glass aesthetic
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          background: 'radial-gradient(circle at center, rgba(26,25,25,0.7) 0%, rgba(13,13,13,0.9) 100%)',
          border: '1px solid rgba(255,59,48,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Scanning beam animation */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #FF3B30, transparent)',
            opacity: 0.5,
            boxShadow: '0 0 15px #FF3B30',
            animation: 'scanner-sweep 3s ease-in-out infinite',
            zIndex: 1,
          }}
        />

        {/* Spatial Grid background */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            backgroundPosition: 'center',
            opacity: 0.3,
          }}
        />

        <div
          style={{
            width: 12,
            height: 12,
            background: '#FF3B30',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Rhombus shape
            animation: 'glow-pulse 2.4s ease-in-out infinite',
            zIndex: 2,
          }}
        />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.2em',
            color: 'rgba(255,226,225,0.65)',
            zIndex: 2,
          }}
        >
          INITIALIZING SPATIAL HUD
        </span>

        <style>{`
          @keyframes scanner-sweep {
            0% { top: 0%; opacity: 0; }
            50% { opacity: 0.5; }
            100% { top: 100%; opacity: 0; }
          }
        `}</style>
      </div>
    ),
  }
);

export default function ProductViewer(props: ProductViewer3DProps) {
  return <ProductViewer3D {...props} />;
}
