// ============================================================================
// Hustle Mania — Product Detail Page (Server Component)
// ============================================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProductVariants } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';
import ProductSchema from '@/components/seo/ProductSchema';

export const revalidate = 60; // optionally cache for 60 seconds

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found | HUSTLE MANIA',
    };
  }

  return {
    title: `${product.name} | HUSTLE MANIA`,
    description: product.description,
    openGraph: {
      title: `${product.name} | HUSTLE MANIA`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const variants = await getProductVariants(product.id);

  return (
    <>
      <ProductSchema product={product} />
      <ProductDetailClient product={product} variants={variants} />
    </>
  );
}
