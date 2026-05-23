export const categories = [
  { slug: "phones",       name: "Phones",        tagline: "iPhones, Samsung, Tecno, Infinix, Redmi",   icon: "📱", accent: "from-blue-500/30 to-blue-700/0" },
  { slug: "laptops",      name: "Laptops",       tagline: "MacBooks, HP, Dell, Lenovo, gaming rigs",    icon: "💻", accent: "from-purple-500/30 to-purple-700/0" },
  { slug: "accessories",  name: "Accessories",   tagline: "Chargers, cables, cases, power banks",       icon: "🔌", accent: "from-cyan-500/30 to-cyan-700/0" },
  { slug: "audio",        name: "Audio",         tagline: "AirPods, headphones, speakers, earbuds",     icon: "🎧", accent: "from-pink-500/30 to-pink-700/0" },
  { slug: "smart",        name: "Smart Devices", tagline: "Watches, tablets, cameras, home gadgets",    icon: "⌚", accent: "from-emerald-500/30 to-emerald-700/0" },
  { slug: "gaming",       name: "Gaming",        tagline: "Consoles, controllers, headsets, keyboards", icon: "🎮", accent: "from-orange-500/30 to-orange-700/0" },
];

export const categoryBySlug = (slug: string) => categories.find(c => c.slug === slug);
