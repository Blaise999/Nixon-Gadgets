"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/categories";
import { CATEGORY_IMAGES } from "@/lib/products";
import SmartImage from "./SmartImage";
import { ArrowRight } from "lucide-react";

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-12 md:py-24">
      <div className="flex items-end justify-between mb-7 md:mb-10">
        <div>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent-electric mb-2">Shop by category</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold">Find your gadget faster.</h2>
        </div>
        <Link href="/products" className="hidden md:inline-flex items-center gap-1 text-sm text-white/60 hover:text-white">View all <ArrowRight size={14}/></Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {categories.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <Link href={`/categories/${c.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-3xl h-40 md:h-56 glass hover:bg-white/[0.06] transition-colors">
                {/* background photo */}
                <div className="absolute inset-0">
                  <SmartImage
                    src={CATEGORY_IMAGES[c.slug] || ""}
                    alt={c.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.05] transition-all duration-500"
                    fallbackLabel={c.name}
                  />
                </div>
                {/* dark gradient over photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/20" />
                {/* color accent */}
                <div className={`absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-to-br ${c.accent} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity`} />

                <div className="relative h-full flex flex-col justify-between p-4 md:p-5">
                  <div className="text-2xl md:text-3xl">{c.icon}</div>
                  <div>
                    <div className="font-semibold text-sm md:text-lg">{c.name}</div>
                    <p className="hidden md:block text-xs text-white/60 mt-1 leading-relaxed line-clamp-2">{c.tagline}</p>
                    <div className="mt-2 md:mt-3 inline-flex items-center gap-1 text-[11px] md:text-xs text-accent-electric font-medium">
                      Shop <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
