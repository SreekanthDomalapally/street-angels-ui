"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

export function ValuePropositionSection() {
  return (
    <section id="why" className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,90,95,0.06),transparent)] pointer-events-none" />
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative">
        <SectionHeading
          eyebrow="Why YouHooAlert Exists"
          title="Most safety apps tell people where you are. We help trusted people help you."
          description="YouHooAlert is a trusted response network — not a tracking app, not a social network, and not a crime reporting tool. It's an emergency coordination platform built around the people you trust."
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-dark p-8 border-foreground/10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              What we&apos;re not
            </p>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-3">
                <span className="text-foreground/40 mt-0.5">✕</span>
                A family tracking app that monitors you 24/7
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground/40 mt-0.5">✕</span>
                A social network or location sharing tool
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground/40 mt-0.5">✕</span>
                A simple SOS button with no coordination
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-dark p-8 border-coral/20 bg-coral/5"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-coral-soft mb-4">
              What we are
            </p>
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-3">
                <span className="text-coral mt-0.5">✓</span>
                A trusted response network for real emergencies
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral mt-0.5">✓</span>
                An emergency coordination platform
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral mt-0.5">✓</span>
                A community safety app built on trust
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
