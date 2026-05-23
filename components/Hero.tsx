"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { whatsappLink, STORE_NAME, formatNaira } from "@/lib/utils";
import { ArrowRight, MessageCircle, Shield, Zap, Star, Sparkles } from "lucide-react";
import { HERO_IMAGE, HERO_FLOATING } from "@/lib/products";
import SmartImage from "./SmartImage";
import { LogoMark } from "./Logo";

/**
 * TWO-PHASE HERO REVEAL
 *
 * Phase 1 (0 – 1300ms): The woman's photo takes the ENTIRE hero section.
 *   Full-bleed image with the Nixon Gadgets wordmark over it. This is the
 *   "everyone sees this first" moment — the spotlight on her.
 *
 * Phase 2 (1300ms+): The Phase-1 cover DISSOLVES (opacity 1 → 0 over 500ms).
 *   The layout underneath fades in — copy on the left, photo card on the
 *   right (or stacked on mobile), and 10 floating product thumbnails burst
 *   out around the card.
 *
 * Total animation: ~1.8s. Layout uses flex centering throughout so the photo
 * card NEVER bleeds off-edge regardless of viewport.
 */

const REVEAL_AT_MS = 1300;

// 10 spots arranged in a ring around the photo card. Each has both desktop
// and mobile sizing, plus a `mobileHide` flag to declutter narrow viewports.
type Spot = {
  pos: { top?: string; bottom?: string; left?: string; right?: string };
  size: number;
  mobileSize: number;
  mobileHide: boolean;
  delay: number;
  dur: number;
};

const floatSpots: Spot[] = [
  // 4 visible on mobile (corners)
  { pos: { top: "2%",    left: "1%"    }, size: 60, mobileSize: 50, mobileHide: false, delay: 0.00, dur: 5.5 },
  { pos: { top: "2%",    right: "1%"   }, size: 64, mobileSize: 52, mobileHide: false, delay: 0.05, dur: 6.0 },
  { pos: { bottom: "5%", left: "1%"    }, size: 54, mobileSize: 46, mobileHide: false, delay: 0.10, dur: 6.4 },
  { pos: { bottom: "3%", right: "1%"   }, size: 58, mobileSize: 48, mobileHide: false, delay: 0.15, dur: 5.8 },
  // 6 desktop-only floats (filling out the ring)
  { pos: { top: "30%",   left: "-3%"   }, size: 50, mobileSize: 44, mobileHide: true,  delay: 0.20, dur: 6.5 },
  { pos: { top: "32%",   right: "-3%"  }, size: 54, mobileSize: 44, mobileHide: true,  delay: 0.25, dur: 5.8 },
  { pos: { top: "62%",   left: "-2%"   }, size: 48, mobileSize: 42, mobileHide: true,  delay: 0.30, dur: 7.0 },
  { pos: { top: "60%",   right: "-2%"  }, size: 52, mobileSize: 44, mobileHide: true,  delay: 0.35, dur: 6.4 },
  { pos: { top: "12%",   left: "26%"   }, size: 42, mobileSize: 36, mobileHide: true,  delay: 0.40, dur: 6.8 },
  { pos: { bottom: "10%", right: "26%" }, size: 44, mobileSize: 36, mobileHide: true,  delay: 0.45, dur: 6.0 },
];

