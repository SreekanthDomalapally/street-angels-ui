"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DONATION_AMOUNTS } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function DownloadDonateSection() {
  const comingSoon = true;

  return (
    <section className="py-20 sm:py-24" id="early-access">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-dark p-8 flex flex-col sm:flex-row gap-8 items-center"
          >
            <div className="shrink-0 w-36">
              <div className="rounded-[2rem] border-2 border-foreground/15 p-1.5 bg-navy-light shadow-xl">
                <div className="rounded-[1.6rem] bg-gradient-to-b from-[#141e36] to-[#0a1020] aspect-[9/16] flex flex-col items-center justify-center p-4">
                  <Image src="/logo.png" alt="" width={40} height={40} className="rounded-lg mb-2" />
                  <div className="h-8 w-8 rounded-full bg-gradient-to-b from-sos-soft to-sos flex items-center justify-center text-[8px] font-bold text-white shadow-md shadow-sos/40">
                    SOS
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-foreground">Join Early Access</h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Be among the first to build your trusted safety network. Help shape the
                future of community safety — available soon on iOS &amp; Android.
              </p>
              <div className="mt-5">
                <Button href="mailto:hello@youhooalert.com?subject=Early%20Access%20Request">
                  Request Early Access
                </Button>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 justify-center sm:justify-start">
                <span className="inline-flex items-center rounded-lg bg-foreground/10 border border-foreground/15 px-4 py-2 text-xs font-semibold text-foreground/70">
                  App Store — Soon
                </span>
                <span className="inline-flex items-center rounded-lg bg-foreground/10 border border-foreground/15 px-4 py-2 text-xs font-semibold text-foreground/70">
                  Google Play — Soon
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            id="donate"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="card-dark p-8 relative overflow-hidden"
          >
            <div className="absolute -right-6 -bottom-6 text-8xl opacity-[0.06]" aria-hidden>
              ♥
            </div>
            <h2 className="text-2xl font-bold text-foreground">Keep safety accessible for everyone</h2>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-md">
              YouHooAlert is free — and we intend to keep it that way. But every new user and
              every alert sent adds to server, messaging, and infrastructure costs. Optional
              donations help us scale responsibly without putting safety behind a paywall.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {DONATION_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  disabled={comingSoon}
                  className="min-w-[3.5rem] rounded-xl border border-foreground/15 bg-foreground/5 px-5 py-2.5 font-bold text-foreground hover:border-coral hover:text-coral transition-colors disabled:opacity-60"
                >
                  ₹{amount}
                </button>
              ))}
              <button
                type="button"
                disabled={comingSoon}
                className="rounded-xl border border-coral/50 bg-coral/20 px-5 py-2.5 font-bold text-coral-soft hover:bg-coral/30 transition-colors disabled:opacity-60 inline-flex items-center gap-2"
              >
                <span aria-hidden>♥</span> Custom
              </button>
            </div>
            <p className="mt-5 text-[11px] text-muted">
              Secure payments powered by Stripe — integration coming soon.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
