"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag } from "lucide-react";

export default function MobileTabBar() {
  const pathname = usePathname();
  const links = [
    { href: "/admin", label: "Dash", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-ink-950/90 backdrop-blur-xl border-t border-white/5 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 px-2">
        {links.map(l => {
          const active = pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href));
          return (
            <Link key={l.href} href={l.href}
              className={`flex flex-col items-center py-3 ${active ? "text-accent-electric" : "text-white/60"}`}>
              <l.icon size={18}/>
              <span className="text-[10px] mt-1">{l.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
