"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useProducts } from "@/lib/products";
import { formatNaira } from "@/lib/utils";
import { Plus, Search, Edit3, Star, Trash2, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Thumb from "@/components/Thumb";

export default function AdminProductsPage() {
  const products = useProducts((s) => s.products);
  const toggleStock = useProducts((s) => s.toggleStock);
  const toggleFlag = useProducts((s) => s.toggleFlag);
  const deleteProduct = useProducts((s) => s.deleteProduct);
  const setDealOfWeek = useProducts((s) => s.setDealOfWeek);

  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);

  const items = mounted ? products : [];
  const filtered = items.filter(
    (p) => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Products</h1>
          <p className="text-white/55 text-sm mt-1">Edit, add, or feature products. All changes persist locally.</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-ink-950 font-semibold text-sm shrink-0">
          <Plus size={14} /> Add product
        </Link>
      </div>

      <div className="glass rounded-2xl flex items-center gap-3 px-4 mb-5">
        <Search size={16} className="text-white/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          className="flex-1 bg-transparent py-3 text-sm focus:outline-none placeholder-white/30"
        />
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_120px_120px_120px_120px_120px] gap-3 px-5 py-3 border-b border-white/10 text-[10px] uppercase tracking-wider text-white/45 font-semibold">
          <div>Product</div><div>Condition</div><div>Stock</div><div>Price</div><div>Flags</div><div>Actions</div>
        </div>

        <AnimatePresence initial={false}>
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ delay: i * 0.02 }}
              className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_120px_120px_120px_120px_120px] gap-3 items-center px-4 md:px-5 py-3 md:py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
            >
              {/* product */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] overflow-hidden shrink-0">
                  <Thumb src={p.image} alt={p.name} />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm line-clamp-1">{p.name}</div>
                  <div className="text-xs text-white/50">{p.brand}{p.storage ? ` · ${p.storage}` : ""}</div>
                  {/* mobile-only extras */}
                  <div className="md:hidden flex items-center gap-2 mt-1.5 text-[10px]">
                    <span className="text-white/45">{p.condition}</span>
                    <span className="font-display font-semibold text-white/85">{formatNaira(p.price)}</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:block text-xs text-white/70">{p.condition}</div>

              <div className="hidden md:block">
                <button
                  onClick={() => toggleStock(p.id)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                    p.inStock
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/20"
                      : "bg-red-500/15 text-red-300 border-red-400/20"
                  }`}
                >
                  {p.inStock ? `${p.stockCount ?? "—"} left` : "Sold out"}
                </button>
              </div>

              <div className="hidden md:block font-display font-semibold text-sm">{formatNaira(p.price)}</div>

              {/* Flags */}
              <div className="hidden md:flex items-center gap-1">
                <button
                  onClick={() => toggleFlag(p.id, "featured")}
                  title="Toggle featured"
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    p.featured ? "bg-amber-500/20 text-amber-300" : "hover:bg-white/5 text-white/40"
                  }`}
                >
                  <Star size={13} className={p.featured ? "fill-amber-400" : ""} />
                </button>
                <button
                  onClick={() => setDealOfWeek(p.id)}
                  title="Set as Deal of Week"
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    p.dealOfWeek ? "bg-red-500/20 text-red-300" : "hover:bg-white/5 text-white/40"
                  }`}
                >
                  <Flame size={13} className={p.dealOfWeek ? "fill-red-400" : ""} />
                </button>
              </div>

              <div className="flex items-center gap-1.5 md:justify-end">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full glass hover:bg-white/10"
                  title="Edit"
                >
                  <Edit3 size={13} />
                </Link>
                <button
                  onClick={() => setPendingDelete(p.id)}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-red-500/15 text-white/50 hover:text-red-300 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/45 text-sm">No products match your search.</div>
        )}
      </div>

      {/* Delete confirm */}
      <AnimatePresence>
        {pendingDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setPendingDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-6 max-w-md w-full"
            >
              <h3 className="font-display font-bold text-xl mb-2">Delete product?</h3>
              <p className="text-white/55 text-sm mb-5">This removes it from your store. You can re-add it later.</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setPendingDelete(null)}
                  className="px-4 py-2 rounded-full glass hover:bg-white/10 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteProduct(pendingDelete!);
                    setPendingDelete(null);
                  }}
                  className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
