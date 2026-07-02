import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Loading Screen ─── */
interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Design", "Create", "Inspire"];

  useEffect(() => {
    const start = performance.now();
    const duration = 2700;
    let frame: number;

    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    frame = requestAnimationFrame(tick);

    // Rotate words every 900ms
    const wordInterval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 900);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(wordInterval);
    };
  }, []);

  const display = String(count).padStart(3, "0");

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-10">
      {/* Top-left label */}
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.span>

      {/* Center rotating words */}
      <div className="flex items-center justify-center">
        <div className="h-[1.2em] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="block text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
            >
              {words[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom: counter + progress bar */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
            {display}
          </span>
        </div>
        <div className="h-[3px] bg-stroke/50 relative overflow-hidden rounded-full">
          <div
            className="accent-gradient h-full transition-none rounded-full"
            style={{
              transform: "scaleX(" + count / 100 + ")",
              transformOrigin: "left",
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Navbar ─── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "Work", "Resume"];

  return (
    <nav
      className={"fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-shadow duration-300" + (scrolled ? " shadow-md shadow-black/10" : "")}
    >
      <div className="inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2">
        {/* Logo */}
        <div className="group relative w-9 h-9 flex items-center justify-center cursor-pointer">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
            <circle
              cx="18" cy="18" r="16.5"
              fill="none"
              stroke="url(#logoGradient)"
              strokeWidth="1.5"
              className="transition-all duration-500 group-hover:scale-x-[-1]"
            />
          </svg>
          <svg className="absolute inset-0 w-full h-full opacity-0" viewBox="0 0 36 36">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#89AACC" />
                <stop offset="100%" stopColor="#4E85BF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="w-7 h-7 rounded-full bg-bg flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
            <span className="font-display italic text-[13px] text-text-primary">JA</span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav Links */}
        {links.map((link) => (
          <button
            key={link}
            onClick={() => setActiveLink(link)}
            className={
              "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors " +
              (activeLink === link
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50")
            }
          >
            {link}
          </button>
        ))}

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1" />

        {/* Say hi button */}
        <div className="relative group">
          <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity accent-gradient" />
          <div className="relative rounded-full bg-surface backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-muted hover:text-text-primary transition-colors cursor-pointer">
            Say hi&nbsp;
            <span className="inline-block">→</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero Video ─── */
function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const src = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      (window as any).__hls = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      const h = (window as any).__hls;
      if (h) { h.destroy(); (window as any).__hls = null; }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="absolute left-1/2 top-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
    />
  );
}

/* ─── Hero Section ─── */
export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Creative", "Fullstack", "Founder", "Scholar"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: "power3.out" });
      tl.fromTo(".name-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 });
      tl.fromTo(".blur-in", { opacity: 0, y: 20, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.1 }, "-=0.6");
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <HeroVideo />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">COLLECTION '26</p>
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Michael Smith
        </h1>
        <p className="text-sm md:text-base text-muted mb-6">
          A{" "}
          <span className="relative inline-block h-[1.2em] overflow-hidden align-middle">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-display italic text-text-primary inline-block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          lives in Chicago.
        </p>
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>
        <div className="blur-in inline-flex gap-4">
          <button className="rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg hover:bg-bg hover:text-text-primary hover:ring-2 hover:ring-[#89AACC] hover:scale-105 transition-all">
            See Works
          </button>
          <button className="rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary hover:border-transparent hover:ring-2 hover:ring-[#89AACC] hover:scale-105 transition-all">
            Reach out...
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1/3 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}

/* ─── Works Section ─── */
const WORKS = [
  { title: "Automotive Motion", tag: "Film / Design" },
  { title: "Urban Architecture", tag: "Brand / Identity" },
  { title: "Human Perspective", tag: "Creative / Direction" },
  { title: "Brand Identity", tag: "Design / Development" },
];

export function WorksSection() {
  return (
    <section className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display italic text-text-primary">
                Featured <span className="font-display italic">projects</span>
              </h2>
              <p className="text-sm text-muted mt-2 max-w-md">
                A selection of projects I've worked on, from concept to launch.
              </p>
            </div>
            <button className="hidden md:inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2 text-sm text-text-primary hover:ring-2 hover:ring-[#89AACC] transition-all">
              View all work <span>→</span>
            </button>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {WORKS.map((work, i) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={
                "group relative overflow-hidden rounded-3xl border border-stroke bg-surface " +
                (i % 2 === 0 ? "md:col-span-7" : "md:col-span-5")
              }
              style={{ aspectRatio: i % 2 === 0 ? "16/10" : "4/5" }}
            >
              {/* Background Image Placeholder */}
              <div className="absolute inset-0 bg-surface/50" />
              {/* Halftone overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-lg flex items-center justify-center">
                <span className="rounded-full bg-white px-5 py-2 text-sm text-bg font-medium">
                  View —{" "}
                  <span className="font-display italic">
                    {work.title}
                  </span>
                </span>
              </div>
              {/* Tag */}
              <div className="absolute bottom-4 left-4">
                <span className="text-xs text-muted uppercase tracking-wider">{work.tag}</span>
                <h3 className="text-lg text-text-primary font-display italic">{work.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Journal Section ─── */
const JOURNAL = [
  { title: "The Art of Digital Craftsmanship", image: "", readTime: "5 min read", date: "Feb 12, 2026" },
  { title: "Why Less is More in Web Design", image: "", readTime: "4 min read", date: "Jan 28, 2026" },
  { title: "Building Brands That Last", image: "", readTime: "6 min read", date: "Jan 15, 2026" },
  { title: "Creative Process: From Idea to Launch", image: "", readTime: "7 min read", date: "Dec 30, 2025" },
];

export function JournalSection() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display italic text-text-primary">
                Recent <span className="font-display italic">thoughts</span>
              </h2>
              <p className="text-sm text-muted mt-2 max-w-md">Thoughts on design, technology, and creativity.</p>
            </div>
            <button className="hidden md:inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2 text-sm text-text-primary hover:ring-2 hover:ring-[#89AACC] transition-all">
              View all <span>→</span>
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {JOURNAL.map((entry, i) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full cursor-pointer transition-colors"
            >
              {/* Image placeholder */}
              <div className="w-16 h-16 rounded-full bg-surface flex-shrink-0 border border-stroke/50" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-body text-text-primary truncate">{entry.title}</h3>
                <p className="text-xs text-muted mt-1">{entry.readTime} — {entry.date}</p>
              </div>
              <span className="text-muted text-sm hidden sm:block">→</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Section ─── */
const STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "95+", label: "Projects Done" },
  { value: "200%", label: "Satisfied Clients" },
];



/* ─── Explorations Section (Parallax Gallery) ─── */
const EXPLORE_ITEMS = [
  { title: "Abstract Forms", desc: "3D / Motion" },
  { title: "Color Studies", desc: "Brand / Art" },
  { title: "Grid Systems", desc: "Typography / Layout" },
  { title: "Nature Patterns", desc: "Photography / Art" },
  { title: "Digital Sculpting", desc: "3D / Design" },
  { title: "Motion Tests", desc: "Animation / Film" },
];

export function ExplorationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    if (!section || !content || !col1 || !col2) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: content,
        pinSpacing: false,
      });
      gsap.to(col1, {
        y: () => col1.offsetHeight * 0.15,
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1 },
      });
      gsap.to(col2, {
        y: () => -col2.offsetHeight * 0.15,
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1 },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg relative" style={{ minHeight: "300vh" }}>
      <div ref={contentRef} className="h-screen flex items-center justify-center sticky top-0 z-10">
        <div className="text-center">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="w-8 h-px bg-stroke" /><span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span><div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display italic text-text-primary mb-4">Visual <span className="font-display italic">playground</span></h2>
          <p className="text-sm text-muted max-w-md mx-auto mb-6">A curated collection of visual experiments.</p>
          <button className="inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2 text-sm text-text-primary hover:ring-2 hover:ring-[#89AACC] transition-all">View on Dribbble <span>→</span></button>
        </div>
      </div>
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 h-full">
          <div className="grid grid-cols-2 gap-12 md:gap-40 h-full">
            <div ref={col1Ref} className="flex flex-col gap-8 pt-32">
              {EXPLORE_ITEMS.filter((_, i) => i % 2 === 0).map((item) => (
                <div key={item.title} className="aspect-square max-w-[320px] w-full bg-surface border border-stroke rounded-2xl flex items-center justify-center cursor-pointer hover:rotate-3 transition-transform">
                  <div className="text-center"><p className="text-text-primary font-display italic text-lg">{item.title}</p><p className="text-xs text-muted mt-2">{item.desc}</p></div>
                </div>
              ))}
            </div>
            <div ref={col2Ref} className="flex flex-col gap-8 pt-48">
              {EXPLORE_ITEMS.filter((_, i) => i % 2 === 1).map((item) => (
                <div key={item.title} className="aspect-square max-w-[320px] w-full bg-surface border border-stroke rounded-2xl flex items-center justify-center cursor-pointer hover:-rotate-3 transition-transform">
                  <div className="text-center"><p className="text-text-primary font-display italic text-lg">{item.title}</p><p className="text-xs text-muted mt-2">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-3 gap-8 md:gap-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted mt-2 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer Section ─── */
export function FooterSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background Video (flipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-1/2 top-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
          src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Marquee */}
      <div className="relative z-10 overflow-hidden mb-16 md:mb-20">
        <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: "200%" }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-[clamp(4rem,15vw,8rem)] font-display italic text-text-primary/10 mx-4 select-none">
              BUILDING THE FUTURE •
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 text-center mb-12">
        <a
          href="mailto:hello@michaelsmith.com"
          className="inline-flex items-center gap-3 rounded-full border border-stroke px-8 py-4 text-lg text-text-primary hover:ring-2 hover:ring-[#89AACC] transition-all"
        >
          hello@michaelsmith.com <span>→</span>
        </a>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-muted">
        <div className="flex items-center gap-4">
          {["Twitter", "LinkedIn", "Dribbble", "GitHub"].map((s) => (
            <a key={s} href="#" className="hover:text-text-primary transition-colors">{s}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Available for projects</span>
        </div>
      </div>
    </footer>
  );
}
