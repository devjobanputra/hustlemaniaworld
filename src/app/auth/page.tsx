'use client';

// ============================================
// Hustle Mania — Auth Page
// ============================================

import Image from 'next/image';
import AuthForm from '@/components/auth/AuthForm';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-hm-bg flex">
      {/* Left — Brand Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=1600&fit=crop"
          alt="Hustle Mania streetwear"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-hm-bg" />
        <div className="absolute inset-0 bg-hm-black/40" />

        {/* Brand Watermark */}
        <div className="absolute bottom-12 left-12">
          <span className="text-display-lg text-white/10">
            HUSTLE
            <br />
            MANIA
          </span>
        </div>

        {/* The Strike */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-hm-brand-red/30" />
      </div>

      {/* Right — Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20">
        <AuthForm />
      </div>
    </div>
  );
}
