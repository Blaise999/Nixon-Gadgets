"use client";
import { useMemo, useState } from "react";
import { useProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function AllProductsPage() {
  const products = useProducts((s) => s.products);
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => products
    .filter(p => cat === "all" ? true : p.category === cat)
    .filter(p => q ? p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()) : true),
    [cat, q]
  );

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-10 md:pt-12 pb-20">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent-electric mb-2">All gadgets</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold">Browse Everything</h1>
      </motion.div>

      <div className="mt-7 md:mt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 overflow-x-auto -mx-1 px-1 pb-1">
          {[{ slug: "all", name: "All" }, ...categories].map((c) => {
            const active = cat === c.slug;
            return (
              <button key={c.slug} onClick={() => setCat(c.slug)}
                className={`px-3.5 md:px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${active ? "bg-white text-ink-950 border-white" : "glass border-white/10 text-white/70 hover:text-white"}`}>
                {c.name}
              </button>
            );
          })}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands…"
          className="bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm w-full md:w-72 focus:outline-none focus:border-accent-blue/50" />
      </div>

      <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
      {filtered.length === 0 && <div className="text-center py-20 text-white/50">No products match your search.</div>}
    </div>
  );
}
