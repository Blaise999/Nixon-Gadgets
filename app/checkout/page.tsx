"use client";
import { useCart } from "@/lib/cart";
import { useOrders } from "@/lib/orders";
import { formatNaira, whatsappLink, STORE_NAME } from "@/lib/utils";
import { Shield, MessageCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const addOrder = useOrders(s => s.addOrder);

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "Lagos",
  });

  useEffect(() => { setMounted(true); }, []);

  // Inject Paystack inline script once
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.PaystackPop) { setPaystackLoaded(true); return; }
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    s.onload = () => setPaystackLoaded(true);
    document.body.appendChild(s);
  }, []);

  if (mounted && items.length === 0) {
    if (typeof window !== "undefined") router.replace("/cart");
    return null;
  }

  const sub = mounted ? subtotal() : 0;
  const delivery = sub > 0 ? 5000 : 0;
  const total = sub + delivery;
  const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  function pay() {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill in all delivery details.");
      return;
    }
    if (!PAYSTACK_KEY) {
      alert("Paystack public key is not configured. Add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY to .env.local");
      return;
    }
    if (!window.PaystackPop) {
      alert("Paystack is still loading. Try again in a second.");
      return;
    }
    setLoading(true);
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: form.email,
      amount: total * 100, // kobo
      currency: "NGN",
      ref: `vc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "name", value: form.name },
          { display_name: "Phone", variable_name: "phone", value: form.phone },
          { display_name: "Address", variable_name: "address", value: `${form.address}, ${form.city}` },
        ],
      },
      callback: (resp: any) => {
        const order = {
          id: `ord_${Date.now()}`,
          reference: resp.reference,
          customer: form,
          items,
          subtotal: sub,
          deliveryFee: delivery,
          total,
          status: "Paid" as const,
          createdAt: new Date().toISOString(),
        };
        addOrder(order);
        clear();
        router.push(`/checkout/success?ref=${resp.reference}`);
      },
      onClose: () => setLoading(false),
    });
    handler.openIframe();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
      <p className="text-white/55 mb-8">Just a few details and you're done.</p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <motion.form
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => { e.preventDefault(); pay(); }}
          className="glass-strong rounded-3xl p-6 md:p-8 space-y-5"
        >
          <div>
            <h2 className="font-display font-bold text-lg mb-1">Delivery details</h2>
            <p className="text-xs text-white/45">We'll send your order confirmation to your email.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Chinedu Okafor" />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" />
            <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="08012345678" />
            <div>
              <label className="text-xs uppercase tracking-wider text-white/40 block mb-2">City</label>
              <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-accent-blue/50">
                {["Lagos","Abuja","Port Harcourt","Ibadan","Kano","Kaduna","Enugu","Benin","Onitsha"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <Field label="Delivery address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} placeholder="House no, street, area" />

          <button type="submit" disabled={loading || !paystackLoaded}
            className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-white text-ink-950 font-semibold text-sm hover:bg-white/90 disabled:opacity-50 transition-all">
            <Lock size={14}/> {loading ? "Opening Paystack…" : `Pay ${formatNaira(total)} with Paystack`}
          </button>
          <p className="text-[11px] text-white/40 text-center flex items-center justify-center gap-1.5">
            <Shield size={12} className="text-accent-electric"/> Payments are securely processed by Paystack. We do not store your card details.
          </p>
          <a href={whatsappLink(`Hi ${STORE_NAME}, I need help before paying.`)} target="_blank" rel="noopener"
            className="block text-center text-sm text-white/60 hover:text-white">
            <MessageCircle size={12} className="inline mr-1 text-[#25D366]"/> Need help before paying? Chat us
          </a>
        </motion.form>

        <aside className="glass rounded-3xl p-6 h-fit">
          <h2 className="font-display font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
            {items.map(it => (
              <div key={it.id} className="flex items-center gap-3 text-sm">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/[0.04] shrink-0">
                  {it.image?.startsWith("http")
                    ? <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-2xl">{it.image}</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="line-clamp-1 font-medium">{it.name}</div>
                  <div className="text-xs text-white/50">Qty {it.qty}</div>
                </div>
                <div className="font-medium">{formatNaira(it.price * it.qty)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-white/60"><span>Subtotal</span><span>{formatNaira(sub)}</span></div>
            <div className="flex justify-between text-white/60"><span>Delivery</span><span>{formatNaira(delivery)}</span></div>
            <div className="flex justify-between pt-2 border-t border-white/10 mt-2">
              <span className="font-semibold">Total</span>
              <span className="font-display font-bold text-lg">{formatNaira(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-white/40 block mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-accent-blue/50 placeholder-white/30" />
    </div>
  );
}
