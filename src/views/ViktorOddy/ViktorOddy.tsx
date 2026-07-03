import { useInViewAnimation } from "./useInViewAnimation";
import "./viktor.css";
import TestimonialSection from "./TestimonialSection";
import PricingSection from "./PricingSection";
import TestimonialCarousel from "./TestimonialCarousel";
import ProjectsSection from "./ProjectsSection";
import PartnerSection from "./PartnerSection";
import Footer from "./Footer";
import CopyrightBar from "./CopyrightBar";
import BottomNav from "./BottomNav";
import Button from "./Button";

const MARQUEE_SRCS = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
];

function FadeItem({ delay, children }: { delay: number; children: React.ReactNode }) {
  const { ref, isInView } = useInViewAnimation();
  return (
    <div
      ref={ref}
      className={isInView ? "animate-fade-in-up" : "opacity-0"}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function ViktorOddy() {
  return (
    <div
      className="w-full min-h-screen"
      style={{
        background: "white",
        fontFamily: "'PP Neue Montreal', 'Inter', system-ui, sans-serif",
      }}
    >
      {/* ===== HERO ===== */}
      <section className="mx-auto max-w-[440px] px-6 pt-12 md:pt-16">
        <FadeItem delay={0.1}>
          <h1
            className="font-mondwest text-[32px] md:text-[40px] lg:text-[44px] font-semibold tracking-tight mb-4"
            style={{ color: "#051A24" }}
          >
            Viktor Oddy
          </h1>
        </FadeItem>
        <FadeItem delay={0.2}>
          <p className="font-mono text-xs md:text-sm mb-2" style={{ color: "#051A24" }}>
            The creative studio of Viktor Oddy
          </p>
        </FadeItem>
        <FadeItem delay={0.3}>
          <h2
            className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight"
            style={{ color: "#0D212C" }}
          >
            Build the next wave,<br />
            the bold way.
          </h2>
        </FadeItem>
        <FadeItem delay={0.4}>
          <div className="flex flex-col gap-6 text-sm md:text-base leading-relaxed mt-5 md:mt-6" style={{ color: "#051A24" }}>
            <p>
              I spent seven years at Apple crafting products used by over a billion people. I founded Vortex Studio to bring that same level of thinking to innovators shaping what comes next.
            </p>
            <p>
              The studio is deliberately small. I guide the creative vision on every project, backed by a veteran design crew that moves fast without cutting corners.
            </p>
            <p>Projects start at $5,000 per month.</p>
          </div>
        </FadeItem>
        <FadeItem delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-5 md:mt-6">
            <Button variant="primary">Start a chat</Button>
            <Button variant="secondary">View projects</Button>
          </div>
        </FadeItem>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="w-full mt-16 md:mt-20 mb-16 overflow-hidden">
        <div className="flex animate-marquee" style={{ width: "fit-content" }}>
          {[...MARQUEE_SRCS, ...MARQUEE_SRCS].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-[280px] md:h-[500px] object-cover mx-3 rounded-2xl shadow-lg flex-shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* ===== SECTIONS ===== */}
      <TestimonialSection />
      <PricingSection />
      <TestimonialCarousel />
      <ProjectsSection />
      <PartnerSection />
      <Footer />
      <CopyrightBar />
      <BottomNav />
    </div>
  );
}