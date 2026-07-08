/**
 * Marketeam Hero Page
 * Marketing talent platform landing with typewriter, animated circles, ticker
 */
import { useState, useEffect, useRef, useMemo } from "react";
import bgImg from "../../assets/images/marketeam/bg.webp";
import logoSrc from "../../assets/images/marketeam/logo.png";
import avatar1 from "../../assets/images/marketeam/avatar1.png";
import avatar2 from "../../assets/images/marketeam/avatar2.png";
import avatar3 from "../../assets/images/marketeam/avatar3.png";
import avatar4 from "../../assets/images/marketeam/avatar4.png";
import avatar5 from "../../assets/images/marketeam/avatar5.png";
import avatar6 from "../../assets/images/marketeam/avatar6.png";
import avatar7 from "../../assets/images/marketeam/avatar7.png";
import avatar8 from "../../assets/images/marketeam/avatar8.png";
import avatar9 from "../../assets/images/marketeam/avatar9.png";
import logo1 from "../../assets/images/marketeam/logo1.svg";
import logo2 from "../../assets/images/marketeam/logo2.svg";
import logo3 from "../../assets/images/marketeam/logo3.svg";
import logo4 from "../../assets/images/marketeam/logo4.svg";
import logo5 from "../../assets/images/marketeam/logo5.svg";
import "./marketeam.css";

