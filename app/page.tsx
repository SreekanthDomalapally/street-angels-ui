import type { Metadata } from "next";
import { Header } from "@/components/header";
import { DonateBanner } from "@/components/donate-banner";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { poppins } from "@/lib/fonts";
import { SEO_KEYWORDS } from "@/lib/metadata";
import { createPageMetadata } from "@/lib/seo";
import { faqJsonLd, homeWebPageJsonLd } from "@/lib/structured-data";
import { HeroSection } from "@/components/sections/hero";
import { ValuePropositionSection } from "@/components/sections/value-proposition";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { FeaturesSection } from "@/components/sections/features";
import { WhyDifferentSection } from "@/components/sections/why-different";
import { EmergencyTypesSection } from "@/components/sections/emergency-types";
import { SafetyGroupsSection } from "@/components/sections/safety-groups";
import { ResponderCoordinationSection } from "@/components/sections/responder-coordination";
import { UseCasesSection } from "@/components/sections/use-cases";
import { MissionSection } from "@/components/sections/mission";
import { DownloadDonateSection } from "@/components/sections/download-donate";
import { FaqSection } from "@/components/sections/faq";

export const metadata: Metadata = createPageMetadata({
  title: "YouHooAlert — Your Trusted Response Network for Real Emergencies",
  description:
    "YouHooAlert is a free trusted response network and emergency coordination platform. Build safety groups, route SOS alerts to the right people, share live location, and coordinate real-world help.",
  path: "",
  keywords: [...SEO_KEYWORDS],
});

export default function HomePage() {
  return (
    <div className={`flex flex-col min-h-screen ${poppins.variable}`}>
      <JsonLd data={[homeWebPageJsonLd(), faqJsonLd()]} />
      <DonateBanner />
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ValuePropositionSection />
        <HowItWorksSection />
        <FeaturesSection />
        <WhyDifferentSection />
        <EmergencyTypesSection />
        <SafetyGroupsSection />
        <ResponderCoordinationSection />
        <UseCasesSection />
        <MissionSection />
        <DownloadDonateSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
