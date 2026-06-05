"use client";

import { motion } from "framer-motion";
import { HERO_CONTACTS } from "@/lib/site";

const toneRing: Record<string, string> = {
  coral: "ring-coral/50",
  green: "ring-coral/40",
  blue: "ring-emerald-300/50",
};

export function HeroPhone() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
      <div className="absolute -inset-8 bg-sos/25 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {HERO_CONTACTS.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.15 }}
          className={`absolute z-20 hidden sm:flex items-center gap-2 rounded-xl card-dark px-3 py-2 shadow-xl ${
            i === 0 ? "right-0 top-8" : i === 1 ? "right-4 top-32" : "right-0 bottom-28"
          }`}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-navy-light text-xs font-bold text-foreground ring-2 ${toneRing[c.tone]}`}
          >
            {c.name.charAt(0)}
          </span>
          <div className="pr-1">
            <p className="text-xs font-semibold text-foreground">{c.name}</p>
            <p className="text-[10px] text-muted">{c.status}</p>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 mx-auto w-[min(100%,280px)]"
      >
        <div className="rounded-[2.75rem] border-[3px] border-foreground/15 bg-navy-light p-2.5 shadow-2xl shadow-black/40">
          <div className="rounded-[2.25rem] bg-gradient-to-b from-[#1a4d3e] to-[#0a1f18] overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <span className="text-[10px] text-muted">9:41</span>
              <span className="text-[10px] font-semibold text-coral">YouHooAlert</span>
            </div>

            <div className="px-5 pb-4 flex flex-col items-center">
              <div className="relative my-4">
                <div className="absolute inset-0 rounded-full bg-sos/40 blur-xl scale-110" />
                <button
                  type="button"
                  className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-b from-sos-soft to-sos glow-sos"
                  aria-label="SOS tap to alert"
                >
                  <span className="text-2xl font-black text-white tracking-tight">SOS</span>
                  <span className="text-[9px] font-bold text-white/90 uppercase mt-0.5">
                    Tap to alert
                  </span>
                </button>
              </div>

              <div className="w-full rounded-xl border border-foreground/10 bg-foreground/5 p-3 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
                  <span className="text-[10px] font-medium text-coral-soft">
                    Your location is live
                  </span>
                </div>
                <div className="h-20 rounded-lg bg-gradient-to-br from-navy-light/80 to-navy relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(212,236,217,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(212,236,217,.06)_1px,transparent_1px)] bg-[size:12px_12px]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 rounded-full bg-sos border-2 border-white shadow-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
