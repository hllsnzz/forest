import { useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  { name: "Alex Chen", role: "CEO, Nexus Labs", text: "The design quality exceeded our expectations..." },
  { name: "David Zhang", role: "Head of Design, Paradigm Labs", text: "Incredible work from start to finish..." },
  { name: "Sarah Kim", role: "Founder, Aurora Tech", text: "Working with Viktor was a transformative experience for our brand..." },
  { name: "Marcus Lee", role: "CTO, Quantum Studios", text: "The attention to detail and creative vision is unmatched..." },
];

const CARD_WIDTH = 300;
const GAP = 24;

export default function TestimonialCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      const container = scrollRef.current;
      if (!section || !container) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = rect.height;
      const viewportH = window.innerHeight;

      const progress = Math.max(0, Math.min(1,
        (window.scrollY - sectionTop + viewportH) / (sectionHeight + viewportH)
      ));

      const max = Math.max(0, container.scrollWidth - container.clientWidth);
      container.scrollLeft = progress * max;

      rafId.current = requestAnimationFrame(update);
    };

    rafId.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const scrollBy = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = CARD_WIDTH + GAP;
    const target = direction === "left"
      ? container.scrollLeft - amount
      : container.scrollLeft + amount;
    container.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const items = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 overflow-hidden"
      style={{ background: "#F5F5F0" }}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {items.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-3xl p-6"
            style={{
              width: CARD_WIDTH,
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#051A24" }}>
              &ldquo;{t.text}&rdquo;
            </p>
            <p className="text-xs font-medium" style={{ color: "#273C46" }}>
              {t.name}
            </p>
            <p className="text-xs" style={{ color: "#273C46" }}>
              {t.role}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => scrollBy("left")}
          className="flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          style={{
            width: 44, height: 44,
            background: "white",
            border: "1px solid rgba(5,26,36,0.1)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            color: "#051A24",
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollBy("right")}
          className="flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          style={{
            width: 44, height: 44,
            background: "white",
            border: "1px solid rgba(5,26,36,0.1)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            color: "#051A24",
          }}
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}