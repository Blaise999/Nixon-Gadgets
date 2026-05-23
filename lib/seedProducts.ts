import { Product } from "./types";

// All photo IDs below were verified directly against Unsplash search results.
// Free for commercial use, no attribution required.
//
// Image-product matching notes:
//   - iPhone photos verified from /s/photos/iphone-15-pro-max and similar pages
//   - MacBook photos verified from /s/photos/macbook
//   - Samsung S24 Ultra: verified single-photo page
//   - Hero photo: verified from /s/photos/black-man-on-phone
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const seedProducts: Product[] = [
  // ============ PHONES (8) ============
  {
    id: "p1", slug: "iphone-15-pro-max-256gb",
    name: "iPhone 15 Pro Max", brand: "Apple", category: "phones",
    price: 1850000, oldPrice: 1950000,
    condition: "Brand New", storage: "256GB", color: "Natural Titanium",
    inStock: true, stockCount: 4, featured: true, bestSeller: true, newArrival: true,
    image: img("1700805732158-6f1169780ca7"),
    shortNote: "Sealed, 1-year Apple warranty",
    specs: { Storage: "256GB", RAM: "8GB", Display: "6.7 inch Super Retina XDR", Chip: "A17 Pro", Camera: "48MP triple", Battery: "Up to 29 hrs video", Warranty: "1 year Apple" },
    whatsInBox: ["iPhone 15 Pro Max", "USB-C to USB-C cable", "Documentation"],
  },
  {
    id: "p2", slug: "iphone-14-pro-max-256gb-uk-used",
    name: "iPhone 14 Pro Max", brand: "Apple", category: "phones",
    price: 1100000,
    condition: "UK Used", storage: "256GB", color: "Deep Purple",
    inStock: true, stockCount: 2, featured: true, dealOfWeek: true,
    image: img("1709528922440-4fc4f05ef110"),
    shortNote: "Battery health 92%, no scratches",
    specs: { Storage: "256GB", RAM: "6GB", Display: "6.7 inch ProMotion", Chip: "A16 Bionic", Camera: "48MP triple", "Battery Health": "92%", Warranty: "30-day store" },
    whatsInBox: ["iPhone 14 Pro Max", "USB-C cable", "Free case + screen protector"],
  },
  {
    id: "p3", slug: "iphone-13-pro-128gb",
    name: "iPhone 13 Pro", brand: "Apple", category: "phones",
    price: 720000,
    condition: "UK Used", storage: "128GB",
    inStock: true, stockCount: 5, bestSeller: true,
    image: img("1695639509828-d4260075e370"),
    shortNote: "Clean condition, tested",
    specs: { Storage: "128GB", RAM: "6GB", Display: "6.1 inch ProMotion", "Battery Health": "89%", Warranty: "30-day store" },
  },
  {
    id: "p4", slug: "samsung-s24-ultra-512gb",
    name: "Samsung Galaxy S24 Ultra", brand: "Samsung", category: "phones",
    price: 1480000, oldPrice: 1600000,
    condition: "Brand New", storage: "512GB", color: "Titanium Gray",
    inStock: true, stockCount: 3, newArrival: true, featured: true,
    image: img("1705585175110-d25f92c183aa"),
    specs: { Storage: "512GB", RAM: "12GB", Display: "6.8 inch Dynamic AMOLED 2X", Chip: "Snapdragon 8 Gen 3", Camera: "200MP quad", "S Pen": "Included", Warranty: "1 year Samsung" },
  },
  {
    id: "p5", slug: "iphone-12-pro-128gb",
    name: "iPhone 12 Pro", brand: "Apple", category: "phones",
    price: 480000,
    condition: "UK Used", storage: "128GB", color: "Pacific Blue",
    inStock: true, stockCount: 6, bestSeller: true,
    image: img("1709178295038-acbeec786fcf"),
    shortNote: "Battery health 85%, excellent",
    specs: { Storage: "128GB", RAM: "6GB", Display: "6.1 inch Super Retina XDR", "Battery Health": "85%", Warranty: "30-day store" },
  },
  {
    id: "p6", slug: "iphone-15-128gb",
    name: "iPhone 15", brand: "Apple", category: "phones",
    price: 1180000,
    condition: "Brand New", storage: "128GB", color: "Pink",
    inStock: true, stockCount: 4, newArrival: true,
    image: img("1695822822491-d92cee704368"),
    specs: { Storage: "128GB", RAM: "6GB", Display: "6.1 inch Super Retina XDR", Chip: "A16 Bionic", Camera: "48MP dual", Warranty: "1 year Apple" },
  },
  {
    id: "p7", slug: "samsung-s23-ultra-256gb-uk-used",
    name: "Samsung Galaxy S23 Ultra", brand: "Samsung", category: "phones",
    price: 920000,
    condition: "UK Used", storage: "256GB", color: "Phantom Black",
    inStock: true, stockCount: 3,
    image: img("1702184117235-56002cb13663"),
    shortNote: "Includes S Pen, light use",
    specs: { Storage: "256GB", RAM: "8GB", Display: "6.8 inch Dynamic AMOLED 2X", Chip: "Snapdragon 8 Gen 2", Camera: "200MP quad", Warranty: "30-day store" },
  },
  {
    id: "p8", slug: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro", brand: "Google", category: "phones",
    price: 980000,
    condition: "Brand New", storage: "256GB", color: "Obsidian",
    inStock: true, stockCount: 2, newArrival: true,
    image: img("1605236453806-6ff36851218e"),
    shortNote: "Best AI camera on the market",
    specs: { Storage: "256GB", RAM: "12GB", Display: "6.7 inch Super Actua LTPO", Chip: "Tensor G3", Camera: "50MP triple", Warranty: "1 year Google" },
  },

  // ============ LAPTOPS (5) ============
  {
    id: "p9", slug: "macbook-pro-m3-14",
    name: "MacBook Pro 14 inch M3", brand: "Apple", category: "laptops",
    price: 2350000,
    condition: "Brand New", storage: "512GB SSD", ram: "16GB",
    inStock: true, stockCount: 2, featured: true, newArrival: true,
    image: img("1606229365485-93a3b8ee0385"),
    specs: { Chip: "Apple M3", RAM: "16GB", Storage: "512GB SSD", Display: "14.2 inch Liquid Retina XDR", Battery: "Up to 18 hrs", Warranty: "1 year Apple" },
    whatsInBox: ["MacBook Pro 14", "70W USB-C power adapter", "USB-C to MagSafe cable"],
  },
  {
    id: "p10", slug: "macbook-air-m1-uk-used",
    name: "MacBook Air M1", brand: "Apple", category: "laptops",
    price: 680000,
    condition: "UK Used", storage: "256GB SSD", ram: "8GB",
    inStock: true, stockCount: 4, bestSeller: true,
    image: img("1517336714731-489689fd1ca8"),
    shortNote: "Excellent condition, battery 95%",
    specs: { Chip: "Apple M1", RAM: "8GB", Storage: "256GB SSD", Display: "13.3 inch Retina", "Battery Health": "95%", Warranty: "30-day store" },
  },
  {
    id: "p11", slug: "macbook-pro-16-m3-pro",
    name: "MacBook Pro 16 inch M3 Pro", brand: "Apple", category: "laptops",
    price: 3450000,
    condition: "Brand New", storage: "1TB SSD", ram: "18GB",
    inStock: true, stockCount: 1, featured: true, newArrival: true,
    image: img("1541807084-5c52b6b3adef"),
    shortNote: "Pro-grade for video, music, code",
    specs: { Chip: "Apple M3 Pro 12-core", RAM: "18GB", Storage: "1TB SSD", Display: "16.2 inch Liquid Retina XDR", Battery: "Up to 22 hrs", Warranty: "1 year Apple" },
  },
  {
    id: "p12", slug: "dell-xps-15-i7",
    name: "Dell XPS 15", brand: "Dell", category: "laptops",
    price: 1250000,
    condition: "UK Used", storage: "512GB SSD", ram: "16GB",
    inStock: true, stockCount: 1,
    image: img("1531297484001-80022131f5a1"),
    shortNote: "OLED touchscreen, RTX graphics",
    specs: { CPU: "Intel i7-12700H", RAM: "16GB", Storage: "512GB SSD", Display: "15.6 inch 3.5K OLED Touch", GPU: "RTX 3050 Ti", Warranty: "30-day store" },
  },
  {
    id: "p13", slug: "macbook-air-m2-13",
    name: "MacBook Air 13 inch M2", brand: "Apple", category: "laptops",
    price: 1380000,
    condition: "Brand New", storage: "256GB SSD", ram: "8GB",
    inStock: true, stockCount: 3, bestSeller: true,
    image: img("1611186871348-b1ce696e52c9"),
    specs: { Chip: "Apple M2", RAM: "8GB", Storage: "256GB SSD", Display: "13.6 inch Liquid Retina", Battery: "Up to 18 hrs", Warranty: "1 year Apple" },
  },

  // ============ AUDIO (4) ============
  {
    id: "p14", slug: "airpods-pro-2",
    name: "AirPods Pro (2nd Gen)", brand: "Apple", category: "audio",
    price: 285000, oldPrice: 320000,
    condition: "Brand New",
    inStock: true, stockCount: 12, bestSeller: true,
    image: img("1572569511254-d8f925fe2cbb"),
    shortNote: "USB-C case, MagSafe charging",
    specs: { Type: "In-ear", "Noise Cancel": "Active ANC", Case: "USB-C MagSafe", Battery: "Up to 6 hrs", Warranty: "1 year Apple" },
  },
  {
    id: "p15", slug: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5", brand: "Sony", category: "audio",
    price: 410000,
    condition: "Brand New", color: "Midnight Black",
    inStock: true, stockCount: 6, featured: true,
    image: img("1505740420928-5e560c06d30e"),
    shortNote: "Best-in-class ANC headphones",
    specs: { Type: "Over-ear", "Noise Cancel": "Industry-leading ANC", Battery: "Up to 30 hrs", Connectivity: "BT 5.2 / 3.5mm", Warranty: "1 year Sony" },
  },
  {
    id: "p16", slug: "airpods-max",
    name: "AirPods Max", brand: "Apple", category: "audio",
    price: 590000,
    condition: "Brand New", color: "Space Gray",
    inStock: true, stockCount: 2, featured: true,
    image: img("1606220588913-b3aacb4d2f46"),
    shortNote: "Premium over-ear with Spatial Audio",
    specs: { Type: "Over-ear", "Noise Cancel": "Active ANC", Battery: "Up to 20 hrs", Audio: "Spatial Audio + Dolby Atmos", Warranty: "1 year Apple" },
  },
  {
    id: "p17", slug: "bose-quietcomfort-ultra",
    name: "Bose QuietComfort Ultra", brand: "Bose", category: "audio",
    price: 470000,
    condition: "Brand New",
    inStock: true, stockCount: 4, newArrival: true,
    image: img("1583394838336-acd977736f90"),
    shortNote: "Immersive audio, world-class comfort",
    specs: { Type: "Over-ear", "Noise Cancel": "Aware Mode + ANC", Battery: "Up to 24 hrs", Warranty: "1 year Bose" },
  },

  // ============ SMART DEVICES (4) ============
  {
    id: "p18", slug: "apple-watch-series-9",
    name: "Apple Watch Series 9", brand: "Apple", category: "smart",
    price: 540000,
    condition: "Brand New", color: "Midnight 45mm",
    inStock: true, stockCount: 7, newArrival: true,
    image: img("1551816230-ef5deaed4a26"),
    shortNote: "Brightest display, double-tap gesture",
    specs: { Size: "45mm", Case: "Aluminum", Connectivity: "GPS", Display: "Always-On Retina", Warranty: "1 year Apple" },
  },
  {
    id: "p19", slug: "ipad-air-m2",
    name: "iPad Air M2 11 inch", brand: "Apple", category: "smart",
    price: 920000,
    condition: "Brand New", storage: "128GB",
    inStock: true, stockCount: 3, newArrival: true, featured: true,
    image: img("1561154464-82e9adf32764"),
    shortNote: "Pro-grade chip in a lightweight body",
    specs: { Chip: "Apple M2", Display: "11 inch Liquid Retina", Storage: "128GB", Battery: "Up to 10 hrs", Warranty: "1 year Apple" },
  },
  {
    id: "p20", slug: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2", brand: "Apple", category: "smart",
    price: 1180000,
    condition: "Brand New", color: "Titanium 49mm",
    inStock: true, stockCount: 2, featured: true,
    image: img("1546868871-7041f2a55e12"),
    shortNote: "For divers, hikers, athletes",
    specs: { Size: "49mm", Case: "Titanium", Display: "Always-On 3000-nit", Battery: "Up to 36 hrs", Warranty: "1 year Apple" },
  },
  {
    id: "p21", slug: "samsung-galaxy-watch-6",
    name: "Samsung Galaxy Watch 6", brand: "Samsung", category: "smart",
    price: 320000,
    condition: "Brand New", color: "Graphite 44mm",
    inStock: true, stockCount: 5,
    image: img("1579586337278-3befd40fd17a"),
    shortNote: "Best-in-class health tracking for Android",
    specs: { Size: "44mm", Case: "Aluminum", Display: "Super AMOLED", Battery: "Up to 40 hrs", Warranty: "1 year Samsung" },
  },

  // ============ GAMING (4) ============
  {
    id: "p22", slug: "ps5-slim",
    name: "PlayStation 5 Slim", brand: "Sony", category: "gaming",
    price: 780000,
    condition: "Brand New",
    inStock: true, stockCount: 5, bestSeller: true, featured: true,
    image: img("1606813907291-d86efa9b94db"),
    shortNote: "Slimmer, lighter, same power",
    specs: { Storage: "1TB SSD", Output: "Up to 4K 120fps", Disc: "Blu-ray drive", Warranty: "1 year Sony" },
    whatsInBox: ["PS5 Slim console", "DualSense controller", "HDMI cable", "Power cable"],
  },
  {
    id: "p23", slug: "dualsense-controller",
    name: "DualSense Wireless Controller", brand: "Sony", category: "gaming",
    price: 95000,
    condition: "Brand New", color: "White",
    inStock: true, stockCount: 20,
    image: img("1592840486693-c84b08a76de9"),
    shortNote: "Haptic feedback + adaptive triggers",
    specs: { Connectivity: "Bluetooth / USB-C", "Haptic Feedback": "Yes", Battery: "Up to 12 hrs", Warranty: "6 months store" },
  },
  {
    id: "p24", slug: "xbox-series-x",
    name: "Xbox Series X", brand: "Microsoft", category: "gaming",
    price: 750000,
    condition: "Brand New",
    inStock: true, stockCount: 3, featured: true,
    image: img("1621259182288-d5bf6a51d3a8"),
    shortNote: "12 teraflops of raw graphics power",
    specs: { Storage: "1TB SSD", Output: "Up to 4K 120fps", Disc: "4K Blu-ray drive", Warranty: "1 year Microsoft" },
  },
  {
    id: "p25", slug: "logitech-g-pro-x-headset",
    name: "Logitech G Pro X Gaming Headset", brand: "Logitech", category: "gaming",
    price: 85000,
    condition: "Brand New",
    inStock: true, stockCount: 8,
    image: img("1599669454699-248893623440"),
    shortNote: "Pro-tier audio engineered with Blue VO!CE",
    specs: { Type: "Over-ear closed-back", Connectivity: "3.5mm + USB", Drivers: "50mm Pro-G", Warranty: "1 year Logitech" },
  },

  // ============ ACCESSORIES (3) ============
  {
    id: "p26", slug: "anker-65w-charger",
    name: "Anker 65W GaN Charger", brand: "Anker", category: "accessories",
    price: 38000,
    condition: "Brand New",
    inStock: true, stockCount: 30, bestSeller: true,
    image: img("1583863788434-e58a36330cf0"),
    shortNote: "Compact GaN, fast-charges everything",
    specs: { Output: "65W USB-C PD", Ports: "1x USB-C, 1x USB-A", Warranty: "18 months Anker" },
  },
  {
    id: "p27", slug: "anker-20000-powerbank",
    name: "Anker PowerCore 20,000mAh", brand: "Anker", category: "accessories",
    price: 52000,
    condition: "Brand New",
    inStock: true, stockCount: 18,
    image: img("1609091839311-d5365f9ff1c5"),
    shortNote: "Charges your laptop, phone, and watch",
    specs: { Capacity: "20,000mAh", Output: "20W PD", Ports: "USB-C + USB-A", Warranty: "18 months Anker" },
  },
  {
    id: "p28", slug: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S", brand: "Logitech", category: "accessories",
    price: 78000,
    condition: "Brand New",
    inStock: true, stockCount: 9,
    image: img("1527864550417-7fd91fc51a46"),
    shortNote: "Whisper-quiet clicks, infinite scroll",
    specs: { Connectivity: "Bluetooth / Logi Bolt", DPI: "Up to 8000", Battery: "Up to 70 days", Warranty: "1 year Logitech" },
  },
];

