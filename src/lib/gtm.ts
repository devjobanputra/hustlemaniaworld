'use client';

// ============================================================================
// Hustle Mania — Google Tag Manager Utility
// Standardized events for e-commerce tracking in the 3D environment.
// ============================================================================

type GTMEvent = {
  event: string;
  [key: string]: any;
};

export const pushToDataLayer = (evt: GTMEvent) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push(evt);
  } else {
    // In dev, log to console for verification
    if (process.env.NODE_ENV === 'development') {
      console.log('GTM Event (Simulated):', evt);
    }
  }
};

// Ecommerce Events
export const trackViewItem = (product: any) => {
  pushToDataLayer({
    event: 'view_item',
    ecommerce: {
      currency: 'INR',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1,
        },
      ],
    },
  });
};

export const trackAddToCart = (product: any, size: string, quantity: number = 1) => {
  pushToDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'INR',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          item_variant: size,
          price: product.price,
          quantity,
        },
      ],
    },
  });
};
