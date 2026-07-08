import { ArrowRight, Sparkles, Box, LayoutGrid, Target } from "lucide-react";

const PROJECTS = [
  {
    id: "toonhub",
    title: "TOONHUB",
    subtitle: "3D Character Figurine Carousel",
    description:
      "An immersive, full-viewport showcase for character figurines with fluid carousel transitions.",
    icon: Box,
    available: true,
    path: "/toonhub",
    color: "#F4845F",
  },
  {
    id: "foldcraft",
    title: "FOLDCRAFT",
    subtitle: "Creative Studio Hero Landing",
    description:
      "A fullscreen hero landing page with looping video background, responsive navbar, and staggered animations.",
    icon: Sparkles,
    available: true,
    path: "/foldcraft",
    color: "#ffffff",
  },
  {
    id: "jack",
    title: "JACK",
    subtitle: "3D Creator Portfolio",
    description:
      "A dark-themed 3D creator portfolio with scroll-driven marquee, magnetic portrait, and sticky card projects.",
    icon: Sparkles,
    available: true,
    path: "/jack",
    color: "#B600A8",
  },
  {
    id: "portfolio",
    title: "PORTFOLIO",
    subtitle: "Michael Smith -- Dark Portfolio",
    description:
      "A single-page dark portfolio landing page with GSAP animations, HLS video, sticky project cards, and a full-screen loading intro.",
    icon: Sparkles,
    available: true,
    path: "/portfolio",
    color: "#6BBF7A",
  },
  {
    id: "viktor",
    title: "VIKTOR ODDY",
    subtitle: "Creative Design Studio",
    description:
      "A single-page landing page for a creative design studio with marquee, pricing cards, testimonial carousel, and interactive partner section.",
    icon: Sparkles,
    available: true,
    path: "/viktor",
    color: "#0D212C",
  },
  {
    id: "lithos",
    title: "LITHOS",
    subtitle: "Geology Brand Hero — Spotlight Reveal",
    description:
      "A full-screen dark hero section for a geology brand with cursor-following spotlight reveal, canvas mask, and animated typography.",
    icon: Sparkles,
    available: true,
    path: "/lithos",
    color: "#e8702a",
  },
  {
    id: "synapse",
    title: "SYNAPSEX",
    subtitle: "Neural-AI Interface Product",
    description:
      "A single-page landing site for a futuristic neural-AI interface with mouse-scrubbed video, scroll-driven 3D text, and scramble text animations.",
    icon: Sparkles,
    available: true,
    path: "/synapse",
    color: "#ffffff",
  },
  {
    id: "prisma",
    title: "PRISMA",
    subtitle: "Creative Studio Landing Page",
    description:
      "A dark cinematic landing page for a creative studio with video backgrounds, noise overlays, pull-up text animations, and scroll-driven letter reveals.",
    icon: Sparkles,
    available: true,
    path: "/prisma",
    color: "#DEDBC8",
  },
  {
    id: "rivr",
    title: "RIVR",
    subtitle: "DeFi Dashboard Hero — Glassmorphism",
    description:
      "A sleek glassmorphism hero section for a DeFi dashboard with video background, animated badges, corner cutout panel, and premium UI.",
    icon: Sparkles,
    available: true,
    path: "/rivr",
    color: "#5E6470",
  },
  {
    id: "mainframe",
    title: "MAINFRAME",
    subtitle: "Interactive Hero — Typewriter + Scrub Video",
    description:
      "A modern interactive hero with scrubbable video, typewriter headline, multi-select service pills, and dynamic feedback banner.",
    icon: Sparkles,
    available: true,
    path: "/mainframe",
    color: "#1C2E1E",
  },
  {
    id: "cozypaws",
    title: "COZYPAWS",
    subtitle: "Pet Store Hero Landing",
    description: "A single-page pet store hero with staggered word animations, responsive breakpoints, and floating product cards.",
    icon: Sparkles,
    available: true,
    path: "/cozypaws",
    color: "#E86A10",
  },
  {
    id: "marketeam",
    title: "MARKETEAM",
    subtitle: "Marketing Talent Platform",
    description: "A marketing talent platform landing page with typewriter effect, animated orbit circles, and infinite logo ticker.",
    icon: Sparkles,
    available: true,
    path: "/marketeam",
    color: "#A068FF",
  },
  {
    id: "project-2",
    title: "PROJECT ALPHA",
    subtitle: "Interactive Experience",
    description:
      "A groundbreaking interactive experience pushing the boundaries of web-based 3D rendering.",
    icon: LayoutGrid,
    available: false,
    path: "",
    color: "#6BBF7A",
  },
  {
    id: "project-3",
    title: "PROJECT BETA",
    subtitle: "Data Visualization",
    description:
      "Real-time data visualization engine for complex multidimensional datasets.",
    icon: Target,
    available: false,
    path: "",
    color: "#6EB5FF",
  },
  {
    id: "project-4",
    title: "PROJECT GAMMA",
    subtitle: "Generative Design",
    description:
      "AI-powered generative design tool for creating unique visual artifacts.",
    icon: Sparkles,
    available: false,
    path: "",
    color: "#E882B4",
  },
];

function DotPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <defs>
        <pattern
          id="dots"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

interface HomeProps {
  onNavigate: (path: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#080808", fontFamily: "'Inter', sans-serif" }}
    >
      <DotPattern />

      {/* Gradient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 1,
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(244,132,95,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 1,
          bottom: "-15%",
          left: "-5%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(110,181,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        className="relative"
        style={{ zIndex: 10, padding: "2rem 2rem 4rem" }}
      >
        {/* Brand chip */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "0.35rem 0.9rem",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.03)",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
            }}
          >
            FOREST бд STUDIO
          </span>
        </div>

        {/* Heading */}
        <div className="mb-16 sm:mb-24" style={{ maxWidth: 640 }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              marginBottom: "1rem",
            }}
          >
            Explore the collection
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: 0,
            }}
          >
            A curated set of interactive experiments and visual tools. Each
            project is crafted with care for detail and performance.
          </p>
        </div>

        {/* Section label with decorative line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "1.75rem",
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            SELECT PROJECT
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Project grid */}
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          }}
        >
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            const isAvailable = project.available;

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (isAvailable && project.path) onNavigate(project.path);
                }}
                style={{
                  position: "relative",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: "1.5rem 1.5rem 1.25rem",
                  background: isAvailable
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(255,255,255,0.01)",
                  cursor: isAvailable ? "pointer" : "default",
                  transition:
                    "transform 400ms cubic-bezier(0.4,0,0.2,1), background 400ms cubic-bezier(0.4,0,0.2,1), border-color 400ms cubic-bezier(0.4,0,0.2,1)",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!isAvailable) return;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = isAvailable
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(255,255,255,0.01)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                {/* Color accent bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: isAvailable
                      ? project.color
                      : "rgba(255,255,255,0.08)",
                    borderRadius: "16px 16px 0 0",
                    opacity: isAvailable ? 0.6 : 0.3,
                    transition: "opacity 300ms",
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isAvailable
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.03)",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    color={
                      isAvailable
                        ? "rgba(255,255,255,0.8)"
                        : "rgba(255,255,255,0.2)"
                    }
                  />
                </div>

                {/* Title & subtitle */}
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: isAvailable ? "white" : "rgba(255,255,255,0.3)",
                    letterSpacing: "0.02em",
                    margin: 0,
                    marginBottom: "0.25rem",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: isAvailable
                      ? "rgba(255,255,255,0.5)"
                      : "rgba(255,255,255,0.2)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    margin: 0,
                    marginBottom: "0.75rem",
                  }}
                >
                  {project.subtitle}
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: isAvailable
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(255,255,255,0.15)",
                    lineHeight: 1.6,
                    margin: 0,
                    marginBottom: "1.25rem",
                  }}
                >
                  {project.description}
                </p>

                {/* Bottom row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {isAvailable ? (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.35)",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "color 300ms",
                      }}
                    >
                      VIEW PROJECT
                      <ArrowRight size={12} strokeWidth={1.5} />
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        color: "rgba(255,255,255,0.15)",
                        padding: "0.25rem 0.6rem",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      COMING SOON
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ marginTop: "5rem", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.1em",
            }}
          >
            FOREST бд INTERACTIVE STUDIO
          </p>
        </div>
      </div>
    </div>
  );
}
