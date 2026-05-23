"use client";
import { motion } from "framer-motion";
import { Cpu, Zap, Camera, Battery, Wifi, Award, Layers, HardDrive, Gauge, Headphones, Volume2, Mic, Watch, Tablet, Activity, Gamepad2, Joystick, Trophy, Plug, Cable, ShoppingBag } from "lucide-react";

// Per-category content: a curated row of 3-4 feature/spec cards that make each
// category page feel intentional instead of just a product grid.
type Spotlight = {
  headline: string;
  sub: string;
  cards: { icon: any; title: string; desc: string; accent: string }[];
  buyingGuide?: string[];
};

const data: Record<string, Spotlight> = {
  phones: {
    headline: "Phones built for the life you actually live.",
    sub: "From flagship iPhones to Galaxy Ultras and Pixels — original devices, tested batteries, and warranty on every order.",
    cards: [
      { icon: Cpu, title: "Latest chips", desc: "A17 Pro, Snapdragon 8 Gen 3, Tensor G3 — flagships only.", accent: "from-blue-500/30 to-blue-700/0" },
      { icon: Camera, title: "Pro cameras", desc: "48MP–200MP sensors with computational photography.", accent: "from-purple-500/30 to-purple-700/0" },
      { icon: Battery, title: "Tested batteries", desc: "UK-used devices come with verified battery health.", accent: "from-emerald-500/30 to-emerald-700/0" },
      { icon: Award, title: "Original only", desc: "No refurbs unless clearly labelled. Receipts available.", accent: "from-amber-500/30 to-amber-700/0" },
    ],
    buyingGuide: [
      "iPhone 15 Pro Max — flagship choice for video creators",
      "Samsung S24 Ultra — best S Pen + 200MP camera",
      "iPhone 13 Pro UK Used — best value for premium feel",
      "Google Pixel 8 Pro — best AI camera, Android purist",
    ],
  },
  laptops: {
    headline: "Workstations that keep up with you.",
    sub: "MacBook Airs, Pros, XPS, and gaming rigs — set up with macOS or Windows, ready to ship.",
    cards: [
      { icon: Cpu, title: "M-series silicon", desc: "Apple M1, M2, M3 — silent, fast, all-day battery.", accent: "from-blue-500/30 to-blue-700/0" },
      { icon: HardDrive, title: "Fast SSDs", desc: "256GB to 1TB NVMe — boot in seconds.", accent: "from-purple-500/30 to-purple-700/0" },
      { icon: Layers, title: "Pro displays", desc: "Liquid Retina XDR + OLED with deep blacks.", accent: "from-pink-500/30 to-pink-700/0" },
      { icon: Gauge, title: "All-day battery", desc: "Up to 22 hours on M3 Pro. No charger anxiety.", accent: "from-emerald-500/30 to-emerald-700/0" },
    ],
    buyingGuide: [
      "MacBook Air M2 — students, writers, light pro work",
      "MacBook Pro 14 M3 — designers, devs, video editors",
      "MacBook Pro 16 M3 Pro — 4K editing, 3D, music production",
      "Dell XPS 15 — Windows users who need RTX graphics",
    ],
  },
  audio: {
    headline: "Sound that disappears into the music.",
    sub: "Active noise cancellation, spatial audio, and studio-grade drivers — for commutes, work, and home.",
    cards: [
      { icon: Headphones, title: "Active ANC", desc: "Industry-leading noise cancellation on every headphone.", accent: "from-pink-500/30 to-pink-700/0" },
      { icon: Volume2, title: "Spatial Audio", desc: "Immersive Dolby Atmos & 360 Reality Audio support.", accent: "from-purple-500/30 to-purple-700/0" },
      { icon: Mic, title: "Crystal calls", desc: "Beamforming mics for clear voice on noisy streets.", accent: "from-blue-500/30 to-blue-700/0" },
      { icon: Battery, title: "30hr+ battery", desc: "All-day playback. Quick charge for 3 hrs in 5 min.", accent: "from-emerald-500/30 to-emerald-700/0" },
    ],
    buyingGuide: [
      "AirPods Pro 2 — best for iPhone users, MagSafe case",
      "Sony WH-1000XM5 — best ANC overall, foldable design",
      "AirPods Max — premium over-ear with Spatial Audio",
      "Bose QuietComfort Ultra — most comfortable long-haul",
    ],
  },
  smart: {
    headline: "Smarter wearables, smarter tablets.",
    sub: "Track your health, sketch your ideas, and stay connected — without pulling out your phone.",
    cards: [
      { icon: Watch, title: "Always-on displays", desc: "Read the time, glance at notifications — no wrist flick.", accent: "from-emerald-500/30 to-emerald-700/0" },
      { icon: Activity, title: "Health tracking", desc: "ECG, blood oxygen, sleep stages, workout detection.", accent: "from-red-500/30 to-red-700/0" },
      { icon: Tablet, title: "Tablet pro chips", desc: "M2 iPads run pro apps — Procreate, Final Cut, Logic.", accent: "from-purple-500/30 to-purple-700/0" },
      { icon: Wifi, title: "Always connected", desc: "GPS + cellular on the wrist. Leave the phone home.", accent: "from-blue-500/30 to-blue-700/0" },
    ],
    buyingGuide: [
      "Apple Watch Series 9 — best everyday smartwatch",
      "Apple Watch Ultra 2 — divers, hikers, ultra athletes",
      "iPad Air M2 — pro performance in a 1-pound tablet",
      "Galaxy Watch 6 — best for Android, deep health stats",
    ],
  },
  gaming: {
    headline: "Built for the win condition.",
    sub: "Consoles, controllers, headsets — everything you need to play at competitive level.",
    cards: [
      { icon: Gamepad2, title: "4K 120fps", desc: "PS5 and Series X output up to 4K at 120 frames per second.", accent: "from-orange-500/30 to-orange-700/0" },
      { icon: Joystick, title: "Haptic feedback", desc: "DualSense triggers respond to in-game tension.", accent: "from-blue-500/30 to-blue-700/0" },
      { icon: Trophy, title: "Pro audio", desc: "Spatial audio + Pro-G drivers — hear footsteps first.", accent: "from-purple-500/30 to-purple-700/0" },
      { icon: HardDrive, title: "1TB NVMe SSD", desc: "Cut load times to seconds. Install dozens of games.", accent: "from-emerald-500/30 to-emerald-700/0" },
    ],
    buyingGuide: [
      "PS5 Slim — best exclusives (Spider-Man, GoW, Last of Us)",
      "Xbox Series X — raw power, Game Pass library",
      "DualSense — best controller for indie & racing games",
      "Logitech G Pro X — competitive FPS headset of choice",
    ],
  },
  accessories: {
    headline: "The small things that make a big difference.",
    sub: "Chargers that actually charge fast. Power banks that last days. Mice that feel like extensions of your hand.",
    cards: [
      { icon: Plug, title: "GaN fast charging", desc: "65W in a charger half the size of standard bricks.", accent: "from-cyan-500/30 to-cyan-700/0" },
      { icon: Battery, title: "Pocket power", desc: "20,000mAh banks that re-charge your laptop twice.", accent: "from-emerald-500/30 to-emerald-700/0" },
      { icon: Cable, title: "Quality cables", desc: "Braided, durable, 100W PD-rated. No fraying.", accent: "from-purple-500/30 to-purple-700/0" },
      { icon: ShoppingBag, title: "Warranties", desc: "18-month Anker warranty. 1-year Logitech warranty.", accent: "from-amber-500/30 to-amber-700/0" },
    ],
    buyingGuide: [
      "Anker 65W GaN — one charger for phone, tablet, laptop",
      "Anker 20K PowerCore — travel charging for 2-3 days",
      "Logitech MX Master 3S — productivity king for creators",
    ],
  },
};

