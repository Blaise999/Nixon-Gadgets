"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, LogOut, ExternalLink } from "lucide-react";
import { LogoMark } from "../Logo";

const links = [
  { href: "/admin",          label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products",  icon: Package },
  { href: "/admin/orders",   label: "Orders",    icon: ShoppingBag },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    if (typeof window !== "undefined") localStorage.removeItem("nixon-admin-auth");
    router.push("/");
    if (typeof window !== "undefined") window.location.reload();
  }

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col glass-strong rounded-3xl p-5 sticky top-4 self-start h-[calc(100vh-2rem)]">
      <div className="mb-8 flex items-center gap-2">
        <LogoMark size={30} />
        <div className="leading-none">
          <div className="font-display font-bold text-[15px]">Nixon</div>
          <div className="text-[9px] uppercase tracking-[0.25em] text-white/45 mt-0.5">Admin</div>
        </div>
      </div>
      <nav className="space-y-1 flex-1">
        {links.map(l => {
          const active = pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href));
          return (
            <Link key={l.href} href={l.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm transition-colors ${active ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              <l.icon size={16} />
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-2 pt-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm text-white/60 hover:text-white hover:bg-white/5">
          <ExternalLink size={14}/> View store
        </Link>
        <button onClick={logout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm text-white/60 hover:text-red-300 hover:bg-red-500/10">
          <LogOut size={14}/> Logout
        </button>
      </div>
    </aside>
  );
}
