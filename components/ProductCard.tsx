"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { formatNaira, whatsappLink, STORE_NAME } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { MessageCircle, ShoppingBag } from "lucide-react";
import SmartImage from "./SmartImage";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addItem = useCart(s => s.addItem);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      variant: product.storage,
      image: product.image,
    });
  }

  const waMsg = `Hello ${STORE_NAME}, I'm interested in the ${product.name}${product.storage ? ` ${product.storage}` : ""} listed on your website. Is it still available?`;

  const condBadgeColor =
    product.condition === "Brand New" ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/30"
    : product.condition === "UK Used" ? "bg-amber-500/20 text-amber-200 border-amber-400/30"
    : "bg-blue-500/20 text-blue-200 border-blue-400/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden glass rounded-3xl p-3 md:p-5 hover:bg-white/[0.05] transition-colors">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.01] mb-3 md:mb-4 overflow-hidden">
            <SmartImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              fallbackLabel={product.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent pointer-events-none" />

            <span className={`absolute top-2 left-2 md:top-3 md:left-3 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold border px-1.5 md:px-2 py-0.5 rounded-full backdrop-blur-md ${condBadgeColor}`}>
              {product.condition}
            </span>
            {product.oldPrice && (
              <span className="absolute top-2 right-2 md:top-3 md:right-3 text-[9px] md:text-[10px] uppercase tracking-wider font-bold px-1.5 md:px-2 py-0.5 rounded-full bg-red-500/30 text-red-100 border border-red-400/40 backdrop-blur-md">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
            {!product.inStock && (
              <span className="absolute bottom-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/15 text-white/90 backdrop-blur-md">Sold out</span>
            )}
          </div>

          {/* Body */}
          <div className="space-y-1 md:space-y-1.5">
            <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-white/40">{product.brand}</div>
            <h3 className="font-semibold text-[13px] md:text-base leading-tight line-clamp-2">
              {product.name}{product.storage && <span className="text-white/50"> · {product.storage}</span>}
            </h3>
            <div className="flex items-baseline gap-2 pt-1 flex-wrap">
              <span className="font-display font-bold text-sm md:text-lg">{formatNaira(product.price)}</span>
              {product.oldPrice && <span className="text-[11px] md:text-xs text-white/40 line-through">{formatNaira(product.oldPrice)}</span>}
            </div>
            {product.stockCount && product.stockCount <= 3 && product.inStock && (
              <div className="text-[10px] md:text-[11px] text-amber-300/90">Only {product.stockCount} left</div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-3 md:mt-4 grid grid-cols-2 gap-1.5 md:gap-2">
            <button
              onClick={quickAdd}
              disabled={!product.inStock}
              className="inline-flex items-center justify-center gap-1 md:gap-1.5 py-2 md:py-2.5 rounded-full bg-white text-ink-950 text-[11px] md:text-xs font-semibold hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ShoppingBag size={12} /> Buy
            </button>
            <a
              onClick={(e) => e.stopPropagation()}
              href={whatsappLink(waMsg)} target="_blank" rel="noopener"
              className="inline-flex items-center justify-center gap-1 md:gap-1.5 py-2 md:py-2.5 rounded-full glass hover:bg-white/10 text-[11px] md:text-xs font-medium"
            >
              <MessageCircle size={12} className="text-[#25D366]" /> Ask
            </a>
          </div>
          <p className="text-[9px] md:text-[10px] text-white/40 text-center mt-2">🔒 Secure Paystack</p>
        </div>
      </Link>
    </motion.div>
  );
}
