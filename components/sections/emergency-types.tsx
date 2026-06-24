"use client";

import { motion } from "framer-motion";
import { EMERGENCY_TYPES } from "@/lib/site";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { SectionHeading } from "@/components/ui/section-heading";

export function EmergencyTypesSection() {
  return (
    <section id="emergency-types" className="py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Emergency Types"
          title="The right alert reaches the right people"
          description="Different situations need different responders. Choose an emergency type and YouHooAlert routes your alert to the safety group you've set up for it."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {EMERGENCY_TYPES.map((type, i) => (
            <motion.article
              key={type.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.05 }}
              className="card-dark p-6 hover:bg-bg-card-hover transition-colors"
            >
              <FeatureIcon name={type.icon} />
              <h3 className="mt-4 font-bold text-foreground">{type.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{type.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
