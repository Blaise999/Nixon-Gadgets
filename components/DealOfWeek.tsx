"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatNaira, whatsappLink, STORE_NAME } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Clock, ArrowRight, Flame, MessageCircle, ShoppingBag, Sparkles } from "lucide-react";
import SmartImage from "./SmartImage";

function Countdown() {
  const [t, setT] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date();
    target.setHours(23, 59, 59, 999);
    const id = setInterval(() => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setT({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const cell = (n: number, label: string) => (
    <div className="flex flex-col items-center">
      <motion.span
        key={n}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="font-display font-bold text-2xl md:text-4xl glass-strong border border-white/15 min-w-[58px] md:min-w-[80px] text-center px-2 py-2 md:px-3 md:py-2.5 rounded-xl md:rounded-2xl tabular-nums"
      >
        {String(n).padStart(2, "0")}
      </motion.span>
      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/45 mt-1.5">{label}</span>
    </div>
  );
  return (
    <div className="flex items-start gap-2 md:gap-3">
      {cell(t.h, "Hours")}
      <span className="text-white/30 font-display text-2xl md:text-3xl mt-1.5">:</span>
      {cell(t.m, "Mins")}
      <span className="text-white/30 font-display text-2xl md:text-3xl mt-1.5">:</span>
      {cell(t.s, "Secs")}
    </div>
  );
}

// Particle dots that drift around the deal section
function Particles() {
  const dots = Array.from({ length: 14 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((_, i) => {
        const x = (i * 73) % 100;
        const y = (i * 47) % 100;
        const dur = 6 + (i % 5);
        return (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/40"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              delay: (i * 0.3) % 4,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

export default function DealOfWeek({ product }: { product: Product }) {
  // Parallax tilt on the photo card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-100, 100], [8, -8]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-100, 100], [-8, 8]), { stiffness: 200, damping: 20 });

  if (!product) return null;

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const waMsg = `Hi ${STORE_NAME}, I want to claim the Deal of the Week: ${product.name}.`;

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[24px] md:rounded-[32px] border border-white/10 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-950 p-5 sm:p-8 md:p-12"
      >
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-red-500/30 via-orange-500/15 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-accent-purple/30 via-accent-blue/15 to-transparent blur-3xl"
          />
        </div>
        <Particles />

        {/* Top eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-between mb-6 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-200 text-[10px] md:text-xs uppercase tracking-widest font-bold">
            <motion.span
              animate={{ rotate: [0, -8, 8, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
            >
              <Flame size={12} className="fill-red-400 text-red-400" />
            </motion.span>
            Deal of the Week
          </div>
          {discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 12, delay: 0.3 }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-ink-950 text-xs font-bold"
            >
              <Sparkles size={12} /> Save {discount}%
            </motion.div>
          )}
        </motion.div>

        <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* LEFT - copy */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-3"
            >
              {product.name}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="text-white/65 text-sm md:text-base mb-6 md:mb-7 max-w-md leading-relaxed"
            >
              {product.shortNote || "Limited-time price drop. Free screen protector and protective case included."}
            </motion.p>

            {/* Animated price reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-baseline gap-3 mb-6 md:mb-8 flex-wrap"
            >
              <motion.span
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 10, delay: 0.55 }}
                className="font-display font-extrabold text-4xl md:text-6xl text-gradient"
              >
                {formatNaira(product.price)}
              </motion.span>
              {product.oldPrice && (
                <span className="text-white/40 line-through text-base md:text-xl">{formatNaira(product.oldPrice)}</span>
              )}
            </motion.div>

            {/* Animated specs chips */}
            {product.specs && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.6 } },
                }}
                className="flex flex-wrap gap-2 mb-7 md:mb-8"
              >
                {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
                  <motion.div
                    key={k}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 8 },
                      show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 14 } },
                    }}
                    className="text-[10px] md:text-xs px-3 py-1.5 rounded-full glass border border-white/10"
                  >
                    <span className="text-white/50">{k}: </span>
                    <span className="text-white font-medium">{v}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.85 }}
              className="mb-6 md:mb-7"
            >
              <Countdown />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href={`/products/${product.slug}`}
                className="group inline-flex items-center gap-2 px-5 md:px-6 py-3 md:py-3.5 rounded-full bg-white text-ink-950 font-semibold text-sm hover:bg-white/90 transition-all shadow-lg shadow-white/10"
              >
                <ShoppingBag size={15} /> Claim Deal
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={whatsappLink(waMsg)}
                target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-5 md:px-6 py-3 md:py-3.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-sm font-medium hover:bg-[#25D366]/25 transition-all"
              >
                <MessageCircle size={14} className="text-[#25D366]" /> Ask
              </a>
            </motion.div>
          </div>

          {/* RIGHT - tilting photo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", damping: 14 }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              mx.set(e.clientX - rect.left - rect.width / 2);
              my.set(e.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
            className="relative aspect-square w-full max-w-[400px] mx-auto md:max-w-none rounded-[28px] overflow-hidden border-gradient glass-strong shadow-2xl shadow-accent-purple/20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <SmartImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                fallbackLabel={product.name}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating discount badge */}
              {discount > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: -12 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 10, delay: 0.7 }}
                  className="absolute top-4 right-4 w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-500 flex flex-col items-center justify-center shadow-2xl shadow-red-500/40"
                >
                  <span className="text-[10px] uppercase tracking-wider font-bold text-white/90">Save</span>
                  <span className="font-display font-extrabold text-2xl md:text-3xl text-white leading-none">{discount}%</span>
                </motion.div>
              )}

              {/* Stock badge */}
              {product.stockCount && product.stockCount <= 5 && (
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/90 text-ink-950 text-xs font-semibold">
                  <Clock size={12} /> Only {product.stockCount} left
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
