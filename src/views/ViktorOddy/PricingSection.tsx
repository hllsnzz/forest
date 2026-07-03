import { useInViewAnimation } from "./useInViewAnimation";
import Button from "./Button";

function Card({ dark, delay, title, desc, price }: { dark: boolean; delay: number; title: string; desc: string; price?: string }) {
  const { ref, isInView } = useInViewAnimation();
  return (
    <div
      ref={ref}
      className={isInView ? "animate-fade-in-up" : "opacity-0"}
      style={{
        animationDelay: `${delay}s`,
        borderRadius: 40,
        padding: "0.75rem 2.5rem 2.5rem 2.5rem",
        background: dark ? "#051A24" : "white",
        boxShadow: dark
          ? "inset 0 0 0 1px rgba(255,255,255,0.06)"
          : "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        className="text-[22px] font-medium mb-2"
        style={{ color: dark ? "#F6FCFF" : "#051A24" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: dark ? "#E0EBF0" : "#051A24" }}>
        {desc.split(" / ").map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}
      </p>
      {price && (
        <p className="text-2xl font-semibold mb-1" style={{ color: dark ? "#F6FCFF" : "#051A24" }}>
          {price}
          <span className="text-sm font-normal ml-1" style={{ color: dark ? "#E0EBF0" : "#051A24" }}>Monthly</span>
        </p>
      )}
      <div className="flex gap-3 mt-4">
        <Button variant="primary" href="https://halaskastudio.com/./book">
          Start a chat
        </Button>
        <Button variant={dark ? "tertiary" : "secondary"} href="https://halaskastudio.com/./book">
          How it works
        </Button>
      </div>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="w-full py-12 px-6">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-4xl md:justify-end">
        <Card
          dark
          delay={0.1}
          title="Monthly Partnership"
          desc="A dedicated creative design team. / You work directly with Viktor."
          price="$5,000"
        />
        <Card
          dark={false}
          delay={0.2}
          title="Custom Project"
          desc="Fixed scope, fixed timeline. / Perfect for one-off deliverables."
        />
      </div>
    </section>
  );
}