// ============================================================================
// Hustle Mania — Spatial Shop / Catalog Page (Server)
// ============================================================================

import { getProductsByCategory } from '@/lib/products';
import ShopClient from './ShopClient';
import type { ProductCategory } from '@/lib/products';

export const revalidate = 60; // optionally cache for 60 seconds

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categoryParam = (searchParams.category || 'all') as ProductCategory;
  // Fetch from Supabase on the server
  const initialProducts = await getProductsByCategory('all');

  return <ShopClient initialProducts={initialProducts} initialCategory={categoryParam} />;
}
