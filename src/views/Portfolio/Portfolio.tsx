import "./portfolio.css";
import { useState } from "react";
import { LoadingScreen, HeroSection, WorksSection, JournalSection, ExplorationsSection, StatsSection, FooterSection } from "./PortfolioComponents";

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main className="font-body bg-bg text-text-primary">
        <HeroSection />
        <WorksSection />
        <JournalSection />
        <ExplorationsSection />
        <StatsSection />
        <FooterSection />
      </main>
    </>
  );
}
