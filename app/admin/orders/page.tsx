"use client";
import { useOrders } from "@/lib/orders";
import { OrderStatus } from "@/lib/types";
import { formatNaira, whatsappLink } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import Thumb from "@/components/Thumb";

const statuses: OrderStatus[] = ["Pending", "Paid", "Processing", "Out for delivery", "Delivered", "Cancelled"];

const statusColor: Record<string, string> = {
  Pending: "bg-amber-500/15 text-amber-300 border-amber-400/20",
  Paid: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  Processing: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  "Out for delivery": "bg-purple-500/15 text-purple-300 border-purple-400/20",
  Delivered: "bg-green-500/15 text-green-300 border-green-400/20",
  Cancelled: "bg-red-500/15 text-red-300 border-red-400/20",
};

export default function AdminOrdersPage() {
  const { orders, updateStatus } = useOrders();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);

  const items = mounted ? (filter === "all" ? orders : orders.filter((o) => o.status === filter)) : [];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-1">Orders</h1>
      <p className="text-white/55 text-sm mb-6">Click an order to expand customer details and update status.</p>

      <div className="flex flex-wrap gap-2 mb-5 overflow-x-auto">
        {(["all", ...statuses] as const).map((s) => {
          const active = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                active ? "bg-white text-ink-950 border-white" : "glass border-white/10 text-white/70"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {items.length === 0 && <div className="text-center py-16 text-white/40 text-sm">No orders found.</div>}
        {items.map((o) => {
          const isOpen = expanded === o.id;
          return (
            <motion.div key={o.id} layout className="glass rounded-3xl overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : o.id)}
                className="w-full grid grid-cols-[1fr_auto] md:grid-cols-[1fr_140px_120px_140px_30px] gap-3 items-center px-4 md:px-5 py-3.5 hover:bg-white/[0.03] transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] overflow-hidden shrink-0">
                    <Thumb src={o.items[0]?.image} alt={o.items[0]?.name} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm line-clamp-1">{o.customer.name}</div>
                    <div className="text-xs text-white/50 line-clamp-1">{o.reference} · {o.items.length} item{o.items.length > 1 ? "s" : ""}</div>
                  </div>
                </div>
                <div className="hidden md:block text-xs text-white/55">{new Date(o.createdAt).toLocaleDateString()}</div>
                <div className="hidden md:block font-display font-semibold text-sm">{formatNaira(o.total)}</div>
                <div className="hidden md:block">
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${statusColor[o.status]}`}>{o.status}</span>
                </div>
                <ChevronDown size={14} className={`text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 px-4 md:px-5 py-5 grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white/40 mb-3">Customer</h4>
                        <Detail label="Name" value={o.customer.name} />
                        <Detail label="Email" value={o.customer.email} />
                        <Detail label="Phone" value={o.customer.phone} />
                        <Detail label="Address" value={`${o.customer.address}, ${o.customer.city}`} />
                        <a
                          href={whatsappLink(`Hi ${o.customer.name}, this is regarding your order ${o.reference}.`)}
                          target="_blank" rel="noopener"
                          className="inline-flex items-center gap-1.5 mt-4 px-3.5 py-2 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-xs"
                        >
                          <MessageCircle size={12} className="text-[#25D366]" /> Message customer
                        </a>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white/40 mb-3">Items</h4>
                        {o.items.map((it) => (
                          <div key={it.id} className="flex items-center gap-3 py-1.5">
                            <div className="w-8 h-8 rounded-lg bg-white/[0.04] overflow-hidden">
                              <Thumb src={it.image} alt={it.name} />
                            </div>
                            <div className="flex-1 line-clamp-1">{it.name} <span className="text-white/40">× {it.qty}</span></div>
                            <div className="font-medium">{formatNaira(it.price * it.qty)}</div>
                          </div>
                        ))}
                        <div className="border-t border-white/10 mt-3 pt-3 space-y-1.5">
                          <div className="flex justify-between text-xs"><span className="text-white/55">Subtotal</span><span>{formatNaira(o.subtotal)}</span></div>
                          <div className="flex justify-between text-xs"><span className="text-white/55">Delivery</span><span>{formatNaira(o.deliveryFee)}</span></div>
                          <div className="flex justify-between font-semibold pt-1"><span>Total</span><span className="font-display">{formatNaira(o.total)}</span></div>
                        </div>

                        <h4 className="text-xs uppercase tracking-wider text-white/40 mt-5 mb-2">Update status</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {statuses.map((s) => (
                            <button
                              key={s}
                              onClick={() => updateStatus(o.id, s)}
                              className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full border ${
                                o.status === s ? statusColor[s] : "border-white/10 text-white/50 hover:text-white"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-1.5 flex gap-3 text-sm">
      <div className="text-white/45 w-20 shrink-0">{label}</div>
      <div className="text-white/85">{value}</div>
    </div>
  );
}
