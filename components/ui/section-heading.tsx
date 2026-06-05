"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl mb-12 ${alignClass}`}
    >
      {eyebrow && (
        <span className="inline-block rounded-lg bg-coral/15 border border-coral/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral-soft mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
      {description && (
        <p className="mt-4 text-muted text-lg leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
