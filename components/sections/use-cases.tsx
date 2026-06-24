"use client";

import { motion } from "framer-motion";
import { USE_CASES } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Real-Life Use Cases"
          title="Built for the moments that actually happen"
          description="From walking home alone to caring for an elderly parent — YouHooAlert is designed for real situations, real people, and real help."
        />
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
          {USE_CASES.map((useCase, i) => (
            <motion.article
              key={useCase.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.06 }}
              className="card-dark p-6 sm:p-8 hover:bg-bg-card-hover transition-colors"
            >
              <span className="inline-block rounded-md bg-coral/10 border border-coral/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-coral-soft mb-4">
                {useCase.audience}
              </span>
              <h3 className="text-lg font-bold text-foreground">{useCase.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{useCase.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
