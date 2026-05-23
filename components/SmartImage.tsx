"use client";
import { useState } from "react";

// Bulletproof image loader. Renders an <img>; if the URL fails, swaps in a
// branded gradient with the product name. No skeleton, no positioning tricks,
// no chance of conflicting className passes.
export default function SmartImage({
  src, alt, className = "", fallbackLabel,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={`${className} bg-gradient-to-br from-accent-blue/30 via-ink-800 to-accent-purple/40 flex items-center justify-center`}>
        <div className="text-center px-4">
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-1.5">Nixon</div>
          <div className="text-white/85 font-display font-semibold text-sm md:text-base line-clamp-2 max-w-[80%] mx-auto">
            {fallbackLabel || alt}
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      loading="lazy"
      className={className}
    />
  );
}
