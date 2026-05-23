"use client";
import { useCart } from "@/lib/cart";
import { formatNaira, whatsappLink, STORE_NAME } from "@/lib/utils";
import { Trash2, Minus, Plus, ShoppingBag, MessageCircle, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sub = mounted ? subtotal() : 0;
  const delivery = sub > 0 ? 5000 : 0;
  const total = sub + delivery;

  if (mounted && items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-full glass flex items-center justify-center mb-6">
          <ShoppingBag size={28} className="text-white/40" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-white/55 mb-8">Browse our latest gadgets and find something you'll love.</p>
        <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-ink-950 font-semibold text-sm">
          Shop Gadgets <ArrowRight size={16}/>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((it) => (
              <motion.div key={it.id}
                layout
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="glass rounded-3xl p-4 md:p-5 flex items-center gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/[0.04] shrink-0">
                  {it.image?.startsWith("http")
                    ? <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl">{it.image}</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold line-clamp-1">{it.name}</div>
                  {it.variant && <div className="text-xs text-white/50 mt-0.5">{it.variant}</div>}
                  <div className="font-display font-bold mt-1">{formatNaira(it.price)}</div>
                </div>
                <div className="flex items-center gap-2 glass rounded-full p-1">
                  <button onClick={() => updateQty(it.id, it.qty - 1)} className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center"><Minus size={12}/></button>
                  <span className="w-6 text-center text-sm font-semibold">{it.qty}</span>
                  <button onClick={() => updateQty(it.id, it.qty + 1)} className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center"><Plus size={12}/></button>
                </div>
                <button onClick={() => removeItem(it.id)} className="w-9 h-9 rounded-full hover:bg-red-500/15 hover:text-red-300 text-white/40 flex items-center justify-center transition-colors"><Trash2 size={14}/></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <aside className="glass-strong rounded-3xl p-6 h-fit sticky top-20">
          <h2 className="font-display font-bold text-lg mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <Row label="Subtotal" value={formatNaira(sub)} />
            <Row label="Delivery fee" value={formatNaira(delivery)} />
            <div className="border-t border-white/10 pt-3 mt-3">
              <Row label="Total" value={formatNaira(total)} bold />
            </div>
          </div>

          <Link href="/checkout" className="mt-6 w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-white text-ink-950 font-semibold text-sm hover:bg-white/90 transition-all">
            Checkout with Paystack <ArrowRight size={16}/>
          </Link>
          <a href={whatsappLink(`Hi ${STORE_NAME}, I have a question about my cart before paying.`)} target="_blank" rel="noopener"
            className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full glass hover:bg-white/10 text-sm font-medium">
            <MessageCircle size={14} className="text-[#25D366]"/> Chat before paying
          </a>

          <div className="mt-5 flex items-start gap-2 text-[11px] text-white/45 leading-relaxed">
            <Shield size={14} className="text-accent-electric shrink-0 mt-0.5"/>
            <p>Payments are securely processed by Paystack. We do not store your card details.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-semibold" : "text-white/60"}>{label}</span>
      <span className={bold ? "font-display font-bold text-lg" : "font-medium"}>{value}</span>
    </div>
  );
}
