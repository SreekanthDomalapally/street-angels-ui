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
          eyebrow="Key Features"
          title="Everything you need to stay connected"
          description="Trusted alerts, live location, and community support — with no subscription required."
        />
        <div className="card-dark p-6 sm:p-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.05 }}
                className="flex items-start gap-4 group"
              >
                <FeatureIcon name={feature.icon} />
                <h3 className="font-semibold text-foreground text-sm sm:text-base pt-2 group-hover:text-coral-soft transition-colors">
                  {feature.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
