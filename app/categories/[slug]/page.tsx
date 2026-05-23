"use client";
import { useParams, notFound } from "next/navigation";
import { categoryBySlug } from "@/lib/categories";
import { useProducts, CATEGORY_IMAGES } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CategorySpotlight from "@/components/CategorySpotlight";
import SmartImage from "@/components/SmartImage";
import Link from "next/link";
import { ArrowLeft, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Condition } from "@/lib/types";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = categoryBySlug(slug);
  const allProducts = useProducts((s) => s.products);
  const [sort, setSort] = useState<"featured" | "low" | "high" | "new">("featured");
  const [condFilter, setCondFilter] = useState<"all" | Condition>("all");

  if (!cat) return notFound();

  const items = useMemo(() => {
    let list = allProducts.filter((p) => p.category === slug);
    if (condFilter !== "all") list = list.filter((p) => p.condition === condFilter);
    switch (sort) {
      case "low":      list = [...list].sort((a, b) => a.price - b.price); break;
      case "high":     list = [...list].sort((a, b) => b.price - a.price); break;
      case "new":      list = [...list].sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival)); break;
      default:         list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  }, [allProducts, slug, sort, condFilter]);

  const totalInCategory = allProducts.filter((p) => p.category === slug).length;

  return (
    <div className="pt-6 md:pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-5"><ArrowLeft size={14}/> Back home</Link>

        {/* Category hero — image + headline overlaid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-10 md:mb-14 h-[200px] md:h-[280px]"
        >
          <SmartImage
            src={CATEGORY_IMAGES[slug] || ""}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover opacity-55"
            fallbackLabel={cat.name}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-ink-950/70 to-ink-950/20" />
          <div className={`absolute -top-12 -right-12 w-72 h-72 rounded-full bg-gradient-to-br ${cat.accent} blur-3xl`} />
          <div className="relative h-full flex flex-col justify-end p-6 md:p-10">
            <div className="text-4xl md:text-5xl mb-3">{cat.icon}</div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-1.5">{cat.name}</h1>
            <p className="text-white/65 text-sm md:text-base max-w-xl">{cat.tagline}</p>
            <div className="mt-3 text-xs text-white/45">{totalInCategory} {totalInCategory === 1 ? "product" : "products"} available</div>
          </div>
        </motion.div>
      </div>

      {/* Category-specific feature row */}
      <CategorySpotlight slug={slug} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Filters & sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-white/40" />
            {(["all", "Brand New", "UK Used", "Open Box"] as const).map((c) => {
              const active = c === condFilter;
              return (
                <button
                  key={c}
                  onClick={() => setCondFilter(c)}
                  className={`px-3 py-1.5 rounded-full text-[11px] md:text-xs font-medium border transition-all ${active ? "bg-white text-ink-950 border-white" : "glass border-white/10 text-white/70 hover:text-white"}`}
                >
                  {c === "all" ? "All" : c}
                </button>
              );
            })}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="self-start sm:self-auto bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-accent-blue/50"
          >
            <option value="featured">Featured first</option>
            <option value="new">New arrivals</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 text-white/50">No products match your filters.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
