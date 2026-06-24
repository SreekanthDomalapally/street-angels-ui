import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { poppins } from "@/lib/fonts";
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

export default function HomePage() {
  return (
    <div className={`flex flex-col min-h-screen ${poppins.variable}`}>
      <Header />
      <main className="flex-1">
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
