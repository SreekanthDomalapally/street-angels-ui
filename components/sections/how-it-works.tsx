"use client";

import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";

function StepIcon({ type }: { type: string }) {
  const cls = "h-8 w-8 text-coral";
  if (type === "alert") {
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    );
  }
  if (type === "help") {
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M4.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 relative">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How It Works"
          title="Three simple steps"
          description="From SOS to help on the way — designed to stay calm and clear under pressure."
        />

        <div className="relative grid md:grid-cols-3 gap-6 lg:gap-8">
          <div
            className="hidden md:block absolute top-16 left-[16%] right-[16%] border-t border-dashed border-foreground/15"
            aria-hidden
          />
          {HOW_IT_WORKS.map((item, i) => (
            <motion.article
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative card-dark p-8 text-center hover:bg-bg-card-hover transition-colors"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral text-bg-deep text-sm font-bold mb-5 ring-4 ring-bg">
                {item.step}
              </span>
              <div className="flex justify-center mb-4">
                <div className="rounded-xl bg-coral/10 p-3 border border-coral/20">
                  <StepIcon type={item.icon} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
