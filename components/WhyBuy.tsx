"use client";
import { motion } from "framer-motion";
import { Shield, Truck, MessageCircle, Award, Check, Zap } from "lucide-react";

const items = [
  { icon: Award,        title: "Original gadgets",     desc: "Every device is checked before listing." },
  { icon: Shield,       title: "Secure Paystack",      desc: "Pay safely with cards, bank or USSD." },
  { icon: Truck,        title: "Nationwide delivery",  desc: "Lagos in 24h. Anywhere in Nigeria 2-3 days." },
  { icon: MessageCircle,title: "WhatsApp support",     desc: "Ask anything before you buy." },
  { icon: Zap,          title: "Same-day dispatch",    desc: "Order early, ship the same day." },
  { icon: Check,        title: "Warranty included",    desc: "Warranty on selected products." },
];

export default function WhyBuy() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-12 md:py-24">
      <div className="text-center mb-10 md:mb-12">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent-electric mb-2">Why buy from us</p>
        <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight">Beautiful enough to impress.<br className="md:hidden"/> Human enough to trust.</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="glass rounded-2xl p-4 md:p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center mb-3 md:mb-4">
              <it.icon size={18} className="text-accent-electric" />
            </div>
            <h3 className="font-semibold text-sm md:text-base mb-1">{it.title}</h3>
            <p className="text-xs md:text-sm text-white/55 leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
