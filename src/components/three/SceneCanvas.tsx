'use client';

// ============================================================================
// SceneCanvas — Full viewport 3D container with ScrollControls
// Dynamically imported by HomeClient with { ssr: false }.
// ALL homepage HTML is rendered inside <Scroll html> so it scrolls in sync.
// ============================================================================

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import HeroModel3D from './HeroModel3D';

interface SceneCanvasProps {
  children: React.ReactNode;
}

export default function SceneCanvas({ children }: SceneCanvasProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 0,
      }}
    >
      <Canvas
        style={{ pointerEvents: 'none', background: 'transparent' }}
        camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={4} damping={0.2}>
          {/* 3D Layer — the sewing machine that responds to scroll */}
          <Scroll>
            <HeroModel3D />
          </Scroll>

          {/* HTML Layer — ALL homepage content lives here for scroll sync */}
          <Scroll html style={{ width: '100%' }}>
            <div className="w-full" style={{ pointerEvents: 'auto' }}>
              {children}
            </div>
            {/* Inline footer inside the scroll container */}
            <footer
              className="w-full py-8 text-center"
              style={{
                color: 'rgba(231,189,183,0.5)',
                background: 'rgba(10,10,10,0.9)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                pointerEvents: 'auto',
              }}
            >
              &copy; {new Date().getFullYear()} HUSTLE MANIA. ALL RIGHTS RESERVED.
            </footer>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
