// ============================================
// Hustle Mania — Cart Store (Zustand)
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductSize, CartItem } from '@/lib/products';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  justAdded: boolean;

  // Actions
  addItem: (product: Product, size: ProductSize, quantity?: number) => void;
  removeItem: (productId: string, size: ProductSize) => void;
  updateQuantity: (productId: string, size: ProductSize, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      justAdded: false,

      addItem: (product, size, quantity = 1) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id && item.size === size
        );

        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          set({ items: updated, isOpen: true, justAdded: true });
        } else {
          set({
            items: [...items, { product, size, quantity }],
            isOpen: true,
            justAdded: true,
          });
        }

        // Reset justAdded after animation
        setTimeout(() => set({ justAdded: false }), 700);
      },

      removeItem: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        });
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        const updated = get().items.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        );
        set({ items: updated });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
    }),
    {
      name: 'hustle-mania-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
