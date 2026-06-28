import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { PRIVACY_LAST_UPDATED, PRIVACY_SECTIONS } from "@/lib/privacy-policy";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "YouHooAlert privacy policy — how we handle location data, emergency alerts, trusted contacts, and personal information. Privacy-first, no data selling, location shared only during active alerts.",
  path: "/privacy",
  keywords: [
    "YouHooAlert privacy",
    "emergency app privacy",
    "location data policy",
    "trusted contacts privacy",
    "safety app data policy",
  ],
});

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <Header />
      <main id="main-content" className="flex-1 pt-8 pb-16 px-4 sm:px-6">
        <article className="mx-auto max-w-3xl">
          <Link href="/" className="text-coral text-sm font-medium hover:underline">
            ← Back to home
          </Link>

          <header className="mt-6 mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="mt-3 text-sm text-muted">Last updated: {PRIVACY_LAST_UPDATED}</p>
            <p className="mt-4 text-muted leading-relaxed">
              YouHooAlert is built with privacy first. This policy explains how we handle your
              data when you use our trusted response network and emergency coordination platform.
            </p>
          </header>

          <div className="space-y-10 text-muted leading-relaxed">
            {PRIVACY_SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>

                {"paragraphs" in section &&
                  section.paragraphs?.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="mt-3 first:mt-0">
                      {paragraph}
                      {"email" in section && section.email && (
                        <>
                          {" "}
                          <a
                            href={`mailto:${section.email}`}
                            className="text-coral hover:text-coral-soft transition-colors"
                          >
                            {section.email}
                          </a>
                          .
                        </>
                      )}
                    </p>
                  ))}

                {"bullets" in section && section.bullets && (
                  <ul className="mt-3 space-y-2 list-disc pl-5">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {"subsections" in section &&
                  section.subsections?.map((sub) => (
                    <div key={sub.heading} className="mt-5">
                      <h3 className="text-base font-semibold text-foreground">{sub.heading}</h3>
                      <p className="mt-2">{sub.text}</p>
                    </div>
                  ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
