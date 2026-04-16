'use client';

// ============================================================================
// Hustle Mania — useProductMaterial Hook
// Dynamically updates the color/material of a loaded 3D garment in real-time.
// Pass a hex color → every MeshStandardMaterial on the model recolors instantly.
// ============================================================================

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

export interface ProductMaterialOptions {
  /** Hex color string, e.g. '#FF3B30' */
  color: string;
  /** Roughness 0–1. Fabric reads best at 0.7–0.85 */
  roughness?: number;
  /** Metalness 0–1. Keep near 0 for fabric */
  metalness?: number;
  /** Environment map intensity. Higher = shinier studio reflections */
  envMapIntensity?: number;
}

const DEFAULT_OPTIONS: Required<Omit<ProductMaterialOptions, 'color'>> = {
  roughness: 0.78,
  metalness: 0.02,
  envMapIntensity: 0.9,
};

/**
 * Hook that traverses a THREE.Group (loaded GLTF scene) and updates
 * every MeshStandardMaterial's color and surface properties in real-time.
 *
 * Usage:
 *   const { applyColor, groupRef } = useProductMaterial({ color: '#1A1919' });
 *   // Attach groupRef to your <group ref={groupRef}> wrapping the model
 *   // Call applyColor('#FF3B30') to change color on the fly
 */
export function useProductMaterial(options: ProductMaterialOptions) {
  const groupRef = useRef<THREE.Group>(null);
  const currentColor = useRef(options.color);

  const applyToGroup = useCallback(
    (color: string, opts?: Partial<Omit<ProductMaterialOptions, 'color'>>) => {
      if (!groupRef.current) return;

      const merged = { ...DEFAULT_OPTIONS, ...opts };
      const threeColor = new THREE.Color(color);

      groupRef.current.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.color.copy(threeColor);
            mat.roughness = merged.roughness;
            mat.metalness = merged.metalness;
            mat.envMapIntensity = merged.envMapIntensity;
            mat.needsUpdate = true;
          }
          // Also handle MeshPhysicalMaterial (extends MeshStandardMaterial)
          if (mat instanceof THREE.MeshPhysicalMaterial) {
            mat.color.copy(threeColor);
            mat.roughness = merged.roughness;
            mat.metalness = merged.metalness;
            mat.envMapIntensity = merged.envMapIntensity;
            mat.needsUpdate = true;
          }
        });
      });

      currentColor.current = color;
    },
    []
  );

  // Apply initial color + react to color prop changes
  useEffect(() => {
    applyToGroup(options.color, {
      roughness: options.roughness,
      metalness: options.metalness,
      envMapIntensity: options.envMapIntensity,
    });
  }, [options.color, options.roughness, options.metalness, options.envMapIntensity, applyToGroup]);

  return {
    /** Ref to attach to the <group> wrapping your 3D model */
    groupRef,
    /** Imperatively change color at any time */
    applyColor: (color: string) => applyToGroup(color),
    /** Current color value */
    currentColor: currentColor.current,
  };
}
