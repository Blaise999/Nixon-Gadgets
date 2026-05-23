# Nixon Gadgets

A premium Next.js 14 gadget store with real product photography, a working admin dashboard, Paystack checkout, and WhatsApp integration on every page.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Zustand · Paystack Inline.js · lucide-react**

---

## Quick start

```bash
# 1. Install
npm install

# 2. Copy env file and fill in your keys
cp .env.example .env.local

# 3. Run
npm run dev
```

Open **http://localhost:3000**.

---

## Environment variables

```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_WHATSAPP_NUMBER=2348012345678
NEXT_PUBLIC_STORE_NAME=Nixon Gadgets
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Optional - only needed for server-side payment verification
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxx
```

- **Paystack public key** → from [dashboard.paystack.com](https://dashboard.paystack.com) → Settings → API Keys.
- **WhatsApp number** → International format with no `+` or spaces (e.g. `2348012345678`).
- **Admin password** → Change this. Default `admin123` is for demo only.

---

## Admin dashboard

Go to **/admin** and log in with the password from `.env.local` (default `admin123`).

What you can do:
- **Dashboard** — revenue, paid orders, pending count, low-stock items, recent orders feed, and a visual **Deal of the Week picker** (tap any product thumbnail to set it as the homepage hero deal).
- **Products** — full CRUD. Add new products (with image URL field + live preview), edit any field on existing products (price, stock, condition, storage, color, image, etc.), toggle stock/featured/best-seller/new-arrival/deal-of-week flags inline, delete with confirmation. Everything persists to `localStorage` via Zustand.
- **Orders** — filter by status, expand any order to see customer details, items, totals, and update its status (Pending → Paid → Processing → Out for delivery → Delivered → Cancelled). Includes a "Message customer on WhatsApp" button with a pre-filled message.

The admin gate uses a `localStorage` flag for demo purposes. **Replace with real auth** (NextAuth, Clerk, Supabase) before going to production.

---

## Real product photography

All product, hero, and category images come from **Unsplash** (free, no attribution required, but credit is always appreciated). They're declared in `lib/seedProducts.ts` as direct CDN URLs:

```ts
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
```

To swap in your own photos, just edit a product in the admin panel and paste any direct image URL (Cloudinary, your own CDN, Vercel Blob, S3 — all work).

The hero uses a photo of a smiling man with a smartphone (by Austin Distel on Unsplash), surrounded by six real product thumbnails animating in.

A `SmartImage` component falls back to a tasteful gradient + product name if any URL ever fails to load.

---

## Project structure

```
app/
  layout.tsx              # root layout, fonts, ambient glows
  page.tsx                # homepage (live store)
  globals.css             # design tokens, glass utilities
  products/
    page.tsx              # browse all + search + category filter
    [slug]/page.tsx       # product detail with FAQ, specs, related
  categories/[slug]/      # per-category page
  cart/                   # cart page
  checkout/               # Paystack checkout
    success/              # confirmation page
  admin/
    layout.tsx            # admin shell with auth gate
    page.tsx              # dashboard + deal picker
    products/             # list, add, edit (all persistent)
    orders/               # filter, expand, update status
  api/paystack/verify/    # optional server-side payment verification

components/
  Logo.tsx                # Nixon Gadgets custom logo (SVG mark + wordmark)
  Header.tsx              # sticky header, animated cart bump
  Footer.tsx
  Hero.tsx                # photo of smiling person + floating product thumbnails
  CategoryGrid.tsx        # category cards with photo backgrounds
  ProductCard.tsx         # real photo + condition badge + quick-add
  ProductRow.tsx
  DealOfWeek.tsx          # parallax tilt, animated particles, countdown
  WhyBuy.tsx              # 6 trust features
  Reviews.tsx
  BudgetFinder.tsx        # budget × need × condition → matched products
  WhatsAppConsultation.tsx
  FloatingWhatsApp.tsx
  MobileBottomNav.tsx     # Home / Shop / Cart / Chat
  SmartImage.tsx          # img with graceful fallback
  Thumb.tsx               # small image renderer
  admin/
    AdminGate.tsx
    Sidebar.tsx
    MobileTabBar.tsx

lib/
  utils.ts                # cn, formatNaira, whatsappLink, STORE_NAME
  types.ts
  categories.ts           # 6 categories
  seedProducts.ts         # default 16 products + image URL constants
  products.ts             # Zustand store with full CRUD + setDealOfWeek
  cart.ts                 # Zustand store (persisted)
  orders.ts               # Zustand store (persisted, seeded with 2 demo orders)
```

---

## How the data layer works

**Products** live in a Zustand store with `persist` (`lib/products.ts`):

```ts
const products = useProducts((s) => s.products);
const setDealOfWeek = useProducts((s) => s.setDealOfWeek);
const updateProduct = useProducts((s) => s.updateProduct);
```

This is what makes admin edits flow through to the public site immediately — both the homepage and the admin dashboard read from the same store. Defaults come from `lib/seedProducts.ts`; admin edits get layered on top and persist to `localStorage` under the key `nixon-products`.

**Orders** work the same way (`lib/orders.ts`, key `nixon-orders`).

**Cart** also (`lib/cart.ts`, key `nixon-cart`).

For production: swap the Zustand stores for real DB calls (Prisma + Postgres, Supabase, Sanity, etc.). The component layer doesn't need to change much — just replace the hooks.

---

## Paystack flow

1. Customer fills delivery form → clicks "Pay with Paystack"
2. Paystack inline.js opens (modal)
3. On success, an order is created via `useOrders.addOrder` and the customer is redirected to `/checkout/success?ref=...`
4. The success page shows the reference and a "Message us on WhatsApp" button

For production hardening:
1. Set `PAYSTACK_SECRET_KEY` in `.env.local`
2. After the Paystack callback fires on `/checkout`, POST the `reference` to `/api/paystack/verify`
3. Only persist the order if the server responds `{ ok: true }`

The verify route is already scaffolded at `app/api/paystack/verify/route.ts`.

---

## Design tokens

In `tailwind.config.ts`:
- `ink-950` / `ink-900` / `ink-800` — backgrounds
- `accent-electric` (#5B8CFF) — primary accent
- `accent-purple` (#8B5CF6) — secondary accent
- `.glass`, `.glass-strong`, `.text-gradient`, `.border-gradient` — utility classes in `globals.css`
- Fonts: **Sora** (display) + **Inter** (body) from Google Fonts

---

## Deploy

Easiest: **Vercel.**

```bash
npm i -g vercel
vercel
```

Set the same env vars in Vercel (Settings → Environment Variables).

---

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run start   # serve production build
npm run lint    # lint
```

---

Built to be **beautiful enough to impress. Simple enough to buy. Human enough to trust.**
