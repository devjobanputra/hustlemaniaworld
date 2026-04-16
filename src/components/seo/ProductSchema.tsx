'use client';

// ============================================================================
// Hustle Mania — Product Schema (JSON-LD)
// Generates rich snippets for Google Search (Price, Stock, Reviews).
// ============================================================================

import type { Product } from '@/lib/products';

export default function ProductSchema({ product }: { product: Product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'HUSTLE MANIA',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.outOfStockSizes?.length === product.sizes.length 
        ? 'https://schema.org/OutOfStock' 
        : 'https://schema.org/InStock',
      url: `https://hustlemania.com/shop/${product.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
