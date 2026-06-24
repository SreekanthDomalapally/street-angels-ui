import type { Metadata } from "next";
import { SITE_URL } from "./site";

const DEFAULT_OG_IMAGE = {
  url: "/logo.png",
  width: 512,
  height: 512,
  alt: "YouHooAlert — Trusted Response Network",
};

type PageSeoOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = path === "" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = path === "" ? title : `${title} | YouHooAlert`;

  return {
    title: path === "" ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "YouHooAlert",
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
