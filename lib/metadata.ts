import type { Metadata } from "next";
import { SITE_URL } from "./site";

const keywords = [
  "trusted response network",
  "emergency coordination app",
  "safety groups app",
  "trusted contacts safety",
  "community safety app",
  "emergency alert app",
  "personal safety app",
  "SOS app",
  "live location sharing",
  "family safety app",
  "elderly safety app",
  "student safety app",
  "neighborhood safety",
  "YouHooAlert",
  "helping people help people",
];

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "YouHooAlert — Your Trusted Response Network for Real Emergencies",
    template: "%s | YouHooAlert",
  },
  description:
    "YouHooAlert is a trusted response network and emergency coordination platform. Build safety groups, route alerts to the right people, and coordinate real-world help — free for everyone.",
  keywords,
  authors: [{ name: "YouHooAlert" }],
  creator: "YouHooAlert",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "YouHooAlert",
    title: "YouHooAlert — You Are Never Alone",
    description:
      "A trusted response network that helps people coordinate real-world assistance. Safety groups, smart emergency routing, and live location — free for everyone.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "YouHooAlert" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouHooAlert — Trusted Response Network",
    description:
      "Build your trusted safety network. Coordinate real help with safety groups, emergency types, and live location sharing. Free for everyone.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};
