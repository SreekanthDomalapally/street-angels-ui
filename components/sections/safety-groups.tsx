"use client";

import { motion } from "framer-motion";
import { SAFETY_GROUPS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function SafetyGroupsSection() {
  return (
    <section id="safety-groups" className="py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Safety Groups"
          title="Organize the people who matter"
          description="Create groups for every part of your life. Contacts can belong to multiple groups — because the people who help you aren't one-dimensional."
        />
        <div className="card-dark p-6 sm:p-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAFETY_GROUPS.map((group, i) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.04 }}
                className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 hover:border-coral/30 transition-colors"
              >
                <h3 className="font-bold text-foreground text-sm">{group.name}</h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">{group.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted max-w-2xl mx-auto">
            Your partner can be in <span className="text-foreground font-medium">Family</span> and{" "}
            <span className="text-foreground font-medium">Emergency Contacts</span>. A friend can be
            in <span className="text-foreground font-medium">Friends</span> and{" "}
            <span className="text-foreground font-medium">Night Out</span>. Groups are flexible —
            people respond based on who they are to you, not a single label.
          </p>
        </div>
      </div>
    </section>
  );
}
