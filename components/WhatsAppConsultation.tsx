"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink, STORE_NAME } from "@/lib/utils";

export default function WhatsAppConsultation() {
  const msg = `Hi ${STORE_NAME}, I'd like a recommendation. My budget is ₦___ and I need a ___.`;
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="relative overflow-hidden rounded-[24px] md:rounded-[28px] glass-strong p-7 sm:p-10 md:p-14 text-center"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-full bg-[#25D366]/15 blur-3xl" />
        <div className="relative">
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#25D366]/15 flex items-center justify-center">
            <MessageCircle size={22} className="text-[#25D366]" />
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-3">Not sure what to buy?</h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-7 md:mb-8">
            Tell us your budget — we&apos;ll recommend the best phone, laptop, or gadget for you. No pressure, no spam.
          </p>
          <a href={whatsappLink(msg)} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 md:py-4 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-2xl shadow-[#25D366]/30">
            <MessageCircle size={16}/> Get a Recommendation on WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
