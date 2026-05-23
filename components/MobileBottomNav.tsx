"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { whatsappLink, STORE_NAME } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count } = useCart();
  const [c, setC] = useState(0);
  useEffect(() => { setC(count()); }, [count]);

  if (pathname?.startsWith("/admin")) return null;

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Shop", icon: Grid3X3 },
    { href: "/cart", label: "Cart", icon: ShoppingBag, badge: c },
    { href: whatsappLink(`Hi ${STORE_NAME}, I have a question.`), label: "Chat", icon: MessageCircle, external: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-ink-950/90 backdrop-blur-xl border-t border-white/5 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4 px-2">
        {items.map(it => {
          const active = !it.external && pathname === it.href;
          const Icon = it.icon;
          const inner = (
            <div className={`flex flex-col items-center justify-center py-3 relative ${active ? "text-accent-electric" : "text-white/60"}`}>
              <Icon size={20} />
              <span className="text-[10px] mt-1 font-medium">{it.label}</span>
              {it.badge ? (
                <span className="absolute top-2 right-1/2 translate-x-4 min-w-[16px] h-[16px] px-1 rounded-full bg-accent-electric text-[9px] font-bold flex items-center justify-center text-white">{it.badge}</span>
              ) : null}
              {active && <span className="absolute top-0 w-8 h-[2px] bg-accent-electric rounded-full" />}
            </div>
          );
          return it.external
            ? <a key={it.label} href={it.href} target="_blank" rel="noopener">{inner}</a>
            : <Link key={it.label} href={it.href}>{inner}</Link>;
        })}
      </div>
    </nav>
  );
}
