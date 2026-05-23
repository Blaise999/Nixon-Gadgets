"use client";
import Link from "next/link";

// Logo v2 — A precision-built "N" using two angled strokes that meet at a
// signal-dot vertex. Reads as a letter and as a circuit at the same time.
// Renders crisply at any size via SVG with explicit gradient stops.

export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Nixon Gadgets"
    >
      <defs>
        <linearGradient id="nx-tile" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="55%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="nx-rim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
        </linearGradient>
        <linearGradient id="nx-stroke" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDE9FE" />
        </linearGradient>
        <filter id="nx-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" />
          <feOffset dx="0" dy="0.6" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Tile */}
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#nx-tile)" />
      {/* Inner top highlight */}
      <rect x="2.5" y="2.5" width="43" height="43" rx="11.5" fill="none" stroke="url(#nx-rim)" strokeWidth="0.9" />

      {/* The N — two heavy verticals plus a connecting diagonal, drawn as
          one continuous path for a crisper join. */}
      <g filter="url(#nx-shadow)">
        <path
          d="
            M 13 13
            L 18 13
            L 18 23.5
            L 30 35.2
            L 30 13
            L 35 13
            L 35 35
            L 30 35
            L 18 23.5
            L 18 35
            L 13 35
            Z
          "
          fill="url(#nx-stroke)"
        />
      </g>

      {/* Circuit signal dot — top-right, pulses in CSS */}
      <circle cx="37" cy="11" r="2.6" fill="white" />
      <circle cx="37" cy="11" r="1.3" fill="#5B8CFF" />
    </svg>
  );
}

export function Logo({ size = 36, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      <span className="relative inline-block">
        <span className="absolute inset-0 rounded-[12px] bg-accent-purple/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative block">
          <LogoMark size={size} />
        </span>
      </span>
      {withWordmark && (
        <span className="font-display font-bold tracking-tight leading-none flex flex-col">
          <span className="text-[16px] md:text-[17px] text-white">Nixon</span>
          <span className="text-[8.5px] md:text-[9px] uppercase tracking-[0.3em] text-white/45 mt-0.5">Gadgets</span>
        </span>
      )}
    </Link>
  );
}
