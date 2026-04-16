'use client';

// ============================================
// Hustle Mania — 3D Scene Canvas (Phase 1)
// Phase 2 will replace RotatingPlaceholder with
// the actual garment/product 3D viewer.
// ============================================

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroModel3D from './HeroModel3D';

// ------------------------------------
// Main exported canvas component
// ------------------------------------
export default function SceneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,          // transparent background — body bg-hm-bg shows through
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}            // retina-aware, capped at 2× to prevent GPU overload
      frameloop="always"
      style={{ background: 'transparent' }}
      aria-hidden="true"      // decorative — hidden from screen readers
    >
      <HeroModel3D />
    </Canvas>
  );
}
