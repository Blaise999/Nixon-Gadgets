import { NextResponse } from "next/server";

// Optional server-side Paystack verification.
// Call this from the client after successful Paystack callback to confirm
// the payment is actually authentic before fulfilling the order.
//
// Add PAYSTACK_SECRET_KEY to your .env.local (NOT NEXT_PUBLIC_).
// Get it from https://dashboard.paystack.com → Settings → API Keys.

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();
    if (!reference) {
      return NextResponse.json({ ok: false, error: "Missing reference" }, { status: 400 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ ok: false, error: "Server is not configured (PAYSTACK_SECRET_KEY missing)" }, { status: 500 });
    }

    const r = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    const data = await r.json();

    if (!data?.status || data?.data?.status !== "success") {
      return NextResponse.json({ ok: false, data }, { status: 402 });
    }

    return NextResponse.json({
      ok: true,
      reference,
      amount: data.data.amount / 100,
      currency: data.data.currency,
      customer: data.data.customer,
      paidAt: data.data.paid_at,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
