"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./types";

type CartState = {
  items: CartItem[];
  bump: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      bump: 0,
      addItem: (item) => set((state) => {
        const id = `${item.productId}-${item.variant || "default"}`;
        const existing = state.items.find(i => i.id === id);
        if (existing) {
          return {
            items: state.items.map(i => i.id === id ? { ...i, qty: i.qty + item.qty } : i),
            bump: state.bump + 1,
          };
        }
        return { items: [...state.items, { ...item, id }], bump: state.bump + 1 };
      }),
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      updateQty: (id, qty) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i),
      })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
    }),
    { name: "nixon-cart", version: 2 }
  )
);
