import Link from "next/link";
import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact the YouHooAlert team for partnerships, early access, feedback, or support. Email hello@youhooalert.com.",
  path: "/contact",
  keywords: ["contact YouHooAlert", "YouHooAlert support", "early access request"],
});

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16 px-4">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className="mx-auto max-w-xl text-center">
        <div className="flex justify-center mb-8">
          <BrandLogo />
        </div>
        <Link href="/" className="text-coral text-sm font-medium hover:underline">
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold mt-6 text-foreground">Contact YouHooAlert</h1>
        <p className="mt-4 text-muted leading-relaxed">
          We would love to hear from you — partnerships, early access, feedback, or support.
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
