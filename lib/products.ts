"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./types";
import { seedProducts } from "./seedProducts";

// Re-export helpers/constants from seed file so other files keep working.
export { HERO_IMAGE, HERO_FLOATING, CATEGORY_IMAGES } from "./seedProducts";

type ProductsState = {
  products: Product[];
  /** Set the single deal-of-week — clears the flag on any others. */
  setDealOfWeek: (id: string) => void;
  /** Toggle featured / best-seller / new-arrival flags. */
  toggleFlag: (id: string, flag: "featured" | "bestSeller" | "newArrival") => void;
  toggleStock: (id: string) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  addProduct: (product: Omit<Product, "id">) => Product;
  deleteProduct: (id: string) => void;
  resetToSeeds: () => void;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const useProducts = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: seedProducts,

      setDealOfWeek: (id) =>
        set((s) => ({
          products: s.products.map((p) => ({ ...p, dealOfWeek: p.id === id })),
        })),

      toggleFlag: (id, flag) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, [flag]: !p[flag] } : p
          ),
        })),

      toggleStock: (id) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, inStock: !p.inStock } : p
          ),
        })),

      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),

      addProduct: (data) => {
        const id = `p_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const slug = data.slug || slugify(data.name) || id;
        const product: Product = { ...data, id, slug };
        set((s) => ({ products: [product, ...s.products] }));
        return product;
      },

      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      resetToSeeds: () => set({ products: seedProducts }),
    }),
    {
      name: "nixon-products",
      version: 3,
    }
  )
);

// Convenience selector that reads the live store snapshot (works outside hooks).
export const getProductBySlug = (slug: string) =>
  useProducts.getState().products.find((p) => p.slug === slug);
