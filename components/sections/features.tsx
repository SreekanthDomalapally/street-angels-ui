"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/site";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { SectionHeading } from "@/components/ui/section-heading";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Platform Features"
          title="A complete emergency coordination platform"
          description="Trusted contacts, safety groups, smart routing, and real-time responder coordination — everything you need, nothing you don't."
        />
        <div className="card-dark p-6 sm:p-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.05 }}
                className="flex items-start gap-4 group"
              >
                <FeatureIcon name={feature.icon} />
                <div className="pt-1">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-coral-soft transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
