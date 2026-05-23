import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBottomNav from "@/components/MobileBottomNav";
import { STORE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${STORE_NAME} — Premium Gadgets, Secure Checkout, WhatsApp Support`,
  description: "Shop original phones, laptops, audio, smart devices and gaming gear from Nixon Gadgets. Paystack secure payment, nationwide delivery, instant WhatsApp support.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05060A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ink-950 text-white font-sans relative overflow-x-hidden antialiased">
        {/* ambient page glow */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full bg-accent-blue/10 blur-[120px]" />
          <div className="absolute top-[30%] -right-40 w-[40vw] h-[40vw] rounded-full bg-accent-purple/10 blur-[140px]" />
        </div>

        <Header />
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileBottomNav />
      </body>
    </html>
  );
}
