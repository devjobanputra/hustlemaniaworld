'use client';

// ============================================================================
// Hustle Mania — HeroModel3D
// Cinematic scroll-linked sewing machine with 4-page keyframe pathing.
// Each "page" of ScrollControls maps to a distinct camera angle and position.
// ============================================================================

import { Suspense, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center, Environment, useProgress, Html, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// ─── Loading Indicator ────────────────────────────────────────────────────
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 font-sans pointer-events-none">
        <div style={{ width: 32, height: 1, background: '#FF3B30', animation: 'pulse 2s ease-in-out infinite' }} />
        <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(229,226,225,0.6)' }}>
          INITIALIZING ASSET {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

// ─── Scroll-Linked Sewing Machine ─────────────────────────────────────────
function SewingMachine() {
  const { scene } = useGLTF('/assets/models/sewing_machine.glb');
  const groupRef = useRef<THREE.Group>(null);
  const { clock } = useThree();

  // Apply premium industrial materials
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMapIntensity = 1.4;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  const scroll = useScroll();

  // ─── Keyframe Definitions ─────────────────────────────────────────────
  // Each keyframe defines: position [x,y,z], rotation Y (radians), scale
  const keyframes = {
    // Page 1: HERO — Machine on the right, facing forward-left
    hero:     { pos: [2.0, -1.2, 0],   rotY: -Math.PI / 5,      scale: 1.8 },
    // Page 2: FEATURED — Rotated 180° to show back, slid to left
    featured: { pos: [-2.5, -0.8, -0.5], rotY: Math.PI * 0.85,  scale: 1.4 },
    // Page 3: DETAILS — Zoom in close, macro shot of needle area
    details:  { pos: [0.5, -0.5, 2.0],   rotY: -Math.PI / 3,    scale: 2.5 },
    // Page 4: FOOTER — Center, scale down, fade out
    footer:   { pos: [0, -1.5, -1.0],    rotY: Math.PI * 0.1,   scale: 0.8 },
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = scroll.offset; // 0 → 1 across all pages
    const time = clock.getElapsedTime();

    // ─── Determine interpolated target based on scroll progress ───────
    let targetX: number, targetY: number, targetZ: number;
    let targetRotY: number;
    let targetScale: number;

    if (t < 0.25) {
      // Page 1 → Page 2 transition
      const p = t / 0.25; // 0→1 within this segment
      const k0 = keyframes.hero;
      const k1 = keyframes.featured;
      targetX = THREE.MathUtils.lerp(k0.pos[0], k1.pos[0], p);
      targetY = THREE.MathUtils.lerp(k0.pos[1], k1.pos[1], p);
      targetZ = THREE.MathUtils.lerp(k0.pos[2], k1.pos[2], p);
      targetRotY = THREE.MathUtils.lerp(k0.rotY, k1.rotY, p);
      targetScale = THREE.MathUtils.lerp(k0.scale, k1.scale, p);
    } else if (t < 0.5) {
      // Page 2 → Page 3 transition
      const p = (t - 0.25) / 0.25;
      const k0 = keyframes.featured;
      const k1 = keyframes.details;
      targetX = THREE.MathUtils.lerp(k0.pos[0], k1.pos[0], p);
      targetY = THREE.MathUtils.lerp(k0.pos[1], k1.pos[1], p);
      targetZ = THREE.MathUtils.lerp(k0.pos[2], k1.pos[2], p);
      targetRotY = THREE.MathUtils.lerp(k0.rotY, k1.rotY, p);
      targetScale = THREE.MathUtils.lerp(k0.scale, k1.scale, p);
    } else if (t < 0.75) {
      // Page 3 → Page 4 transition
      const p = (t - 0.5) / 0.25;
      const k0 = keyframes.details;
      const k1 = keyframes.footer;
      targetX = THREE.MathUtils.lerp(k0.pos[0], k1.pos[0], p);
      targetY = THREE.MathUtils.lerp(k0.pos[1], k1.pos[1], p);
      targetZ = THREE.MathUtils.lerp(k0.pos[2], k1.pos[2], p);
      targetRotY = THREE.MathUtils.lerp(k0.rotY, k1.rotY, p);
      targetScale = THREE.MathUtils.lerp(k0.scale, k1.scale, p);
    } else {
      // Page 4 — hold at footer state
      const k = keyframes.footer;
      targetX = k.pos[0];
      targetY = k.pos[1];
      targetZ = k.pos[2];
      targetRotY = k.rotY;
      targetScale = k.scale;
    }

    // ─── Floating sine-wave (alive even when not scrolling) ───────────
    const floatY = Math.sin(time * 1.2) * 0.06;
    const floatX = Math.cos(time * 0.8) * 0.02;

    // ─── Apply with smooth damping ───────────────────────────────────
    const lerpSpeed = 3.5 * delta;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX + floatX, lerpSpeed);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + floatY, lerpSpeed);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, lerpSpeed);

    // Smooth rotation via quaternion slerp
    const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetRotY, 0));
    groupRef.current.quaternion.slerp(targetQuat, lerpSpeed);

    // Smooth scale
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, lerpSpeed);
    groupRef.current.scale.setScalar(s);

    // ─── Opacity fade on Page 4 ──────────────────────────────────────
    const opacity = t > 0.85 ? THREE.MathUtils.lerp(1, 0.15, (t - 0.85) / 0.15) : 1;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.opacity = opacity;
        child.material.transparent = opacity < 1;
      }
    });
  });

  return (
    <group ref={groupRef} position={[2.0, -1.2, 0]} scale={1.8} rotation={[0, -Math.PI / 5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// ─── Dramatic Cinematic Lighting ──────────────────────────────────────────
function CinematicLighting() {
  return (
    <>
      {/* Subtle base environment — provides reflections on the black metal */}
      <Environment preset="studio" environmentIntensity={0.4} />

      {/* Main Fill — low intensity to keep it dark */}
      <ambientLight intensity={0.15} color="#E5E2E1" />

      {/* Key Light — Front side, muted */}
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />

      {/* RIM LIGHT 1 — Back Left, strong white accent */}
      <spotLight
        position={[-8, 5, -5]}
        angle={0.25}
        penumbra={0.8}
        intensity={15}
        color="#ffffff"
      />

      {/* RIM LIGHT 2 — Back Right, subtle brand red accent */}
      <spotLight
        position={[8, 4, -6]}
        angle={0.3}
        penumbra={1}
        intensity={8}
        color="#FF3B30"
      />

      {/* Top light — catches horizontal surfaces */}
      <directionalLight
        position={[0, 10, 0]}
        intensity={1.5}
        color="#ffffff"
      />
    </>
  );
}

// ─── Main Component Export ────────────────────────────────────────────────
export default function HeroModel3D() {
  return (
    <Suspense fallback={<Loader />}>
      <CinematicLighting />
      <SewingMachine />
    </Suspense>
  );
}
