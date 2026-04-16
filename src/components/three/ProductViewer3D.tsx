'use client';

// ============================================================================
// Hustle Mania — ProductViewer3D
// Self-contained 3D product viewer with its own Canvas.
// Features: PresentationControls (drag-to-rotate), studio lighting,
// dynamic color via props, loading state, and spatial glass UI.
//
// Usage:
//   <ProductViewer3D color="#1A1919" />
//   <ProductViewer3D modelPath="/models/hoodie.glb" color="#FF3B30" />
// ============================================================================

import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  PresentationControls,
  Environment,
  ContactShadows,
  Html,
  useProgress,
} from '@react-three/drei';
import GarmentModel from './GarmentModel';

// ─── Types ────────────────────────────────────────────────────────────────
export interface ProductViewer3DProps {
  /** Path to .glb/.gltf model in /public. Omit for procedural fallback */
  modelPath?: string;
  /** Active hex color for the garment */
  color?: string;
  /** Material roughness (0–1) */
  roughness?: number;
  /** Material metalness (0–1) */
  metalness?: number;
  /** Scale multiplier for the model */
  scale?: number;
  /** Whether to show the "drag to rotate" hint */
  showHint?: boolean;
  /** Idle auto-rotation speed. 0 to disable */
  autoRotateSpeed?: number;
  /** CSS className for the outer wrapper */
  className?: string;
  /** Additional inline styles for the outer wrapper */
  style?: React.CSSProperties;
}

// ─── Loading Indicator ────────────────────────────────────────────────────
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          color: 'rgba(229, 226, 225, 0.7)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Pulsing brand dot */}
        <div
          style={{
            width: 10,
            height: 10,
            background: '#FF3B30',
            borderRadius: '50%',
            animation: 'glow-pulse 2.4s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          LOADING {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

// ─── Studio Lighting (apparel-optimized) ──────────────────────────────────
function StudioLighting() {
  return (
    <>
      {/* Warm ambient fill */}
      <ambientLight intensity={0.35} color="#E5E2E1" />

      {/* Key light — front-top, warm white */}
      <spotLight
        position={[3, 6, 5]}
        angle={0.4}
        penumbra={0.5}
        intensity={4}
        color="#FFF5F0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Fill light — opposite side, softer */}
      <spotLight
        position={[-4, 3, 3]}
        angle={0.5}
        penumbra={0.7}
        intensity={1.5}
        color="#E5E2E1"
        castShadow={false}
      />

      {/* Rim light — back, cool tertiary accent */}
      <spotLight
        position={[-2, 5, -5]}
        angle={0.35}
        penumbra={0.8}
        intensity={2.2}
        color="#68D3FC"
        castShadow={false}
      />

      {/* Ground bounce — subtle red from below */}
      <pointLight position={[0, -3, 1]} intensity={0.35} color="#FF3B30" />
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────
export default function ProductViewer3D({
  modelPath,
  color = '#1A1919',
  roughness = 0.78,
  metalness = 0.02,
  scale = 1,
  showHint = true,
  autoRotateSpeed = 0.15,
  className = '',
  style,
}: ProductViewer3DProps) {
  const [interacted, setInteracted] = useState(false);

  const handleInteraction = useCallback(() => {
    if (!interacted) setInteracted(true);
  }, [interacted]);

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px',
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0.3, 4], fov: 40, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 2]}
        shadows
        style={{ background: 'transparent', cursor: 'grab' }}
        onPointerDown={handleInteraction}
      >
        {/* Environment map for fabric reflections */}
        <Environment preset="studio" environmentIntensity={0.7} />

        <StudioLighting />

        {/* PresentationControls — drag to rotate, pinch to zoom */}
        <PresentationControls
          global
          snap
          rotation={[0.1, 0.25, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 3, Math.PI / 3]}
          speed={1.8}
          zoom={0.85}
        >
          <Suspense fallback={<Loader />}>
            <GarmentModel
              modelPath={modelPath}
              color={color}
              roughness={roughness}
              metalness={metalness}
              scale={scale}
              autoRotateSpeed={interacted ? 0 : autoRotateSpeed}
            />
          </Suspense>
        </PresentationControls>

        {/* Contact shadow on the "floor" */}
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.35}
          scale={6}
          blur={2.5}
          far={4}
          color="#FF3B30"
        />
      </Canvas>

      {/* ── Spatial UI Overlays ─────────────────────────────────── */}

      {/* Drag-to-rotate hint — fades out after first interaction */}
      {showHint && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: interacted ? 0 : 0.7,
            background: 'rgba(13,13,13,0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,59,48,0.15)',
            padding: '6px 14px',
          }}
        >
          {/* Rotate icon — simple SVG */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,180,170,0.7)"
            strokeWidth="1.5"
            strokeLinecap="square"
          >
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,180,170,0.7)',
            }}
          >
            DRAG TO ROTATE
          </span>
        </div>
      )}
    </div>
  );
}
