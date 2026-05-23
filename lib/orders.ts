"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order, OrderStatus } from "./types";

type OrdersState = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: OrderStatus) => void;
};

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [
        {
          id: "ord_001", reference: "vc_demo_001",
          customer: { name: "Chinedu Okafor", email: "chinedu@example.com", phone: "08012345678", address: "12 Allen Avenue", city: "Lagos" },
          items: [{ id: "p1-default", productId: "p1", name: "iPhone 15 Pro Max", price: 1850000, qty: 1, image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&q=80&auto=format&fit=crop" }],
          subtotal: 1850000, deliveryFee: 5000, total: 1855000,
          status: "Paid", createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "ord_002", reference: "vc_demo_002",
          customer: { name: "Aisha Bello", email: "aisha@example.com", phone: "08098765432", address: "5 Wuse II", city: "Abuja" },
          items: [{ id: "p8-default", productId: "p8", name: "AirPods Pro (2nd Gen)", price: 285000, qty: 2, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80&auto=format&fit=crop" }],
          subtotal: 570000, deliveryFee: 7500, total: 577500,
          status: "Out for delivery", createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ],
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      updateStatus: (id, status) => set((s) => ({ orders: s.orders.map(o => o.id === id ? { ...o, status } : o) })),
    }),
    {
      name: "nixon-orders",
      version: 2,
    }
  )
);
