"use client";
import { useParams, notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { useProducts } from "@/lib/products";
import { formatNaira, whatsappLink, STORE_NAME } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Truck, MessageCircle, Award, Check, ChevronDown, ShoppingBag } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SmartImage from "@/components/SmartImage";

const faqs = [
  { q: "Is this available?",            a: "Yes — if you can see it on the page, it's in stock. Stock count updates after each order." },
  { q: "Can I pay on delivery?",        a: "We currently process payments online via Paystack to keep things safe and fast. You can pay with card, bank transfer, or USSD." },
  { q: "Does it come with warranty?",   a: "Brand new devices come with manufacturer warranty. UK-used devices come with a 30-day store warranty." },
  { q: "Is it brand new or UK-used?",   a: "The condition is shown clearly on the product card. UK-used means imported, lightly used and tested." },
  { q: "Can I inspect before payment?", a: "For pickups in our location, yes — message us on WhatsApp to arrange a time." },
];

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const allProducts = useProducts((s) => s.products);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const product = allProducts.find((p) => p.slug === slug);
  // Wait for client hydration before declaring not-found (Zustand+persist may rehydrate)
  if (!product) {
    if (!hydrated) return null;
    return notFound();
  }

  const addItem = useCart(s => s.addItem);
  const [variant, setVariant] = useState(product.storage || "");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [added, setAdded] = useState(false);

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const waMsg = `Hello ${STORE_NAME}, I'm interested in the ${product.name}${variant ? ` ${variant}` : ""} listed on your website. Is it still available?`;

  function add() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      variant,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-6 md:pt-8 pb-20">
      <div className="text-xs text-white/40 mb-5 md:mb-6">
        <Link href="/" className="hover:text-white">Home</Link> ·{" "}
        <Link href={`/categories/${product.category}`} className="hover:text-white capitalize">{product.category}</Link> ·{" "}
        <span className="text-white/60">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-4 md:p-6 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-accent-blue/15 blur-3xl"/>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-accent-purple/15 blur-3xl"/>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <SmartImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                fallbackLabel={product.name}
              />
            </motion.div>
          </div>
        </motion.div>

        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] uppercase tracking-wider text-white/40">{product.brand}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${
                product.condition === "Brand New" ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/20"
                : product.condition === "UK Used" ? "bg-amber-500/15 text-amber-300 border-amber-400/20"
                : "bg-blue-500/15 text-blue-300 border-blue-400/20"
              }`}>{product.condition}</span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold leading-tight">{product.name}</h1>
            {product.shortNote && <p className="text-white/55 text-sm md:text-base mt-3">{product.shortNote}</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="mt-5 md:mt-6 flex items-baseline gap-3 flex-wrap">
            <span className="font-display font-bold text-3xl md:text-4xl text-gradient">{formatNaira(product.price)}</span>
            {product.oldPrice && <span className="text-white/40 line-through text-base md:text-lg">{formatNaira(product.oldPrice)}</span>}
          </motion.div>

          {product.storage && (
            <div className="mt-5 md:mt-6">
              <div className="text-xs uppercase tracking-wider text-white/40 mb-2">Storage</div>
              <div className="flex gap-2">
                {[product.storage].map(s => (
                  <button key={s} onClick={() => setVariant(s)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border ${variant === s ? "bg-white text-ink-950 border-white" : "glass border-white/10"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {product.stockCount && product.stockCount <= 3 && product.inStock && (
            <div className="mt-4 md:mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Only {product.stockCount} left in stock
            </div>
          )}

          <div className="mt-6 md:mt-7 grid grid-cols-2 gap-3">
            <button onClick={add} disabled={!product.inStock}
              className="relative inline-flex items-center justify-center gap-2 py-3.5 md:py-4 rounded-full bg-white text-ink-950 font-semibold text-sm hover:bg-white/90 disabled:opacity-40 transition-all shadow-lg shadow-white/10">
              <ShoppingBag size={16}/> {product.inStock ? "Add to Cart" : "Sold Out"}
              <AnimatePresence>
                {added && (
                  <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs bg-emerald-500/90 px-2 py-1 rounded-full text-white whitespace-nowrap">
                    Added ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <a href={whatsappLink(waMsg)} target="_blank" rel="noopener"
              className="inline-flex items-center justify-center gap-2 py-3.5 md:py-4 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-white text-sm font-semibold hover:bg-[#25D366]/25 transition-all">
              <MessageCircle size={16} className="text-[#25D366]"/> Ask
            </a>
          </div>
          <p className="text-[11px] text-white/40 text-center mt-3">🔒 Payments are securely processed by Paystack. We do not store your card details.</p>

          <div className="mt-7 md:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { icon: Award, t: "Original" },
              { icon: Shield, t: "Paystack" },
              { icon: Truck, t: "Nationwide" },
              { icon: Check, t: "Warranty" },
            ].map((b, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                className="glass rounded-2xl p-3 flex flex-col items-center gap-1.5">
                <b.icon size={16} className="text-accent-electric" />
                <span className="text-[11px] text-white/70">{b.t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {product.specs && (
        <section className="mt-14 md:mt-24">
          <h2 className="font-display text-xl md:text-2xl font-bold mb-5 md:mb-6">Key Specs</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="glass rounded-2xl p-4">
                <div className="text-[10px] uppercase tracking-wider text-white/40">{k}</div>
                <div className="font-medium text-sm md:text-base mt-1">{v}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {product.whatsInBox && (
        <section className="mt-10 md:mt-12">
          <h2 className="font-display text-xl md:text-2xl font-bold mb-5 md:mb-6">What&apos;s in the box</h2>
          <div className="glass rounded-3xl p-5 md:p-6">
            <ul className="space-y-3">
              {product.whatsInBox.map((it, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-sm md:text-base">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0"><Check size={12} className="text-emerald-400"/></span>
                  <span>{it}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="mt-14 md:mt-16">
        <h2 className="font-display text-xl md:text-2xl font-bold mb-5 md:mb-6">Buyer questions</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <button key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full text-left glass rounded-2xl px-5 py-4 hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-sm md:text-base">{f.q}</span>
                <ChevronDown size={16} className={`shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </div>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <p className="text-sm text-white/60 pt-3">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16 md:mt-20">
          <h2 className="font-display text-xl md:text-2xl font-bold mb-5 md:mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
