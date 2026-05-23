"use client";
import Link from "next/link";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";

export default function ProductRow({ title, kicker, products, href }: {
  title: string; kicker?: string; products: Product[]; href?: string;
}) {
  if (!products.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          {kicker && <p className="text-xs uppercase tracking-[0.2em] text-accent-electric mb-2">{kicker}</p>}
          <h2 className="font-display text-2xl md:text-3xl font-bold">{title}</h2>
        </div>
        {href && <Link href={href} className="hidden md:inline-flex items-center gap-1 text-sm text-white/60 hover:text-white">View all <ArrowRight size={14}/></Link>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}
