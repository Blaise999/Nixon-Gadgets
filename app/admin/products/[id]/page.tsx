"use client";
import { useParams, useRouter, notFound } from "next/navigation";
import { useProducts } from "@/lib/products";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Star, Flame, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/lib/categories";
import Thumb from "@/components/Thumb";
import { Condition } from "@/lib/types";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const products = useProducts((s) => s.products);
  const updateProduct = useProducts((s) => s.updateProduct);
  const deleteProduct = useProducts((s) => s.deleteProduct);
  const setDealOfWeek = useProducts((s) => s.setDealOfWeek);

  const product = products.find((p) => p.id === id);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "phones",
    condition: "Brand New" as Condition,
    price: "",
    oldPrice: "",
    storage: "",
    color: "",
    stockCount: "",
    inStock: true,
    shortNote: "",
    image: "",
    featured: false,
    bestSeller: false,
    newArrival: false,
    dealOfWeek: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Hydrate the form once the product is found
  useEffect(() => {
    if (!product) return;
    setForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      condition: product.condition,
      price: String(product.price),
      oldPrice: product.oldPrice ? String(product.oldPrice) : "",
      storage: product.storage || "",
      color: product.color || "",
      stockCount: String(product.stockCount ?? 0),
      inStock: product.inStock,
      shortNote: product.shortNote || "",
      image: product.image,
      featured: !!product.featured,
      bestSeller: !!product.bestSeller,
      newArrival: !!product.newArrival,
      dealOfWeek: !!product.dealOfWeek,
    });
  }, [product]);

  if (!product) {
    // Wait one render for the store to hydrate from localStorage
    if (typeof window !== "undefined" && products.length === 0) return null;
    return notFound();
  }

  function set<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (form.dealOfWeek && !product?.dealOfWeek) {
      setDealOfWeek(product!.id);
    }
    updateProduct(product!.id, {
      name: form.name,
      brand: form.brand,
      category: form.category,
      condition: form.condition,
      price: Number(form.price) || 0,
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      storage: form.storage || undefined,
      color: form.color || undefined,
      stockCount: Number(form.stockCount) || 0,
      inStock: form.inStock,
      shortNote: form.shortNote || undefined,
      image: form.image,
      featured: form.featured,
      bestSeller: form.bestSeller,
      newArrival: form.newArrival,
      // dealOfWeek handled above to keep mutual exclusion
      dealOfWeek: form.dealOfWeek,
    });
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 300);
  }

  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-4">
        <ArrowLeft size={14} /> Back to products
      </Link>
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Edit product</h1>
          <p className="text-white/55 text-sm">{product.brand} · {product.condition}</p>
        </div>
        <button
          onClick={() => {
            if (confirm(`Delete "${product.name}"?`)) {
              deleteProduct(product.id);
              router.push("/admin/products");
            }
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-500/15 border border-red-400/30 text-red-300 text-xs font-medium hover:bg-red-500/25"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-3xl p-5 md:p-8 grid lg:grid-cols-[180px_1fr] gap-6"
      >
        {/* Image preview column */}
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
          <p className="text-[10px] text-white/40 leading-relaxed">Paste any direct image URL. Unsplash, Cloudinary, or your own CDN all work.</p>
        </div>

        {/* Form fields */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          <Field full label="Product name" value={form.name} onChange={(v) => set("name", v)} />
          <Field label="Brand" value={form.brand} onChange={(v) => set("brand", v)} />
          <Sel
            label="Category" value={form.category} onChange={(v) => set("category", v)}
            options={categories.map((c) => ({ value: c.slug, label: c.name }))}
          />
          <Sel
            label="Condition" value={form.condition} onChange={(v) => set("condition", v as Condition)}
            options={["Brand New", "UK Used", "Open Box"].map((c) => ({ value: c, label: c }))}
          />
          <Field type="number" label="Price (₦)" value={form.price} onChange={(v) => set("price", v)} />
          <Field type="number" label="Compare-at price (optional)" value={form.oldPrice} onChange={(v) => set("oldPrice", v)} />
          <Field label="Storage (optional)" value={form.storage} onChange={(v) => set("storage", v)} placeholder="256GB" />
          <Field label="Color (optional)" value={form.color} onChange={(v) => set("color", v)} placeholder="Natural Titanium" />
          <Field type="number" label="Stock count" value={form.stockCount} onChange={(v) => set("stockCount", v)} />
          <div>
            <label className="text-xs uppercase tracking-wider text-white/40 block mb-2">Availability</label>
            <button
              type="button"
              onClick={() => set("inStock", !form.inStock)}
              className={`w-full text-left px-4 py-2.5 rounded-2xl border text-sm ${
                form.inStock
                  ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-300"
                  : "bg-red-500/15 border-red-400/30 text-red-300"
              }`}
            >
              {form.inStock ? "✓ In stock" : "✕ Sold out"} (tap to toggle)
            </button>
          </div>
          <Field full label="Short note" value={form.shortNote} onChange={(v) => set("shortNote", v)} placeholder="Sealed, 1-year warranty" />

          {/* Flags */}
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-white/40 block mb-2">Highlights</label>
            <div className="flex flex-wrap gap-2">
              <FlagToggle on={form.featured} onChange={(v) => set("featured", v)} icon={<Star size={13} className={form.featured ? "fill-amber-400" : ""} />} label="Featured" />
              <FlagToggle on={form.bestSeller} onChange={(v) => set("bestSeller", v)} label="Best Seller" />
              <FlagToggle on={form.newArrival} onChange={(v) => set("newArrival", v)} label="New Arrival" />
              <FlagToggle on={form.dealOfWeek} onChange={(v) => set("dealOfWeek", v)} icon={<Flame size={13} className={form.dealOfWeek ? "fill-red-400" : ""} />} label="Deal of the Week" />
            </div>
            {form.dealOfWeek && (
              <p className="text-[11px] text-amber-300/80 mt-2">Setting this will replace the current Deal of the Week.</p>
            )}
          </div>

          <div className="sm:col-span-2 flex items-center gap-3 pt-2">
            <button
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-ink-950 font-semibold text-sm disabled:opacity-50 transition-all"
            >
              <Save size={14} /> {saving ? "Saving…" : saved ? "✓ Saved" : "Save changes"}
            </button>
            <Link href="/admin/products" className="text-sm text-white/60 hover:text-white">Cancel</Link>
          </div>
        </div>
      </motion.form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", full, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; full?: boolean; placeholder?: string }) {
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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent-blue/50"
      >
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
