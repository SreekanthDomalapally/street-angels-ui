import { FAQ_ITEMS, SITE_URL } from "./site";

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
    email: "hello@youhooalert.com",
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
    publisher: {
      "@type": "Organization",
      name: "YouHooAlert",
      url: SITE_URL,
    },
  };
}

export function mobileAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "YouHooAlert",
    url: SITE_URL,
    operatingSystem: "iOS, Android",
    applicationCategory: "HealthApplication",
    applicationSubCategory: "Personal Safety",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
    },
    description:
      "Free trusted response network and emergency coordination app with safety groups, smart routing, responder coordination, and live location sharing.",
    featureList: [
      "Trusted contacts",
      "Safety groups",
      "Emergency types",
      "Live location sharing",
      "Responder coordination",
      "Smart emergency routing",
      "Privacy-first alerts",
    ],
  };
}

export function homeWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "YouHooAlert — Your Trusted Response Network for Real Emergencies",
    url: SITE_URL,
    description:
      "YouHooAlert connects you to a trusted response network so the right people receive your alert, see your live location, and coordinate real help when you need it most.",
    isPartOf: {
      "@type": "WebSite",
      name: "YouHooAlert",
      url: SITE_URL,
    },
    about: {
      "@type": "MobileApplication",
      name: "YouHooAlert",
      applicationCategory: "HealthApplication",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}
