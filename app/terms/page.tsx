import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "YouHooAlert terms of service. A community assistance and emergency coordination tool — not a replacement for emergency services. Read our usage terms.",
  path: "/terms",
  keywords: ["YouHooAlert terms", "emergency app terms of service"],
});

export default function TermsPage() {
  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <article className="mx-auto max-w-3xl text-muted leading-relaxed space-y-4">
        <Link href="/" className="text-coral text-sm font-medium hover:underline">
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold mt-6 text-foreground">Terms of Service</h1>
        <p className="mt-4 text-muted leading-relaxed">
          YouHooAlert is a community assistance tool, not a replacement for emergency services.
          Always call local emergency numbers when in immediate danger.
        </p>
        <p className="mt-4 text-muted leading-relaxed">
          Complete terms will be published before launch. Questions:{" "}
          <a href="mailto:legal@youhooalert.com" className="text-coral">
            legal@youhooalert.com
          </a>
          .
        </p>
      </article>
    </main>
  );
}
