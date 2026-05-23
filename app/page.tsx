"use client";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductRow from "@/components/ProductRow";
import DealOfWeek from "@/components/DealOfWeek";
import WhyBuy from "@/components/WhyBuy";
import Reviews from "@/components/Reviews";
import BudgetFinder from "@/components/BudgetFinder";
import WhatsAppConsultation from "@/components/WhatsAppConsultation";
import { useProducts } from "@/lib/products";

export default function HomePage() {
  const products = useProducts((s) => s.products);
  const best = products.filter((p) => p.bestSeller).slice(0, 8);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 8);
  const deal = products.find((p) => p.dealOfWeek);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductRow kicker="Trending now" title="Best Sellers" products={best} href="/products" />
      {deal && <DealOfWeek product={deal} />}
      <ProductRow kicker="Fresh stock" title="New Arrivals" products={newArrivals} href="/products" />
      <BudgetFinder />
      <WhyBuy />
      <Reviews />
      <WhatsAppConsultation />
    </>
  );
}
