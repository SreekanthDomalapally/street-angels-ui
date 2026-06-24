"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

export function MissionSection() {
  return (
    <section id="mission" className="py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="card-dark p-8 sm:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <SectionHeading
            align="left"
            eyebrow="Our Mission"
            title="Helping People Help People."
          />
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-muted leading-relaxed"
          >
            <p>
              Safety shouldn&apos;t be a luxury. YouHooAlert exists because we believe
              everyone deserves a trusted network of people who can respond when life
              gets hard — not an app that watches them 24/7.
            </p>
            <ul className="space-y-2">
              {[
                "Free for everyone — no paywalls on safety.",
                "No premium features locked behind subscriptions.",
                "Community-supported through optional donations.",
                "Built on trust, not surveillance.",
              ].map((line) => (
                <li key={line} className="flex items-center gap-3 text-foreground font-medium text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="text-foreground font-semibold">
              A platform where communities look out for each other — and help arrives
              because people care, not because an algorithm flagged a location.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
