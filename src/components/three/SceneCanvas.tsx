'use client';

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
        zIndex: 0, // Behind Navbar
      }}
    >
      <Canvas
        className="pointer-events-none"
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={4} damping={0.25} distance={1.5}>
          {/* The Scrollable 3D Item */}
          <Scroll>
            <HeroModel3D />
          </Scroll>

          {/* The Scrollable HTML DOM */}
          <Scroll html style={{ width: '100%', position: 'absolute' }}>
            <div className="w-full pointer-events-auto">
              {children}
            </div>
            {/* Minimal inline Footer for the index page since the layout Footer exists below the fixed canvas */}
            <footer className="w-full py-8 text-center text-label-md" style={{ color: 'rgba(231,189,183,0.5)', background: 'rgba(10,10,10,0.9)' }}>
              &copy; {new Date().getFullYear()} HUSTLE MANIA. ALL RIGHTS RESERVED.
            </footer>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
