import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd } from "@/components/json-ld";
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
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd(), mobileAppJsonLd()]} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
