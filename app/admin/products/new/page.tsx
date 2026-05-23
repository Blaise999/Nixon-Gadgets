"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Star, Flame } from "lucide-react";
import { categories } from "@/lib/categories";
import { motion } from "framer-motion";
import { useProducts } from "@/lib/products";
import { Condition } from "@/lib/types";
import Thumb from "@/components/Thumb";

export default function NewProductPage() {
  const router = useRouter();
  const addProduct = useProducts((s) => s.addProduct);
  const setDealOfWeek = useProducts((s) => s.setDealOfWeek);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "phones",
    price: "",
    oldPrice: "",
    condition: "Brand New" as Condition,
    storage: "",
    color: "",
    stockCount: "5",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200&q=80&auto=format&fit=crop",
    shortNote: "",
    featured: false,
    bestSeller: false,
    newArrival: true,
    dealOfWeek: false,
  });
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.brand || !form.price) {
      alert("Please fill in name, brand and price.");
      return;
    }
    setSaving(true);
    const created = addProduct({
      slug: "",
      name: form.name,
      brand: form.brand,
      category: form.category,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      condition: form.condition,
      storage: form.storage || undefined,
      color: form.color || undefined,
      stockCount: Number(form.stockCount) || 1,
      inStock: true,
      featured: form.featured,
      bestSeller: form.bestSeller,
      newArrival: form.newArrival,
      image: form.image,
      shortNote: form.shortNote || undefined,
    });
    if (form.dealOfWeek) setDealOfWeek(created.id);
    setTimeout(() => router.push("/admin/products"), 400);
  }

  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-4">
        <ArrowLeft size={14} /> Back to products
      </Link>
      <h1 className="font-display text-3xl font-bold mb-1">Add product</h1>
      <p className="text-white/55 text-sm mb-6">Drop in a name, brand, price, and image URL. You can star it as featured or set it as the Deal of the Week.</p>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-3xl p-5 md:p-8 grid lg:grid-cols-[180px_1fr] gap-6"
      >
        {/* Live preview */}
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl bg-white/[0.04] overflow-hidden">
            <Thumb src={form.image} alt={form.name} />
          </div>
          <label className="text-[10px] uppercase tracking-wider text-white/40 block">Image URL</label>
          <input
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="https://images.unsplash.com/…"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent-blue/50"
          />
          <p className="text-[10px] text-white/40 leading-relaxed">
            Find free product photos at <a href="https://unsplash.com" target="_blank" rel="noopener" className="underline">unsplash.com</a> or <a href="https://www.pexels.com" target="_blank" rel="noopener" className="underline">pexels.com</a>. Right-click → Copy image address.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          <Field full label="Product name" value={form.name} onChange={(v) => set("name", v)} placeholder="iPhone 15 Pro Max" />
          <Field label="Brand" value={form.brand} onChange={(v) => set("brand", v)} placeholder="Apple" />
          <Sel label="Category" value={form.category} onChange={(v) => set("category", v)} options={categories.map((c) => ({ value: c.slug, label: c.name }))} />
          <Sel label="Condition" value={form.condition} onChange={(v) => set("condition", v as Condition)} options={["Brand New", "UK Used", "Open Box"].map((c) => ({ value: c, label: c }))} />
          <Field type="number" label="Price (₦)" value={form.price} onChange={(v) => set("price", v)} placeholder="1850000" />
          <Field type="number" label="Compare-at price (optional)" value={form.oldPrice} onChange={(v) => set("oldPrice", v)} placeholder="1950000" />
          <Field label="Storage (optional)" value={form.storage} onChange={(v) => set("storage", v)} placeholder="256GB" />
          <Field label="Color (optional)" value={form.color} onChange={(v) => set("color", v)} placeholder="Natural Titanium" />
          <Field type="number" label="Stock count" value={form.stockCount} onChange={(v) => set("stockCount", v)} placeholder="5" />
          <Field full label="Short note" value={form.shortNote} onChange={(v) => set("shortNote", v)} placeholder="Sealed, 1-year warranty" />

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-white/40 block mb-2">Highlights</label>
            <div className="flex flex-wrap gap-2">
              <FlagToggle on={form.featured} onChange={(v) => set("featured", v)} icon={<Star size={13} className={form.featured ? "fill-amber-400" : ""} />} label="Featured" />
              <FlagToggle on={form.bestSeller} onChange={(v) => set("bestSeller", v)} label="Best Seller" />
              <FlagToggle on={form.newArrival} onChange={(v) => set("newArrival", v)} label="New Arrival" />
              <FlagToggle on={form.dealOfWeek} onChange={(v) => set("dealOfWeek", v)} icon={<Flame size={13} className={form.dealOfWeek ? "fill-red-400" : ""} />} label="Deal of the Week" />
            </div>
          </div>

          <div className="sm:col-span-2 flex items-center gap-3 pt-2">
            <button disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-ink-950 font-semibold text-sm disabled:opacity-50">
              <Save size={14} /> {saving ? "Saving…" : "Save product"}
            </button>
            <Link href="/admin/products" className="text-sm text-white/60 hover:text-white">Cancel</Link>
          </div>
        </div>
      </motion.form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", full }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-xs uppercase tracking-wider text-white/40 block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent-blue/50 placeholder-white/25"
      />
    </div>
  );
}

function Sel({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-white/40 block mb-2">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent-blue/50">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function FlagToggle({ on, onChange, icon, label }: { on: boolean; onChange: (v: boolean) => void; icon?: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full border transition-all ${
        on ? "bg-white/10 border-white/30 text-white" : "border-white/10 text-white/50 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
