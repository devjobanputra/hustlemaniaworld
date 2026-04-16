import { createClient } from '@/lib/supabase/client';

export type ProductCategory = 'all' | 'tees' | 'hoodies' | 'accessories';
export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  badge?: string;
  isNew: boolean;
  featured: boolean;
  material: string;
  fit: string;
  details: string[];
  images: string[];
  sizes: ProductSize[];
  outOfStockSizes?: ProductSize[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  color_name: string;
  color_hex: string;
  glb_url: string;
  thumbnail_url: string | null;
}

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  // Map snake_case to camelCase
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    description: data.description,
    price: Number(data.price),
    compareAtPrice: data.compare_at_price ? Number(data.compare_at_price) : undefined,
    category: data.category,
    badge: data.badge,
    isNew: data.is_new,
    featured: data.featured,
    material: data.material,
    fit: data.fit,
    details: data.details,
    images: data.images,
    sizes: data.sizes,
    outOfStockSizes: data.out_of_stock_sizes,
  };
}

export async function getProductVariants(productId: string): Promise<ProductVariant[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .eq('product_id', productId);

  if (error || !data) return [];
  return data;
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const supabase = createClient();
  let query = supabase.from('products').select('*');
  
  if (category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  return data.map(d => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    description: d.description,
    price: Number(d.price),
    compareAtPrice: d.compare_at_price ? Number(d.compare_at_price) : undefined,
    category: d.category,
    badge: d.badge,
    isNew: d.is_new,
    featured: d.featured,
    material: d.material,
    fit: d.fit,
    details: d.details,
    images: d.images,
    sizes: d.sizes,
    outOfStockSizes: d.out_of_stock_sizes,
  }));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true);

  if (error || !data) return [];
  return data.map(d => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    description: d.description,
    price: Number(d.price),
    compareAtPrice: d.compare_at_price ? Number(d.compare_at_price) : undefined,
    category: d.category,
    badge: d.badge,
    isNew: d.is_new,
    featured: d.featured,
    material: d.material,
    fit: d.fit,
    details: d.details,
    images: d.images,
    sizes: d.sizes,
    outOfStockSizes: d.out_of_stock_sizes,
  }));
}

export async function getNewArrivals(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_new', true);

  if (error || !data) return [];
  return data.map(d => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    description: d.description,
    price: Number(d.price),
    compareAtPrice: d.compare_at_price ? Number(d.compare_at_price) : undefined,
    category: d.category,
    badge: d.badge,
    isNew: d.is_new,
    featured: d.featured,
    material: d.material,
    fit: d.fit,
    details: d.details,
    images: d.images,
    sizes: d.sizes,
    outOfStockSizes: d.out_of_stock_sizes,
  }));
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export const CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'T-SHIRTS', value: 'tees' },
  { label: 'HOODIES', value: 'hoodies' },
  { label: 'ACCESSORIES', value: 'accessories' },
];

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Name A–Z', value: 'name' },
];

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}
