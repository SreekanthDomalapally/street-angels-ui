import Link from "next/link";
import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the YouHooAlert team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="mx-auto max-w-xl text-center">
        <div className="flex justify-center mb-8">
          <BrandLogo />
        </div>
        <Link href="/" className="text-coral text-sm font-medium hover:underline">
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold mt-6 text-foreground">Contact</h1>
        <p className="mt-4 text-muted leading-relaxed">
          We would love to hear from you — partnerships, feedback, or support.
        </p>
        <a
          href="mailto:hello@youhooalert.com"
          className="inline-block mt-8 text-lg font-semibold text-coral-soft hover:underline"
        >
          hello@youhooalert.com
        </a>
      </div>
    </main>
  );
}
