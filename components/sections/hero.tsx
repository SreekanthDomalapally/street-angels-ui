"use client";

import { motion } from "framer-motion";
import { HeroPhone } from "@/components/hero-phone";
import { Button, DownloadIcon, PlayIcon } from "@/components/ui/button";

function CitySilhouette() {
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 w-full opacity-[0.12] text-foreground pointer-events-none"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0 120V80h40v40h30V60h50v60h40V70h60v50h80V40h50v80h70V55h45v65h55V90h40v30h90V50h60v70h85V65h50v55h120V120H0z"
      />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center pt-8 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(158,214,122,0.2),transparent)] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-coral/10 rounded-full blur-[100px] pointer-events-none" />
      <CitySilhouette />

      <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
        <div className="z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-foreground"
          >
            You are never{" "}
            <span className="text-coral">alone.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted leading-relaxed max-w-xl"
          >
            One tap sends SOS alerts and live location to trusted contacts. Community-driven,
            free for everyone, and built for the moments that matter.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button href="#download">
              <DownloadIcon />
              Download App
            </Button>
            <Button href="#how-it-works" variant="outline">
              <PlayIcon />
              How It Works
            </Button>
          </motion.div>
        </div>
        <HeroPhone />
      </div>
    </section>
  );
}
