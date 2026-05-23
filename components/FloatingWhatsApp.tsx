"use client";
import { motion } from "framer-motion";
import { whatsappLink, STORE_NAME } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  const msg = `Hello ${STORE_NAME}, I need help choosing a gadget.`;

  return (
    <motion.a
      href={whatsappLink(msg)}
      target="_blank" rel="noopener"
      initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 16 }}
      className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-30 flex items-center gap-3 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="hidden sm:block bg-white/10 backdrop-blur-xl border border-white/10 text-sm px-3 py-2 rounded-full shadow-lg">Need help choosing?</span>
      <motion.span
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl shadow-[#25D366]/40 group-hover:scale-110 transition-transform relative"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.46 3.41 1.32 4.9L2 22l5.31-1.39a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 19.05 4.9 9.86 9.86 0 0 0 12.04 2zm0 18.13h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.27-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.69 8.21-8.21 8.21zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31s-.86.84-.86 2.05.88 2.38 1 2.55c.12.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.46-.31z"/></svg>
      </motion.span>
    </motion.a>
  );
}
