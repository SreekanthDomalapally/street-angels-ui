"use client";

import { motion } from "framer-motion";
import { WHY_DIFFERENT } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyDifferentSection() {
  return (
    <section id="why-different" className="py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why We're Different"
          title="Tracking tells people where you are. We help them get to you."
          description="Traditional safety apps focus on visibility. YouHooAlert focuses on action — real people coordinating real help."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-dark p-8"
          >
            <h3 className="text-lg font-bold text-muted mb-6">Traditional Safety Apps</h3>
            <ul className="space-y-5">
              {WHY_DIFFERENT.traditional.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted/60 w-24 shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  <span className="text-sm text-muted">{item.detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card-dark p-8 border-coral/20 bg-coral/5"
          >
            <h3 className="text-lg font-bold text-coral-soft mb-6">YouHooAlert</h3>
            <ul className="space-y-5">
              {WHY_DIFFERENT.youhoo.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-coral w-24 shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  <span className="text-sm text-foreground">{item.detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