/* ======================================== */
/* Typewriter heading component             */
/* ======================================== */
function TypewriterHeading(props: {
  text: string;
  speed?: number;
  delay?: number;
  highlightLen?: number;
  cursorColor?: string;
}) {
  const { text, speed = 35, delay = 400, highlightLen = 67, cursorColor = "#A068FF" } = props;
  const [displayCount, setDisplayCount] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      timerRef.current = setInterval(() => {
        setDisplayCount((prev) => {
          if (prev >= text.length) {
            setDone(true);
            if (timerRef.current) clearInterval(timerRef.current);
            return text.length;
          }
          return prev + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(startTimeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, speed, delay]);

  return (
    <h1
      style={{
        fontFamily: "'Urbanist', sans-serif",
        fontSize: "clamp(28px, 4.4vw, 64px)",
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: "-1.5px",
        margin: 0,
      }}
    >
      <span style={{ color: "#000000" }}>
        {text.slice(0, Math.min(displayCount, highlightLen))}
      </span>
      <span style={{ color: "#ffffff" }}>
        {text.slice(highlightLen, displayCount)}
      </span>
      {!done && (
        <span className="animate-blink-cursor" style={{ color: cursorColor, fontWeight: 300, marginLeft: 2 }}>|</span>
      )}
    </h1>
  );
}

/* ======================================== */
/* CountUp hook: 0 to target with easeOutCubic  */
/* ======================================== */
function useCountUp(target: number, durationMs: number, startDelay: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [target, durationMs, startDelay]);
  return value;
}

interface AvatarData {
  src: string; orbit: number; angleDeg: number; radiusPx: number;
  sizePx: number; glow: string;
  shape: "round" | "rounded-lg" | "rounded-2xl"; delay: number;
}

const AVATARS: AvatarData[] = [
  { src: avatar1, orbit: 1, angleDeg: 270, radiusPx: 177, sizePx: 58, glow: "#A068FF", shape: "rounded-lg", delay: 0.6 },
  { src: avatar2, orbit: 2, angleDeg: 60,  radiusPx: 251, sizePx: 58, glow: "#FFD700", shape: "round", delay: 0.8 },
  { src: avatar3, orbit: 2, angleDeg: 180, radiusPx: 251, sizePx: 78, glow: "#FF69B4", shape: "round", delay: 1.0 },
  { src: avatar4, orbit: 2, angleDeg: 300, radiusPx: 251, sizePx: 58, glow: "#4A90D9", shape: "rounded-lg", delay: 1.2 },
  { src: avatar5, orbit: 3, angleDeg: 130, radiusPx: 325, sizePx: 88, glow: "#FF69B4", shape: "round", delay: 1.4 },
  { src: avatar6, orbit: 4, angleDeg: 30,  radiusPx: 399, sizePx: 58, glow: "#A068FF", shape: "round", delay: 1.6 },
  { src: avatar7, orbit: 4, angleDeg: 95,  radiusPx: 399, sizePx: 88, glow: "#FF8C00", shape: "rounded-2xl", delay: 1.8 },
  { src: avatar8, orbit: 4, angleDeg: 220, radiusPx: 399, sizePx: 88, glow: "#FF69B4", shape: "rounded-2xl", delay: 2.0 },
  { src: avatar9, orbit: 4, angleDeg: 320, radiusPx: 399, sizePx: 58, glow: "#A068FF", shape: "round", delay: 2.3 },
];

function AnimatedCircles() {
  const count = useCountUp(20, 2000, 1200);
  const [orbitKf, setOrbitKf] = useState("");
  // 4 ?????????????
  const orbits = useMemo(() => [
    { diameter: 353, speed: 20, direction: -1 },
    { diameter: 501, speed: 35, direction: 1 },
    { diameter: 649, speed: 50, direction: 1 },
    { diameter: 797, speed: 70, direction: -1 },
  ], []);

  useEffect(() => {
    let css = "";
    orbits.forEach((orb, i) => {
      css += "@keyframes orbSpin" + i + "{from{transform:rotate(0deg)}to{transform:rotate(" + (orb.direction * 360) + "deg)}}";
      css += "@keyframes orbSpinRev" + i + "{from{transform:rotate(0deg)}to{transform:rotate(" + (-orb.direction * 360) + "deg)}}";
    });
    setOrbitKf(css);
  }, [orbits]);

  return (
    <div className="circles-responsive">
      <div
        className="animate-scale-in"
        style={{ width: 720, height: 720, position: "relative", flexShrink: 0, animationDelay: "0.3s" }}
      >
        {/* 4 ????????????? */}
        {orbits.map((orb, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", left: "50%",
            width: orb.diameter, height: orb.diameter,
            marginLeft: -(orb.diameter / 2), marginTop: -(orb.diameter / 2),
            borderRadius: "50%",
            border: "1px solid transparent",
            backgroundClip: "padding-box", backgroundOrigin: "border-box",
            backgroundImage: "linear-gradient(180deg, rgba(217, 161, 255, 0) 0%, rgba(217, 161, 255, 1) 43%, rgba(217, 161, 255, 0) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor", maskComposite: "exclude",
          }}>
            <div style={{
              width: "100%", height: "100%",
              animation: "orbSpin" + i + " " + orb.speed + "s linear infinite",
              transformOrigin: "center",
            }} />
          </div>
        ))}

        {/* 9 ??? */}
        {AVATARS.map((a, i) => {
          const oi = a.orbit - 1;
          const orb = orbits[oi];
          const rad = (a.angleDeg * Math.PI) / 180;
          const xOff = a.radiusPx * Math.cos(rad);
          const yOff = a.radiusPx * Math.sin(rad);
          const half = a.sizePx / 2;
          const shapeStyle = a.shape === "round" ? { borderRadius: "50%" } : a.shape === "rounded-lg" ? { borderRadius: 20 } : { borderRadius: 24 };

          return (
            // ?1???????????????
            <div key={i} style={{
              position: "absolute",
              left: "calc(50% + " + (xOff - half) + "px)",
              top: "calc(50% + " + (yOff - half) + "px)",
              width: a.sizePx, height: a.sizePx, zIndex: 3,
              animation: "orbSpin" + oi + " " + orb.speed + "s linear infinite",
              transformOrigin: (-xOff + half) + "px " + (-yOff + half) + "px",
            }}>
              {/* ?2????????????? */}
              <div style={{
                width: "100%", height: "100%",
                animation: "avatar-fly-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) " + a.delay + "s both",
              }}>
                {/* ?3???????? + ?? */}
                <div style={{
                  width: "100%", height: "100%",
                  animation: "orbSpinRev" + oi + " " + orb.speed + "s linear infinite",
                  transformOrigin: "center",
                  boxShadow: "0 0 14px " + a.glow + "66",
                  overflow: "hidden",
                  ...shapeStyle,
                }}>
                  <img src={a.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", ...shapeStyle }} />
                </div>
              </div>
            </div>
          );
        })}

        {/* ???? */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center", zIndex: 5,
        }}>
          <div style={{ fontFamily: "'Urbanist', sans-serif", fontSize: 64, fontWeight: 500, color: "#ffffff", lineHeight: 1 }}>
            {count}k+
          </div>
          <div style={{ fontFamily: "'Urbanist', sans-serif", fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
            Specialists
          </div>
        </div>

        <style>{orbitKf}</style>
      </div>
    </div>
  );
}
const LOGO_SRCS = [logo1, logo2, logo3, logo4, logo5];

function LogoTicker() {
  const items = useMemo(() => {
    const arr: string[] = [];
    for (let i = 0; i < 4; i++) arr.push(...LOGO_SRCS);
    return arr;
  }, []);
  return (
    <div className="ticker-mask animate-fade-up" style={{ width: "100%", padding: "20px 0", animationDelay: "0.6s", animationDuration: "1s" }}>
      <div className="ticker-track">
        {items.map((src, i) => (
          <img key={i} src={src} alt="" style={{ width: 137, height: 40, objectFit: "contain", flexShrink: 0, opacity: 0.5 }} />
        ))}
      </div>
    </div>
  );
}

function ChevronRight({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function Header({ menuOpen, onToggleMenu }: { menuOpen: boolean; onToggleMenu: () => void }) {
  return (
    <header className="animate-fade-down" style={{ maxWidth: 1920, margin: "0 auto", padding: "24px 64px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <img src={logoSrc} alt="Marketeam" style={{ height: 32 }} />
        <nav className="desktop-nav" style={{ display: "flex", gap: 32 }}>
          {["Your Team", "Solutions", "Blog", "Pricing"].map((link) => (
            <a key={link} href="#" className="nav-underline" style={{ color: "#000000", fontSize: 15, fontWeight: 400, textDecoration: "none", cursor: "pointer" }}>{link}</a>
          ))}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <a href="#" className="nav-underline" style={{ color: "#ffffff", fontSize: 15, fontWeight: 500, textDecoration: "none", cursor: "pointer" }}>Log In</a>
        <div className="btn-border-wrap">
          <button className="btn-fill-right btn-fill-left" style={{ position: "relative", background: "#000000", color: "#ffffff", border: "none", borderRadius: 50, padding: "12px 26px", fontSize: 15, fontWeight: 500, cursor: "pointer", zIndex: 1 }}>
            Join Now
          </button>
        </div>
        <button onClick={onToggleMenu} className="mobile-menu-btn" style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#ffffff", fontSize: 24 }}>
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </div>
    </header>
  );
}

function HeroLeft() {
  const [showButton, setShowButton] = useState(false);
  const [showCursorEl, setShowCursorEl] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setShowButton(true), 3200);
    const t2 = setTimeout(() => setShowCursorEl(true), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className="animate-fade-up" style={{ flex: "0 1 600px", paddingTop: 40 }}>
      <TypewriterHeading text="Unlock Top Marketing Talent You Thought Was Out of Reach -- Now Just One Click Away!" />
      {showButton && (
        <div className="btn-border-wrap" style={{ marginTop: 24, display: "inline-flex" }}>
          <button className="btn-fill-right" style={{ position: "relative", background: "#060218", color: "#ffffff", border: "none", borderRadius: 50, padding: "14px 28px", fontSize: 16, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, zIndex: 1 }}>
            Start Project
            <ChevronRight size={18} />
          </button>
        </div>
      )}
      {showCursorEl && (
        <div className="animate-fade-up" style={{ marginLeft: 290, marginTop: 40, display: "flex", alignItems: "center", gap: 10, animationDuration: "0.5s" }}>
          <svg width="20" height="28" viewBox="0 0 24 30" fill="#A068FF">
            <path d="M0 0 L22 21 L12 21 L18 30 L14 30 L8 21 L0 21 Z" />
          </svg>
          <span style={{ background: "#A068FF", color: "#ffffff", fontSize: 16, fontWeight: 500, padding: "8px 16px", borderRadius: 20, lineHeight: 1 }}>David</span>
        </div>
      )}
    </div>
  );
}

function HeroRight() {
  return (
    <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AnimatedCircles />
    </div>
  );
}

function ResponsiveStyles() {
  return (
    <style>{`
@media (max-width: 1280px) {
  .hero-main { padding: 0 48px !important; }
  .hero-main .circles-responsive { transform: scale(0.85); transform-origin: center right; }
}
@media (max-width: 1024px) {
  .hero-main { flex-direction: column !important; align-items: center !important; padding: 0 32px !important; gap: 40px !important; }
  .hero-main .circles-responsive { transform: scale(0.7); transform-origin: center; }
  .desktop-nav { gap: 20px !important; }
  header { padding: 20px 32px !important; }
  .typewriter-heading { font-size: 48px !important; }
  .hero-main > div:first-child { flex: none !important; width: 100%; }
}
@media (max-width: 768px) {
  .desktop-nav { display: none !important; }
  .mobile-menu-btn { display: block !important; }
  header { padding: 16px 20px !important; }
  .hero-main { padding: 0 20px !important; gap: 24px !important; }
  .typewriter-heading { font-size: 36px !important; line-height: 1.1 !important; }
  .hero-main .circles-responsive { transform: scale(0.5); }
  .ticker-mask { padding: 12px 0 !important; }
  .ticker-track { gap: 40px !important; }
  .ticker-track img { width: 100px !important; height: 30px !important; }
}
@media (max-width: 480px) {
  header { padding: 12px 16px !important; }
  .hero-main { padding: 0 16px !important; }
  .typewriter-heading { font-size: 28px !important; }
  .hero-main .circles-responsive { transform: scale(0.4); }
  .ticker-mask { padding: 8px 0 !important; }
  .ticker-track { gap: 24px !important; }
  .ticker-track img { width: 80px !important; height: 24px !important; }
}
    `}</style>
  );
}

export default function Marketeam() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      style={{
        width: "100%", minHeight: "100vh",
        background: "url(" + bgImg + ") center center / cover no-repeat",
        fontFamily: "'Inter', sans-serif",
        position: "relative", overflow: "hidden",
      }}
    >
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <main
        style={{
          maxWidth: 1920, margin: "0 auto", padding: "0 64px",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          minHeight: "calc(100vh - 80px)",
        }}
        className="hero-main"
      >
        <HeroLeft />
        <HeroRight />
      </main>
      <LogoTicker />
      <ResponsiveStyles />
    </div>
  );
}