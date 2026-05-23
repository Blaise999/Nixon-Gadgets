"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useProducts } from "@/lib/products";
import { formatNaira } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Condition } from "@/lib/types";
import Thumb from "./Thumb";

const budgets = [
  { id: "low",  label: "₦100k – ₦300k",  min: 100_000,    max: 300_000 },
  { id: "mid",  label: "₦300k – ₦600k",  min: 300_000,    max: 600_000 },
  { id: "high", label: "₦600k+",         min: 600_000,    max: Infinity },
];
const needs = [
  { id: "phones",      label: "Phone" },
  { id: "laptops",     label: "Laptop" },
  { id: "gaming",      label: "Gaming" },
  { id: "accessories", label: "Accessories" },
];
const conds: ("Any" | Condition)[] = ["Any", "Brand New", "UK Used"];

export default function BudgetFinder() {
  const products = useProducts((s) => s.products);
  const [budget, setBudget] = useState(budgets[1]);
  const [need, setNeed] = useState(needs[0]);
  const [cond, setCond] = useState<typeof conds[number]>("Any");

  const results = useMemo(() => products
    .filter(p => p.category === need.id)
    .filter(p => p.price >= budget.min && p.price <= budget.max)
    .filter(p => cond === "Any" ? true : p.condition === cond)
    .slice(0, 4),
    [budget, need, cond, products]
  );

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-12 md:py-24">
      <div className="glass-strong rounded-[24px] md:rounded-[28px] border-gradient p-5 sm:p-8 md:p-10 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-60 h-60 rounded-full bg-accent-blue/15 blur-3xl"/>
        <div className="relative">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent-electric mb-2">Smart recommendation</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-2">Find a gadget for your budget.</h2>
          <p className="text-white/55 text-sm md:text-base mb-6 md:mb-8">Tell us how much you have and what you need — we&apos;ll show you the best matches.</p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-7 md:mb-8">
            <PickGroup label="Budget" items={budgets.map(b => ({ id: b.id, label: b.label }))} value={budget.id} onChange={(id) => setBudget(budgets.find(b => b.id === id)!)} />
            <PickGroup label="Need"   items={needs}   value={need.id}   onChange={(id) => setNeed(needs.find(n => n.id === id)!)} />
            <PickGroup label="Condition" items={conds.map(c => ({ id: c, label: c }))} value={cond} onChange={(id) => setCond(id as any)} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${budget.id}-${need.id}-${cond}`}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {results.length === 0 ? (
                <div className="col-span-full text-center py-10 text-white/50 text-sm">
                  No matches yet. Adjust your filters or <Link href="/products" className="underline">browse all</Link>.
                </div>
              ) : results.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`}
                  className="glass rounded-2xl p-3 md:p-4 hover:bg-white/[0.06] transition-colors group">
                  <div className="aspect-square rounded-xl bg-white/[0.03] overflow-hidden mb-2 md:mb-3 group-hover:scale-[1.03] transition-transform">
                    <Thumb src={p.image} alt={p.name} />
                  </div>
                  <div className="text-[9px] md:text-[10px] uppercase text-white/40 tracking-wider">{p.brand}</div>
                  <div className="font-semibold text-xs md:text-sm line-clamp-1">{p.name}</div>
                  <div className="font-display font-bold text-sm mt-1">{formatNaira(p.price)}</div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 text-center">
            <Link href={`/categories/${need.id}`} className="inline-flex items-center gap-1 text-sm text-accent-electric hover:text-white">
              See all {need.label.toLowerCase()}s <ArrowRight size={14}/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PickGroup({ label, items, value, onChange }: { label: string; items: { id: string; label: string }[]; value: string; onChange: (id: string) => void }) {
  return (
    <div>
      <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/40 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => {
          const active = it.id === value;
          return (
            <button key={it.id} onClick={() => onChange(it.id)}
              className={`px-3 md:px-3.5 py-2 rounded-full text-[11px] md:text-xs font-medium transition-all border ${active ? "bg-white text-ink-950 border-white" : "glass border-white/10 text-white/70 hover:text-white"}`}>
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
