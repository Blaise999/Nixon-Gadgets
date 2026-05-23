"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { categories } from "@/lib/categories";
import { Logo } from "./Logo";

export default function Header() {
  const { count, bump } = useCart();
  const [bumped, setBumped] = useState(false);
  const [open, setOpen] = useState(false);
  const [c, setC] = useState(0);

  useEffect(() => { setC(count()); }, [count, bump]);
  useEffect(() => {
    if (bump === 0) return;
    setBumped(true);
    const t = setTimeout(() => setBumped(false), 500);
    return () => clearTimeout(t);
  }, [bump]);

  // Lock body scroll + close on ESC when menu is open.
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = original;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-ink-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Logo size={34} />

          <nav className="hidden md:flex items-center gap-7 text-sm text-white/70">
            {categories.slice(0, 5).map((cat) => (
              <Link key={cat.slug} href={`/categories/${cat.slug}`} className="hover:text-white transition-colors">{cat.name}</Link>
            ))}
            <Link href="/products" className="hover:text-white transition-colors">All</Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/products" className="hidden md:flex items-center gap-2 text-sm text-white/60 glass px-3 py-2 rounded-full hover:text-white transition-colors">
              <Search size={16} /> Search gadgets
            </Link>
            <Link href="/cart" className="relative w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
              <motion.div animate={bumped ? { scale: [1, 1.3, 0.95, 1.05, 1], rotate: [0, -8, 6, -3, 0] } : {}} transition={{ duration: 0.5 }}>
                <ShoppingBag size={18} />
              </motion.div>
              {c > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent-electric text-[10px] font-bold flex items-center justify-center text-white">{c}</span>
              )}
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              type="button"
              className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center active:scale-95 transition-transform"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — rendered OUTSIDE <header> so it's not trapped by the
          sticky/backdrop-blur stacking context. z-[60] sits above the header (z-40)
          and the floating WhatsApp/mobile-bottom-nav (z-30). */}
      <AnimatePresence>
        {open && (
          <>
            {/* dim backdrop */}
            <motion.button
              key="scrim"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="fixed inset-0 z-[55] bg-ink-950/70 backdrop-blur-md md:hidden"
            />
            {/* slide-in panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-[60] w-[85vw] max-w-sm bg-ink-950 border-l border-white/10 md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <Logo size={30} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  type="button"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center active:scale-95 transition-transform"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <Link
                  onClick={() => setOpen(false)}
                  href="/products"
                  className="flex items-center gap-3 p-3.5 glass rounded-2xl active:bg-white/10 transition-colors"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">🛍️</span>
                  <div>
                    <div className="font-semibold text-sm">All Gadgets</div>
                    <div className="text-xs text-white/50">Browse everything we stock</div>
                  </div>
                </Link>
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.slug}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.03, duration: 0.25 }}
                  >
                    <Link
                      onClick={() => setOpen(false)}
                      href={`/categories/${cat.slug}`}
                      className="flex items-center gap-3 p-3.5 glass rounded-2xl active:bg-white/10 transition-colors"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <div className="font-semibold text-sm">{cat.name}</div>
                        <div className="text-xs text-white/50">{cat.tagline}</div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                <Link
                  onClick={() => setOpen(false)}
                  href="/admin"
                  className="block text-center text-xs text-white/40 mt-6 py-4 hover:text-white/60"
                >
                  Admin →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
