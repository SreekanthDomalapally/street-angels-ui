import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "YouHooAlert privacy policy — how we handle location data, emergency alerts, and personal information. Privacy-first, no data selling, location shared only during active alerts.",
  path: "/privacy",
  keywords: ["YouHooAlert privacy", "emergency app privacy", "location data policy"],
});

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <article className="mx-auto max-w-3xl text-muted leading-relaxed space-y-4">
        <Link href="/" className="text-coral text-sm font-medium hover:underline">
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold mt-6 text-foreground">Privacy Policy</h1>
        <p>Last updated: June 2026</p>
        <p>
          YouHooAlert is built with privacy first. Location and alert data are shared only
          with contacts you choose during active emergencies. We do not sell personal data.
        </p>
        <p>
          Full policy content will be published before public launch. Contact us with
          questions at{" "}
          <a href="mailto:privacy@youhooalert.com" className="text-coral">
            privacy@youhooalert.com
          </a>
          .
        </p>
      </article>
    </main>
  );
}