export default function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), REVEAL_AT_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* ═══════════ PHASE 2 — The revealed layout ═══════════ */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-6 md:pt-14 pb-12 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-center">

          {/* ─────── LEFT: copy ─────── */}
          <div className="relative z-10 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] md:text-xs text-white/70 mb-4 md:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              New iPhone 15 Pro Max in stock now
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-display font-extrabold text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
            >
              Upgrade Your <span className="text-gradient">Tech Life</span> Today.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.35, delay: 0.22 }}
              className="mt-4 md:mt-5 text-white/65 text-[15px] md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Shop original phones, laptops, accessories, smartwatches and gaming gear from <span className="text-white font-medium">{STORE_NAME}</span> — secure Paystack checkout and instant WhatsApp support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.35, delay: 0.3 }}
              className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-ink-950 font-semibold text-sm hover:bg-white/90 transition-all shadow-lg shadow-white/10"
              >
                Shop Gadgets
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={whatsappLink(`Hi ${STORE_NAME}, I'd like to chat with a gadget expert.`)}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full glass hover:bg-white/10 text-sm font-medium"
              >
                <MessageCircle size={16} className="text-[#25D366]" />
                Chat on WhatsApp
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-6 md:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-5 text-[11px] md:text-xs text-white/55"
            >
              {[
                { icon: Shield, label: "Secure Paystack" },
                { icon: Zap, label: "Same-day delivery" },
                { icon: Star, label: "5★ rated" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <b.icon size={13} className="text-accent-electric" />
                  {b.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─────── RIGHT: photo card + orbiting floats ───────
              Container uses flex centering so the card NEVER bleeds off-edge. */}
          <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[600px] order-1 lg:order-2 flex items-center justify-center">

            {/* Soft glow plate behind the card */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={revealed ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="absolute w-[300px] sm:w-[360px] lg:w-[420px] aspect-square rounded-full bg-gradient-to-br from-accent-blue/40 via-accent-purple/30 to-transparent blur-3xl pointer-events-none"
            />

            {/* Photo card — relative + max-w means it's always centered & contained */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.55, type: "spring", damping: 16, stiffness: 200 }}
              className="relative w-[260px] sm:w-[300px] lg:w-[360px] aspect-[4/5] rounded-[28px] overflow-hidden glass-strong border-gradient shadow-2xl shadow-accent-purple/30 z-[2]"
            >
              <motion.div
                animate={revealed ? { y: [0, -6, 0] } : { y: 0 }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <SmartImage
                  src={HERO_IMAGE}
                  alt="Happy customer with her new phone from Nixon Gadgets"
                  className="w-full h-full object-cover"
                  fallbackLabel="Premium Tech, Delivered to Your Door"
                />
                {/* dark gradient overlay so chips read clearly */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-ink-950/20 pointer-events-none" />

                {/* top-left "live" chip */}
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-medium text-white"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  In stock today
                </motion.div>

                {/* bottom feature card */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                  className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-[9px] uppercase tracking-wider text-white/70">Featured</div>
                    <div className="font-display font-semibold text-white text-sm line-clamp-1">iPhone 15 Pro Max</div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-white text-ink-950 text-[11px] font-bold whitespace-nowrap shrink-0">
                    {formatNaira(1850000)}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* The 10 floating product thumbnails — burst out around the card.
                Positioned absolute relative to the parent container (which spans
                the full right column width on desktop, full viewport on mobile). */}
            {HERO_FLOATING.map((g, i) => {
              const spot = floatSpots[i] || floatSpots[0];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={revealed ? {
                    opacity: 1,
                    scale: 1,
                    y:      [0, -8, 0],
                    rotate: [-2, 2, -2],
                  } : { opacity: 0, scale: 0 }}
                  transition={{
                    opacity: { duration: 0.3,  delay: 0.25 + spot.delay },
                    scale:   { duration: 0.45, delay: 0.25 + spot.delay, type: "spring", damping: 12 },
                    y:       { duration: spot.dur, repeat: Infinity, delay: 1.2 + spot.delay, ease: "easeInOut" },
                    rotate:  { duration: spot.dur + 1, repeat: Infinity, delay: 1.2 + spot.delay, ease: "easeInOut" },
                  }}
                  style={{
                    ...spot.pos,
                    width:  `clamp(${spot.mobileSize}px, 11vw, ${spot.size}px)`,
                    height: `clamp(${spot.mobileSize}px, 11vw, ${spot.size}px)`,
                  }}
                  className={`absolute z-[1] ${spot.mobileHide ? "hidden md:block" : ""}`}
                >
                  <div className="w-full h-full glass rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/15">
                    <SmartImage src={g.src} alt={g.alt} className="w-full h-full object-cover" fallbackLabel={g.alt} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════ PHASE 1 — Full-bleed cover (dissolves out) ═══════════ */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="absolute inset-0 z-[5] overflow-hidden"
            aria-hidden={revealed}
          >
            {/* The woman's photo fills the entire hero */}
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={HERO_IMAGE}
                alt="Nixon Gadgets"
                className="w-full h-full object-cover"
                /* preload because it's the very first thing seen */
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/40 via-transparent to-ink-950/40 pointer-events-none" />
            </motion.div>

            {/* Centered Nixon branding card */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="absolute inset-0 flex items-center justify-center px-6"
            >
              <div className="flex flex-col items-center gap-4 px-7 py-6 rounded-3xl bg-ink-950/55 backdrop-blur-xl border border-white/15 shadow-2xl">
                <LogoMark size={52} />
                <div className="text-center leading-tight">
                  <div className="font-display font-bold text-white text-xl md:text-2xl">Nixon Gadgets</div>
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/55 mt-1.5">Premium Tech, Delivered</div>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/45">
                  <Sparkles size={11} className="text-accent-electric" />
                  Welcoming you
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
