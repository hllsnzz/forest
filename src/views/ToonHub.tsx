import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import img1 from "../assets/images/toonhub/1.png";
import img2 from "../assets/images/toonhub/2.png";
import img3 from "../assets/images/toonhub/3.png";
import img4 from "../assets/images/toonhub/4.png";

const IMAGES = [
  { src: img1, bg: "#F4845F", panel: "#F79B7F" },
  { src: img2, bg: "#6BBF7A", panel: "#85CC92" },
  { src: img3, bg: "#E882B4", panel: "#ED9DC4" },
  { src: img4, bg: "#6EB5FF", panel: "#8DC4FF" },
];

type Role = "center" | "left" | "right" | "back";
type NavDir = "next" | "prev";
const ANIM_DURATION = 650;
const BEZIER = "cubic-bezier(0.4,0,0.2,1)";

function getRoles(activeIndex: number): Record<Role, number> {
  return {
    center: activeIndex,
    left: (activeIndex + 3) % 4,
    right: (activeIndex + 1) % 4,
    back: (activeIndex + 2) % 4,
  };
}

interface ToonHubProps { onBack?: () => void; }

export default function ToonHub({ onBack }: ToonHubProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    IMAGES.forEach((img) => {
      const i = new Image();
      i.src = img.src;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useCallback(
    (dir: NavDir) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        dir === "next" ? (prev + 1) % 4 : (prev + 3) % 4,
      );
      setTimeout(() => setIsAnimating(false), ANIM_DURATION);
    },
    [isAnimating],
  );

  const roles = getRoles(activeIndex);

  const itemStyle = (role: Role) => {
    const base: Record<string, string> = {
      position: "absolute",
      transition: `transform ${ANIM_DURATION}ms ${BEZIER}, filter ${ANIM_DURATION}ms ${BEZIER}, opacity ${ANIM_DURATION}ms ${BEZIER}, left ${ANIM_DURATION}ms ${BEZIER}, height ${ANIM_DURATION}ms ${BEZIER}, bottom ${ANIM_DURATION}ms, z-index ${ANIM_DURATION}ms ${BEZIER}`,
      willChange: "transform, filter, opacity",
      aspectRatio: "0.6 / 1",
    };

    switch (role) {
      case "center":
        return {
          ...base,
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
          left: "50%",
          height: isMobile ? "60%" : "92%",
          bottom: isMobile ? "22%" : "0",
        };
      case "left":
        return {
          ...base,
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "20%" : "30%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
        };
      case "right":
        return {
          ...base,
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "80%" : "70%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
        };
      case "back":
        return {
          ...base,
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: 1,
          zIndex: 5,
          left: "50%",
          height: isMobile ? "13%" : "22%",
          bottom: isMobile ? "32%" : "12%",
        };
    }
  };

  return (
    <div
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: `background-color ${ANIM_DURATION}ms ${BEZIER}`,
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full overflow-hidden"
    >
      <div
        className="relative w-full"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-4 sm:top-10 sm:left-10 flex items-center gap-2 cursor-pointer"
            style={{
              zIndex: 70,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 999,
              padding: "0.4rem 1rem",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              transition: "background 200ms, transform 200ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.18)";
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            BACK
          </button>
        )}
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />
        {/* Giant ghost text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            zIndex: 2,
            top: "18%",
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(90px, 28vw, 380px)",
            fontWeight: 900,
            color: "white",
            opacity: 1,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          3D SHAPE
        </div>
        {/* Brand label */}
        <div
          className="absolute top-6 left-4 sm:left-8"
          style={{
            zIndex: 60,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "white",
            opacity: 0.9,
            letterSpacing: "0.18em",
          }}
        >
          TOONHUB
        </div>
        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((img, idx) => {
            let role: Role | null = null;
            for (const [r, i] of Object.entries(roles)) {
              if (i === idx) role = r as Role;
            }
            return (
              <div key={idx} style={itemStyle(role!)}>
                <img
                  src={img.src}
                  alt=""
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* Bottom-left text + nav buttons */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <p
            className="mb-2 sm:mb-3 text-base sm:text-[22px]"
            style={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              color: "white",
              opacity: 0.95,
            }}
          >
            TOONHUB FIGURINES
          </p>
          <p
            className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
            style={{ color: "white", opacity: 0.85, lineHeight: 1.6 }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a
            vision, the 3D craft is flawless. Many thanks! Wishing you the win.
            Order now.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("prev")}
              className="flex items-center justify-center rounded-full cursor-pointer"
              style={{
                width: isMobile ? 48 : 64,
                height: isMobile ? 48 : 64,
                background: "transparent",
                border: "2px solid white",
                color: "white",
                transition: "transform 150ms, background-color 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate("next")}
              className="flex items-center justify-center rounded-full cursor-pointer"
              style={{
                width: isMobile ? 48 : 64,
                height: isMobile ? 48 : 64,
                background: "transparent",
                border: "2px solid white",
                color: "white",
                transition: "transform 150ms, background-color 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>
        {/* Bottom-right link */}
        <a
          href="#"
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-1 sm:gap-2"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(20px, 4vw, 56px)",
            fontWeight: 400,
            color: "white",
            opacity: 0.95,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 200ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.95";
          }}
        >
          DISCOVER IT
          <ArrowRight
            style={{
              width: "clamp(1.25rem, 4vw, 2rem)",
              height: "clamp(1.25rem, 4vw, 2rem)",
            }}
            strokeWidth={2.25}
          />
        </a>
      </div>
    </div>
  );
}
