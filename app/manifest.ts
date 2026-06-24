import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YouHooAlert — Trusted Response Network",
    short_name: "YouHooAlert",
    description:
      "Free emergency coordination app. Build safety groups, alert trusted contacts, and coordinate real-world help.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a1020",
    theme_color: "#ff5a5f",
    lang: "en",
    orientation: "portrait",
    categories: ["health", "lifestyle", "utilities"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
    id: SITE_URL,
  };
}
