import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { poppins } from "@/lib/fonts";
import { HeroSection } from "@/components/sections/hero";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { FeaturesSection } from "@/components/sections/features";
import { MissionSection } from "@/components/sections/mission";
import { DownloadDonateSection } from "@/components/sections/download-donate";
import { FaqSection } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <div className={`flex flex-col min-h-screen ${poppins.variable}`}>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <MissionSection />
        <DownloadDonateSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
