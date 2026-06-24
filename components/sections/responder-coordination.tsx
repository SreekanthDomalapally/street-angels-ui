"use client";

import { motion } from "framer-motion";
import { RESPONDER_OPTIONS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function ResponderCoordinationSection() {
  return (
    <section id="responder-coordination" className="py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Responder Coordination"
          title="When you alert, your network acts"
          description="Trusted contacts don't just get a notification — they get your location, distance, ETA, and clear response options to coordinate help together."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-dark p-8"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">What responders see</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-coral mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-foreground">Live location</span>
                  <p className="text-muted mt-0.5">Real-time map position so they can find you</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-coral mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-foreground">Distance &amp; ETA</span>
                  <p className="text-muted mt-0.5">How far away they are and when they can arrive</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-coral mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-foreground">Emergency type</span>
                  <p className="text-muted mt-0.5">Medical, safety, pickup, breakdown — context matters</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-coral mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-foreground">Who else is responding</span>
                  <p className="text-muted mt-0.5">See other responders coordinating in real time</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold text-foreground mb-4 px-1">Response options</h3>
            {RESPONDER_OPTIONS.map((option, i) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card-dark px-5 py-4 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-foreground text-sm">{option.label}</p>
                  <p className="text-xs text-muted mt-0.5">{option.description}</p>
                </div>
                <span className="text-coral text-lg shrink-0" aria-hidden>→</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
