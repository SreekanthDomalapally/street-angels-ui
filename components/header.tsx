"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { NAV_LINKS } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-bg-deep/90 backdrop-blur-xl border-b border-foreground/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <BrandLogo />

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/85 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#download" className="!py-2.5 !px-5 text-sm">
            Download App
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden rounded-lg p-2 text-foreground border border-foreground/10"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-foreground/10 bg-bg-card px-4 py-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-foreground/5"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href="#download" className="w-full mt-2">
            Download App
          </Button>
        </div>
      )}
    </header>
  );
}
