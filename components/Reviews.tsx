"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Tomi A.",    city: "Lagos",   text: "Ordered an iPhone 12 Pro and got delivery the same day. Clean phone, battery was exactly as described.", rating: 5 },
  { name: "Kelechi I.", city: "Abuja",   text: "Bought AirPods Pro. Brand new, sealed, with receipt. Will be back for a MacBook soon.", rating: 5 },
  { name: "Halima B.",  city: "Kaduna",  text: "Their WhatsApp support is amazing. Helped me choose the right phone within my budget.", rating: 5 },
];

export default function Reviews() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-12 md:py-24">
      <div className="text-center mb-10 md:mb-12">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent-electric mb-2">Customer reviews</p>
        <h2 className="font-display text-2xl md:text-4xl font-bold">Loved by gadget lovers across Nigeria.</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="glass rounded-3xl p-5 md:p-6"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={14} className="fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
            <div className="text-sm">
              <div className="font-semibold">{r.name}</div>
              <div className="text-white/40 text-xs">{r.city}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
