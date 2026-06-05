import { ThemeProvider } from "@/components/theme-provider";
import { poppins } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import {
  mobileAppJsonLd,
  organizationJsonLd,
  webSiteJsonLd,
} from "@/lib/structured-data";
import "./globals.css";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [organizationJsonLd(), webSiteJsonLd(), mobileAppJsonLd()];

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
