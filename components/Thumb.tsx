"use client";

// Small thumbnail. Renders a URL as <img>, or falls back to centered text/emoji.
export default function Thumb({ src, alt, className = "" }: { src?: string; alt?: string; className?: string }) {
  if (src && src.startsWith("http")) {
    return <img src={src} alt={alt || ""} className={`w-full h-full object-cover ${className}`} loading="lazy" />;
  }
  return (
    <div className={`w-full h-full flex items-center justify-center text-xl ${className}`}>{src || "📦"}</div>
  );
}
