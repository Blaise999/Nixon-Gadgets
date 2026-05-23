"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "../Logo";

const KEY = "nixon-admin-auth";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  const [checked, setChecked] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setOk(localStorage.getItem(KEY) === "1");
    setChecked(true);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (pw === correct) {
      localStorage.setItem(KEY, "1");
      setOk(true);
    } else {
      setErr("Incorrect password.");
    }
  }

  if (!checked) return null;
  if (ok) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-strong rounded-3xl p-8"
      >
        <div className="mb-5"><LogoMark size={44} /></div>
        <h1 className="font-display text-2xl font-bold mb-1">Admin Sign-in</h1>
        <p className="text-white/55 text-sm mb-6">Demo password is in <code>.env.example</code> (default <code>admin123</code>). Replace with real auth in production.</p>
        <input
          type="password" value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(""); }}
          placeholder="Admin password"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-accent-blue/50 placeholder-white/30"
        />
        {err && <div className="text-red-400 text-xs mt-2">{err}</div>}
        <button className="w-full mt-4 py-3 rounded-full bg-white text-ink-950 font-semibold text-sm">Enter dashboard</button>
      </motion.form>
    </div>
  );
}
