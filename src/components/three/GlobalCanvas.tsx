'use client';

// ============================================
// Hustle Mania — Global Canvas (SSR-safe)
// Uses next/dynamic so the R3F Canvas never
// runs on the server (avoids hydration errors).
// ============================================

import dynamic from 'next/dynamic';

const SceneCanvas = dynamic(
  () => import('./SceneCanvas'),
  {
    ssr: false,
    // Render nothing during server pass — canvas is purely decorative
    loading: () => null,
  }
);

export default function GlobalCanvas() {
  return (
    /*
     * Fixed-position, full-viewport wrapper.
     * z-index: 0  — sits behind ALL page UI
     * pointer-events: none — never blocks clicks/taps on UI elements
     * aria-hidden: true   — screen readers skip the decorative 3D layer
     */
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100dvh',    // dvh = dynamic viewport height (mobile-safe)
        overflow: 'hidden',
      }}
    >
      <SceneCanvas />
    </div>
  );
}
