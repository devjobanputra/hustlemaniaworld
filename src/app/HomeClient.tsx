'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { Product } from '@/lib/products';

// Dynamically import the entire SceneCanvas (Canvas + ScrollControls)
// This ensures that NO Three.js code runs during SSR, which fixes white-screen rotation/hydration crashes.
const SceneCanvas = dynamic(() => import('@/components/three/SceneCanvas'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-hm-bg flex items-center justify-center">
    <div className="w-8 h-[1px] bg-hm-brand-red animate-pulse" />
  </div>
});

export default function HomeClient({
  featuredProducts,
  newArrivals,
  children,
}: {
  featuredProducts: Product[];
  newArrivals: Product[];
  children: React.ReactNode;
}) {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            (entry.target as HTMLElement).style.opacity = '1';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    // Grab all elements with .section-reveal class
    const revealElements = document.querySelectorAll('.section-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <SceneCanvas>
      {children}
    </SceneCanvas>
  );
}
