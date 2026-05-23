import Link from "next/link";
import { STORE_NAME, WHATSAPP_NUMBER } from "@/lib/utils";
import { categories } from "@/lib/categories";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20 bg-ink-900/40">
      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="mb-4"><Logo size={36} /></div>
          <p className="text-sm text-white/50 leading-relaxed">Premium gadgets, original devices, secure Paystack checkout, and instant WhatsApp support. Nationwide delivery.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 text-white/80">Shop</h4>
          <ul className="space-y-2 text-sm text-white/50">
            {categories.map(c => <li key={c.slug}><Link href={`/categories/${c.slug}`} className="hover:text-white">{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 text-white/80">Support</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-white">WhatsApp Us</a></li>
            <li><Link href="/products" className="hover:text-white">Browse All</Link></li>
            <li><Link href="/admin" className="hover:text-white">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 text-white/80">Trust</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li>🔒 Secure Paystack checkout</li>
            <li>📦 Nationwide delivery</li>
            <li>✓ Original devices only</li>
            <li>🛡️ Warranty on selected items</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {STORE_NAME}. Built for gadget lovers.
      </div>
    </footer>
  );
}
