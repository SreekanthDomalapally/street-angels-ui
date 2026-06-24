import { SITE_URL } from "./site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YouHooAlert",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    slogan: "Helping People Help People.",
    description:
      "Trusted response network and emergency coordination platform that helps people alert trusted contacts, coordinate real-world assistance, and share live location during emergencies.",
    sameAs: [
      "https://www.linkedin.com/company/youhooalert",
      "https://www.facebook.com/youhooalert",
      "https://www.instagram.com/youhooalert",
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YouHooAlert",
    url: SITE_URL,
    description:
      "Trusted response network for safety groups, emergency coordination, and live location sharing with trusted contacts.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function mobileAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "YouHooAlert",
    operatingSystem: "iOS, Android",
    applicationCategory: "HealthApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Trusted response network and emergency coordination app with safety groups, smart routing, and live location sharing.",
  };
}