// HERO PHOTO: served locally from /public/hero.jpg (the campaign asset).
// Never fails to load (no third-party CDN dependency).
export const HERO_IMAGE = `/hero.jpg`;

// Floating product thumbnails — 10 real product photos that orbit the hero
// photo card in Phase 2. On mobile the last 6 are hidden so it stays clean.
export const HERO_FLOATING = [
  { src: img("1517336714731-489689fd1ca8", 300), alt: "MacBook" },
  { src: img("1572569511254-d8f925fe2cbb", 300), alt: "AirPods" },
  { src: img("1551816230-ef5deaed4a26", 300), alt: "Apple Watch" },
  { src: img("1606813907291-d86efa9b94db", 300), alt: "PS5" },
  { src: img("1505740420928-5e560c06d30e", 300), alt: "Sony XM5" },
  { src: img("1561154464-82e9adf32764", 300), alt: "iPad" },
  { src: img("1700805732158-6f1169780ca7", 300), alt: "iPhone" },
  { src: img("1705585175110-d25f92c183aa", 300), alt: "Galaxy S24" },
  { src: img("1592840486693-c84b08a76de9", 300), alt: "DualSense" },
  { src: img("1583863788434-e58a36330cf0", 300), alt: "Anker" },
];

// Category cards backgrounds — each pulls a representative product photo
export const CATEGORY_IMAGES: Record<string, string> = {
  phones:      img("1700805732158-6f1169780ca7", 800),
  laptops:     img("1606229365485-93a3b8ee0385", 800),
  accessories: img("1527864550417-7fd91fc51a46", 800),
  audio:       img("1505740420928-5e560c06d30e", 800),
  smart:       img("1551816230-ef5deaed4a26", 800),
  gaming:      img("1606813907291-d86efa9b94db", 800),
};
