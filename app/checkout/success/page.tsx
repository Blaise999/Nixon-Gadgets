"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, MessageCircle, ArrowRight } from "lucide-react";
import { whatsappLink, STORE_NAME } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const ref = params.get("ref") || "—";

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 14 }}
        className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mb-6"
      >
        <Check size={32} className="text-emerald-400" />
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="font-display text-3xl md:text-4xl font-bold mb-3">Payment Successful</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="text-white/60 max-w-md mx-auto mb-6">
        Your order has been received. Our team will confirm delivery details shortly.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="inline-block glass rounded-2xl px-5 py-3 text-sm mb-8">
        <span className="text-white/45">Payment reference:</span>{" "}
        <span className="font-mono font-semibold">{ref}</span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href={whatsappLink(`Hi ${STORE_NAME}, I just paid for an order. Reference: ${ref}`)} target="_blank" rel="noopener"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm">
          <MessageCircle size={16}/> Message Us on WhatsApp
        </a>
        <Link href="/products" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass hover:bg-white/10 text-sm font-medium">
          Continue Shopping <ArrowRight size={14}/>
        </Link>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-white/50">Loading…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
