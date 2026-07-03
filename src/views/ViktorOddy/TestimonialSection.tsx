import { useRef } from "react";
import { Quote } from "lucide-react";
import { useInViewAnimation } from "./useInViewAnimation";

const LOGOS = [
  { name: "Apple", width: 80 },
  { name: "IDEO", width: 83 },
  { name: "Polygon", width: 110 },
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

export default function TestimonialSection() {
  return (
    <section className="py-12 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <FadeItem delay={0.1}>
          <Quote className="w-6 h-6 mx-auto mb-4" style={{ color: "#0D212C" }} />
        </FadeItem>
        <FadeItem delay={0.2}>
          <h2 className="font-mondwest text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight" style={{ color: "#0D212C" }}>
            I left Apple to build the studio I always wanted to work with
          </h2>
        </FadeItem>
        <FadeItem delay={0.3}>
          <p className="italic text-sm mt-4" style={{ color: "#273C46" }}>Viktor Oddy</p>
        </FadeItem>
        <FadeItem delay={0.4}>
          <div className="flex items-center justify-center gap-8 mt-6 flex-wrap">
            {LOGOS.map((logo) => (
              <span
                key={logo.name}
                className="font-medium"
                style={{ color: "#0D212C", fontSize: "24px", width: logo.width }}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </FadeItem>
        <FadeItem delay={0.5}>
          <div className="mt-6 flex justify-center">
            <img
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.png&w=1280&q=85"
              alt="Chris Halaska"
              className="w-full max-w-xs rounded-2xl shadow-lg"
            />
          </div>
        </FadeItem>
      </div>
    </section>
  );
}