export default function CategorySpotlight({ slug }: { slug: string }) {
  const s = data[slug];
  if (!s) return null;

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 mb-10 md:mb-14">
      {/* Headline + sub */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mb-7 md:mb-10"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">{s.headline}</h2>
        <p className="text-white/55 text-sm md:text-base mt-3">{s.sub}</p>
      </motion.div>

      {/* Feature cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {s.cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="relative overflow-hidden glass rounded-2xl p-4 md:p-5"
          >
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${c.accent} blur-2xl opacity-70`} />
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center mb-3">
                <c.icon size={16} className="text-accent-electric" />
              </div>
              <div className="font-semibold text-sm md:text-base mb-1">{c.title}</div>
              <div className="text-xs md:text-[13px] text-white/55 leading-relaxed">{c.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Buying guide chips */}
      {s.buyingGuide && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 md:mt-10 glass-strong rounded-3xl p-5 md:p-7"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={14} className="text-accent-electric" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent-electric font-semibold">Buying guide</span>
          </div>
          <h3 className="font-display font-bold text-lg md:text-xl mb-4">Which one is right for you?</h3>
          <ul className="space-y-2.5">
            {s.buyingGuide.map((line, i) => {
              const [name, ...rest] = line.split(" — ");
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm md:text-[15px]"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent-electric shrink-0" />
                  <div>
                    <span className="font-semibold text-white">{name}</span>
                    {rest.length > 0 && <span className="text-white/55"> — {rest.join(" — ")}</span>}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </section>
  );
}
