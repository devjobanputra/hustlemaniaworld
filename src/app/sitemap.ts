import { MetadataRoute } from 'next';
import { getProductsByCategory } from '@/lib/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hustlemania.com';

  // Static routes
  const routes = [
    '',
    '/shop',
    '/shop?category=tees',
    '/shop?category=hoodies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product routes
  try {
    const products = await getProductsByCategory('all');
    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/shop/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    return routes;
  }
}
