import type { Metadata } from "next";
import { SITE_URL } from "./site";

export const SEO_KEYWORDS = [
  "trusted response network",
  "emergency coordination app",
  "safety groups app",
  "trusted contacts safety app",
  "community safety app",
  "emergency alert app",
  "personal safety app",
  "SOS app",
  "live location sharing",
  "family safety app",
  "elderly safety app",
  "student safety app",
  "neighborhood safety",
  "free safety app",
  "emergency responder coordination",
  "walking home alone safety",
  "travel safety app",
  "YouHooAlert",
  "helping people help people",
] as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "YouHooAlert",
  title: {
    default: "YouHooAlert — Your Trusted Response Network for Real Emergencies",
    template: "%s | YouHooAlert",
  },
  description:
    "YouHooAlert is a free trusted response network and emergency coordination platform. Build safety groups, route alerts to the right people, and coordinate real-world help when it matters most.",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: "YouHooAlert", url: SITE_URL }],
  creator: "YouHooAlert",
  publisher: "YouHooAlert",
  category: "Safety",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "YouHooAlert",
    title: "YouHooAlert — You Are Never Alone",
    description:
      "A trusted response network that helps people coordinate real-world assistance. Safety groups, smart emergency routing, and live location — free for everyone.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "YouHooAlert — Trusted Response Network for Emergencies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouHooAlert — Trusted Response Network",
    description:
      "Build your trusted safety network. Coordinate real help with safety groups, emergency types, and live location sharing. Free for everyone.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};
