export type Condition = "Brand New" | "UK Used" | "Open Box";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  condition: Condition;
  storage?: string;
  ram?: string;
  color?: string;
  inStock: boolean;
  stockCount?: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  dealOfWeek?: boolean;
  image: string;
  gallery?: string[];
  shortNote?: string;
  specs?: Record<string, string>;
  whatsInBox?: string[];
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  variant?: string;
  image: string;
};

export type OrderStatus = "Pending" | "Paid" | "Processing" | "Out for delivery" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  reference: string;
  customer: { name: string; email: string; phone: string; address: string; city: string };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
};
