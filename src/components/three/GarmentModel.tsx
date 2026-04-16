'use client';

// ============================================================================
// Hustle Mania — GarmentModel
// Loads a .glb/.gltf 3D garment model or renders a procedural t-shirt
// fallback when no model file is available. Integrates with
// useProductMaterial for real-time color changes.
// ============================================================================

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

// Configure Draco decoder for compressed models
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

// ─── Types ─────────────────────────────────────────────────────────────────
export interface GarmentModelProps {
  /** Path to .glb/.gltf file (relative to /public). Omit for procedural fallback */
  modelPath?: string;
  /** Hex color to apply to all materials */
  color?: string;
  /** Material roughness (0–1). Higher = more matte fabric look */
  roughness?: number;
  /** Material metalness (0–1). Keep near 0 for fabric */
  metalness?: number;
  /** Scale multiplier */
  scale?: number;
  /** Gentle idle rotation speed (radians/sec). 0 to disable */
  autoRotateSpeed?: number;
  /** Ref callback — exposes the group ref to parent components */
  onGroupRef?: (ref: THREE.Group) => void;
}

// ─── GLTF Loader ───────────────────────────────────────────────────────────
function GLTFGarment({
  modelPath,
  color = '#1A1919',
  roughness = 0.78,
  metalness = 0.02,
  scale = 1,
  autoRotateSpeed = 0.15,
  onGroupRef,
}: GarmentModelProps & { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  // Clone the scene so we don't mutate the cached original
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Apply material properties
  useEffect(() => {
    const threeColor = new THREE.Color(color);
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.color.copy(threeColor);
        child.material.roughness = roughness;
        child.material.metalness = metalness;
        child.material.envMapIntensity = 0.9;
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, color, roughness, metalness]);

  // Expose ref to parent
  useEffect(() => {
    if (groupRef.current && onGroupRef) {
      onGroupRef(groupRef.current);
    }
  }, [onGroupRef]);

  // Gentle idle rotation
  useFrame((_, delta) => {
    if (groupRef.current && autoRotateSpeed > 0) {
      groupRef.current.rotation.y += delta * autoRotateSpeed;
    }
  });

  return (
    <Center>
      <group ref={groupRef} scale={scale}>
        <primitive object={clonedScene} />
      </group>
    </Center>
  );
}

// ─── Procedural T-Shirt Fallback ───────────────────────────────────────────
// Used when no .glb is available. Approximates an oversized tee silhouette
// using basic geometries — good enough for the interactive demo.
function ProceduralTShirt({
  color = '#1A1919',
  roughness = 0.78,
  metalness = 0.02,
  scale = 1,
  autoRotateSpeed = 0.15,
  onGroupRef,
}: GarmentModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness,
      metalness,
      envMapIntensity: 0.9,
      side: THREE.DoubleSide,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // React to color / material prop changes
  useEffect(() => {
    material.color.set(color);
    material.roughness = roughness;
    material.metalness = metalness;
    material.needsUpdate = true;
  }, [color, roughness, metalness, material]);

  // Expose ref to parent
  useEffect(() => {
    if (groupRef.current && onGroupRef) {
      onGroupRef(groupRef.current);
    }
  }, [onGroupRef]);

  // Gentle idle rotation
  useFrame((_, delta) => {
    if (groupRef.current && autoRotateSpeed > 0) {
      groupRef.current.rotation.y += delta * autoRotateSpeed;
    }
  });

  // Geometry dimensions — oversized tee proportions
  const torsoW = 1.6;
  const torsoH = 2.0;
  const torsoD = 0.35;
  const sleeveW = 0.75;
  const sleeveH = 0.55;
  const sleeveD = 0.28;
  const collarW = 0.5;
  const collarH = 0.12;

  return (
    <Center>
      <group ref={groupRef} scale={scale} position={[0, -0.2, 0]}>
        {/* Torso — main body */}
        <mesh material={material} castShadow>
          <boxGeometry args={[torsoW, torsoH, torsoD]} />
        </mesh>

        {/* Left sleeve */}
        <mesh
          material={material}
          position={[-(torsoW / 2 + sleeveW / 2 - 0.08), torsoH / 2 - sleeveH / 2 - 0.15, 0]}
          rotation={[0, 0, 0.2]}
          castShadow
        >
          <boxGeometry args={[sleeveW, sleeveH, sleeveD]} />
        </mesh>

        {/* Right sleeve */}
        <mesh
          material={material}
          position={[torsoW / 2 + sleeveW / 2 - 0.08, torsoH / 2 - sleeveH / 2 - 0.15, 0]}
          rotation={[0, 0, -0.2]}
          castShadow
        >
          <boxGeometry args={[sleeveW, sleeveH, sleeveD]} />
        </mesh>

        {/* Collar / neckline */}
        <mesh position={[0, torsoH / 2 + collarH / 2 - 0.04, 0]}>
          <boxGeometry args={[collarW, collarH, torsoD + 0.04]} />
          <meshStandardMaterial
            color={new THREE.Color(color).offsetHSL(0, 0, -0.08)}
            roughness={roughness + 0.05}
            metalness={metalness}
          />
        </mesh>

        {/* Subtle brand label on front — small red rectangle */}
        <mesh position={[0, 0.25, torsoD / 2 + 0.005]}>
          <planeGeometry args={[0.35, 0.08]} />
          <meshStandardMaterial
            color="#FF3B30"
            roughness={0.5}
            metalness={0.0}
            emissive="#FF3B30"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Hem detail — slightly darker strip at bottom */}
        <mesh position={[0, -(torsoH / 2) + 0.04, 0]}>
          <boxGeometry args={[torsoW + 0.01, 0.06, torsoD + 0.01]} />
          <meshStandardMaterial
            color={new THREE.Color(color).offsetHSL(0, 0, -0.06)}
            roughness={roughness + 0.05}
            metalness={metalness}
          />
        </mesh>
      </group>
    </Center>
  );
}

// ─── Main Export ────────────────────────────────────────────────────────────
export default function GarmentModel(props: GarmentModelProps) {
  if (props.modelPath) {
    return (
      <Suspense fallback={<ProceduralTShirt {...props} autoRotateSpeed={0.3} />}>
        <GLTFGarment {...props} modelPath={props.modelPath} />
      </Suspense>
    );
  }
  return <ProceduralTShirt {...props} />;
}

// Preload GLTF for instant display (call from parent component)
GarmentModel.preload = (path: string) => {
  useGLTF.preload(path);
};
