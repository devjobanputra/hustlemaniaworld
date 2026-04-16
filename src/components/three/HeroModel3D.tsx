'use client';

// ============================================================================
// Hustle Mania — HeroModel3D
// Loads the industrial sewing machine model and applies cinematic lighting.
// Designed as an imposing, premium backdrop element for the brand.
// ============================================================================

import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center, Environment, Float, useProgress, Html, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// ─── Loading Indicator ────────────────────────────────────────────────────
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-hm-on-surface-variant font-sans pointer-events-none">
        <div className="w-8 h-[1px] bg-hm-brand-red animate-pulse" />
        <span className="text-[0.6rem] uppercase tracking-[0.2em]">INITIALIZING ASSET {Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

// ─── Sewing Machine Model ─────────────────────────────────────────────────
function SewingMachine() {
  const { scene } = useGLTF('/assets/models/sewing_machine.glb');
  const groupRef = useRef<THREE.Group>(null);

  // Apply premium industrial materials to the machine
  // We want to ensure it feels like matte black + gunmetal
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Enhance dark textures if they aren't already set
        if (child.material instanceof THREE.MeshStandardMaterial) {
          // If the material is already dark, we boost its metalness/roughness balance
          child.material.envMapIntensity = 1.4;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  const scroll = useScroll();

  // Subtle idle rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Read the scroll offset (0 at top, 1 at bottom)
    const offset = scroll.offset;

    // Define target states
    let targetPos = new THREE.Vector3();
    let targetRot = new THREE.Euler();
    let targetScale = 2.2;

    if (offset < 0.25) {
      // 1. HERO SECTION (0.0 -> 0.25)
      // Center-right, facing slightly forward, lower Y position to clear Nav
      targetPos.set(2.5, -2.0, 0); 
      targetRot.set(0, -Math.PI / 6, 0);
      targetScale = 1.2;
    } else if (offset >= 0.25 && offset < 0.65) {
      // 2. FEATURED DROPS (0.25 -> 0.65)
      // Translate to far right, scale down, reveal side profile
      targetPos.set(3.0, -1.0, -1);
      targetRot.set(0, -Math.PI / 2, 0);
      targetScale = 1.6;
    } else {
      // 3. MANIFESTO / NEW ARRIVALS (0.65 -> 1.0)
      // Translate to center-left, show back mechanical details
      targetPos.set(-2.5, -1.2, 0);
      targetRot.set(0, Math.PI / 1.5, 0);
      targetScale = 2.0;
    }

    // Smoothly damp the mesh towards the target
    groupRef.current.position.lerp(targetPos, 4 * delta);
    
    // For rotation, we convert the target Euler to a Quaternion for smooth slerp
    const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
    groupRef.current.quaternion.slerp(targetQuat, 4 * delta);
    
    const targetScaleVec = new THREE.Vector3().setScalar(targetScale);
    groupRef.current.scale.lerp(targetScaleVec, 4 * delta);
  });

  return (
    <Center top>
      <primitive 
        ref={groupRef}
        object={scene} 
        // Initial state manually set, damped smoothly afterwards
        scale={1.2} 
        position={[2.5, -2.0, 0]}
        rotation={[0, -Math.PI / 6, 0]} 
      />
    </Center>
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
        intensity={15} // High intensity for that sharp edge highlight
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
  console.log("3D Scene Loaded"); // Production logging hook

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.1}
      floatIntensity={0.2}
      floatingRange={[-0.05, 0.05]}
    >
      <Suspense fallback={<Loader />}>
        <CinematicLighting />
        <SewingMachine />
      </Suspense>
    </Float>
  );
}
