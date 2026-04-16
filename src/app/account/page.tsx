'use client';

// ============================================
// Hustle Mania — Account / Dashboard Page
// ============================================

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Package,
  LogOut,
  ShoppingBag,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';

export default function AccountPage() {
  const { user, loading, signOut } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-hm-bg flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-hm-brand-red border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const displayName =
    user.user_metadata?.full_name || user.email?.split('@')[0] || 'Hustler';

  // Mock order data
  const orders = [
    {
      id: 'HM-2026-001',
      date: 'Apr 10, 2026',
      status: 'Delivered',
      total: 4498,
      items: 2,
    },
    {
      id: 'HM-2026-002',
      date: 'Apr 5, 2026',
      status: 'In Transit',
      total: 5499,
      items: 1,
    },
    {
      id: 'HM-2026-003',
      date: 'Mar 28, 2026',
      status: 'Delivered',
      total: 1999,
      items: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-hm-bg">
      {/* Header */}
      <div className="bg-hm-surface-lowest py-12 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <p className="text-label-md text-hm-brand-red mb-2">MY ACCOUNT</p>
          <h1 className="text-display-md text-hm-on-surface">
            WELCOME, {displayName.toUpperCase()}
          </h1>
          <p className="text-sm text-hm-on-surface-variant mt-2">{user.email}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ---- Left Sidebar ---- */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { icon: User, label: 'Profile', active: true },
              { icon: Package, label: 'Orders', active: false },
              { icon: MapPin, label: 'Addresses', active: false },
            ].map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                className={`w-full flex items-center gap-4 px-5 py-4 transition-colors ${
                  active
                    ? 'bg-hm-surface-high text-hm-on-surface'
                    : 'text-hm-on-surface-variant hover:bg-hm-surface-container hover:text-hm-on-surface'
                }`}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span className="text-label-lg">{label}</span>
              </button>
            ))}

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-4 px-5 py-4 text-hm-error transition-colors hover:bg-hm-error-container/20"
            >
              <LogOut size={20} strokeWidth={1.5} />
              <span className="text-label-lg">SIGN OUT</span>
            </button>
          </div>

          {/* ---- Right Content ---- */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-hm-surface-high p-5">
                <ShoppingBag
                  size={24}
                  strokeWidth={1.5}
                  className="text-hm-brand-red mb-3"
                />
                <p className="text-2xl font-black text-hm-on-surface">
                  {orders.length}
                </p>
                <p className="text-label-sm text-hm-on-surface-variant mt-1">
                  TOTAL ORDERS
                </p>
              </div>
              <div className="bg-hm-surface-high p-5">
                <Package
                  size={24}
                  strokeWidth={1.5}
                  className="text-hm-brand-red mb-3"
                />
                <p className="text-2xl font-black text-hm-on-surface">
                  {orders.filter((o) => o.status === 'In Transit').length}
                </p>
                <p className="text-label-sm text-hm-on-surface-variant mt-1">
                  IN TRANSIT
                </p>
              </div>
              <div className="bg-hm-surface-high p-5 col-span-2 sm:col-span-1">
                <User
                  size={24}
                  strokeWidth={1.5}
                  className="text-hm-brand-red mb-3"
                />
                <p className="text-sm font-semibold text-hm-on-surface truncate">
                  {displayName}
                </p>
                <p className="text-label-sm text-hm-on-surface-variant mt-1">
                  SYNDICATE MEMBER
                </p>
              </div>
            </div>

            {/* Order History */}
            <div>
              <h2 className="text-headline-md text-hm-on-surface mb-6">
                ORDER HISTORY
              </h2>
              <div className="space-y-3">
                {orders.map((order, i) => (
                  <div
                    key={order.id}
                    className={`flex items-center justify-between p-5 transition-colors hover:bg-hm-surface-container cursor-pointer ${
                      i % 2 === 0 ? 'bg-hm-surface-low' : 'bg-hm-surface-lowest'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-hm-surface-high flex items-center justify-center flex-shrink-0">
                        <Package
                          size={20}
                          strokeWidth={1.5}
                          className="text-hm-on-surface-variant"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-hm-on-surface">
                          {order.id}
                        </p>
                        <p className="text-label-sm text-hm-on-surface-variant mt-0.5">
                          {order.date} · {order.items} ITEM
                          {order.items > 1 ? 'S' : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-hm-on-surface">
                          ₹{order.total.toLocaleString('en-IN')}
                        </p>
                        <span
                          className={`text-label-sm ${
                            order.status === 'Delivered'
                              ? 'text-hm-success'
                              : 'text-hm-tertiary'
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                      <ChevronRight
                        size={16}
                        strokeWidth={1.5}
                        className="text-hm-on-surface-variant"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings */}
            <div>
              <h2 className="text-headline-md text-hm-on-surface mb-6">
                ACCOUNT SETTINGS
              </h2>
              <div className="bg-hm-surface-high p-6 space-y-6">
                <div>
                  <label className="block text-label-md text-hm-on-surface-variant mb-2">
                    DISPLAY NAME
                  </label>
                  <input
                    type="text"
                    defaultValue={displayName}
                    className="w-full bg-hm-surface-container text-hm-on-surface px-4 py-3 text-sm border-0 border-b-2 border-transparent focus:border-hm-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-label-md text-hm-on-surface-variant mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email || ''}
                    disabled
                    className="w-full bg-hm-surface-container text-hm-on-surface-variant px-4 py-3 text-sm border-0 cursor-not-allowed opacity-60"
                  />
                </div>
                <button className="bg-hm-brand-red text-white px-8 py-3 text-label-lg font-bold transition-all hover:bg-hm-on-primary hover:text-hm-primary">
                  SAVE CHANGES
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-hm-brand-red/10 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-title-lg text-hm-on-surface">KEEP HUSTLING</h3>
                <p className="text-sm text-hm-on-surface-variant mt-1">
                  Check out the latest drops.
                </p>
              </div>
              <Link
                href="/shop"
                className="bg-hm-brand-red text-white px-8 py-3 text-label-lg font-bold transition-all hover:bg-hm-on-primary hover:text-hm-primary whitespace-nowrap"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
