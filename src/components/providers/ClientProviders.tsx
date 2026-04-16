'use client';

// ============================================
// Hustle Mania — Client Providers
// ============================================

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import AuthModal from '@/components/auth/AuthModal';
import { useAuthStore } from '@/store/auth';

  import { usePathname } from 'next/navigation';

  export default function ClientProviders({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const initialize = useAuthStore((s) => s.initialize);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
      initialize();
    }, [initialize]);

    return (
      <>
        <Navbar />
        <CartDrawer />
        <AuthModal />
        <main className="min-h-screen">{children}</main>
        {!isHome && <Footer />}
      </>
    );
  }
