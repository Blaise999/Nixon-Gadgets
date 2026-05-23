"use client";
import { useOrders } from "@/lib/orders";
import { useProducts } from "@/lib/products";
import { formatNaira } from "@/lib/utils";
import { motion } from "framer-motion";
import { TrendingUp, ShoppingBag, Package, AlertCircle, Flame } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Thumb from "@/components/Thumb";

const statusColor: Record<string, string> = {
  Pending: "bg-amber-500/15 text-amber-300 border-amber-400/20",
  Paid: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  Processing: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  "Out for delivery": "bg-purple-500/15 text-purple-300 border-purple-400/20",
  Delivered: "bg-green-500/15 text-green-300 border-green-400/20",
  Cancelled: "bg-red-500/15 text-red-300 border-red-400/20",
};

export default function AdminDashboard() {
  const orders = useOrders((s) => s.orders);
  const products = useProducts((s) => s.products);
  const setDealOfWeek = useProducts((s) => s.setDealOfWeek);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ord = mounted ? orders : [];
  const revenue = ord
    .filter((o) => o.status !== "Cancelled" && o.status !== "Pending")
    .reduce((s, o) => s + o.total, 0);
  const paidCount = ord.filter((o) => o.status !== "Pending" && o.status !== "Cancelled").length;
  const pendingCount = ord.filter((o) => o.status === "Pending").length;
  const lowStock = products.filter((p) => p.stockCount && p.stockCount <= 3 && p.inStock).length;
  const deal = products.find((p) => p.dealOfWeek);

  const stats = [
    { label: "Total revenue", value: formatNaira(revenue), icon: TrendingUp, accent: "from-emerald-500/20 to-emerald-700/0" },
    { label: "Paid orders", value: String(paidCount), icon: ShoppingBag, accent: "from-blue-500/20 to-blue-700/0" },
    { label: "Pending", value: String(pendingCount), icon: AlertCircle, accent: "from-amber-500/20 to-amber-700/0" },
    { label: "Low-stock items", value: String(lowStock), icon: Package, accent: "from-purple-500/20 to-purple-700/0" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-white/55 text-sm mt-1">A quick look at your store today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="relative overflow-hidden glass rounded-2xl p-5"
          >
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.accent} blur-2xl`} />
            <s.icon size={18} className="text-white/50 mb-3" />
            <div className="text-xs text-white/55">{s.label}</div>
            <div className="font-display font-bold text-2xl mt-1">{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Deal of Week selector */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 relative overflow-hidden glass-strong rounded-3xl p-5 md:p-6 border border-red-400/10"
      >
        <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-red-500/15 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Flame size={16} className="text-red-300" />
            <h2 className="font-display font-bold text-lg">Deal of the Week</h2>
          </div>
          <p className="text-white/55 text-sm mb-4">
            {deal ? <>Currently highlighting <span className="text-white font-medium">{deal.name}</span> on the homepage.</> : "No deal set. Pick one to highlight on the homepage."}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {products.slice(0, 12).map((p) => {
              const active = p.id === deal?.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setDealOfWeek(p.id)}
                  className={`relative text-left rounded-2xl overflow-hidden transition-all border ${
                    active
                      ? "border-red-400/60 ring-2 ring-red-400/40"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="aspect-square bg-white/[0.04]">
                    <Thumb src={p.image} alt={p.name} />
                  </div>
                  <div className="p-2">
                    <div className="text-[10px] text-white/45 line-clamp-1">{p.brand}</div>
                    <div className="text-[11px] font-semibold line-clamp-1">{p.name}</div>
                  </div>
                  {active && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white font-bold">★</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid lg:grid-cols-[1fr_400px] gap-5">
        <div className="glass rounded-3xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-lg">Recent orders</h2>
            <Link href="/admin/orders" className="text-xs text-accent-electric hover:text-white">View all →</Link>
          </div>
          <div className="space-y-2">
            {ord.length === 0 && <div className="text-center py-10 text-white/40 text-sm">No orders yet.</div>}
            {ord.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] overflow-hidden shrink-0">
                  <Thumb src={o.items[0]?.image} alt={o.items[0]?.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium line-clamp-1">{o.customer.name}</div>
                  <div className="text-xs text-white/50 line-clamp-1">{o.items.length} item{o.items.length > 1 ? "s" : ""} · {o.customer.city}</div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-sm">{formatNaira(o.total)}</div>
                  <span className={`inline-block mt-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColor[o.status]}`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <h2 className="font-display font-bold text-lg mb-5">Inventory snapshot</h2>
          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] overflow-hidden">
                  <Thumb src={p.image} alt={p.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium line-clamp-1">{p.name}</div>
                  <div className="text-[11px] text-white/45">{p.brand} · {p.condition}</div>
                </div>
                <div className={`text-xs font-semibold ${p.stockCount && p.stockCount <= 3 ? "text-amber-300" : "text-white/60"}`}>
                  {p.inStock ? `${p.stockCount ?? "—"} left` : "Sold out"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
