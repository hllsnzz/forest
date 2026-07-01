import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FadeIn,
  Magnet,
  ContactButton,
  LiveProjectButton,
  AnimatedText,
} from "./JackComponents";

const ROW_1_GIFS = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
];

const ROW_2_GIFS = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6b1w.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const PROJECTS = [
  {
    id: "01",
    category: "Client",
    name: "Nextlevel Studio",
    col1img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  {
    id: "02",
    category: "Personal",
    name: "Aura Brand Identity",
    col1img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
  },
  {
    id: "03",
    category: "Client",
    name: "Solaris Digital",
    col1img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
];

const NAV_LINKS = ["About", "Price", "Projects", "Contact"];

/* ======== HERO SECTION ======== */
function HeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col overflow-x-clip font-kanit"
      style={{ background: "#0C0C0C" }}
    >
      <FadeIn delay={0} y={-20} duration={0.7}>
        <nav className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden px-6 md:px-10">
        <div className="w-full max-w-5xl mx-auto">
          <FadeIn delay={0.15} y={40} duration={0.8} className="w-full">
            <h1
              className="hero-heading font-black uppercase tracking-tight leading-none w-full text-center"
              style={{
                fontSize: "clamp(2.8rem, 12vw, 17.5vw)",
                marginTop: "clamp(1rem, 3vw, -1.25rem)",
                whiteSpace: "nowrap",
              }}
            >
              Hi, i&apos;m jack
            </h1>
          </FadeIn>
        </div>
      </div>

      <div className="flex justify-between items-end pb-6 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
            style={{
              fontSize: "clamp(0.65rem, 1.4vw, 1.5rem)",
              maxWidth: "clamp(140px, 20vw, 260px)",
            }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Portrait */}
      <FadeIn delay={0.6} y={10} duration={0.8}>
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Jack portrait"
            className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
            style={{ width: "clamp(220px, 40vw, 520px)" }}
          />
        </Magnet>
      </FadeIn>
    </section>
  );
}

/* ======== MARQUEE SECTION ======== */
function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(200);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      offsetRef.current =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setTick((t) => t + 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const offset = offsetRef.current;
  const row1 = [...ROW_1_GIFS, ...ROW_1_GIFS, ...ROW_1_GIFS];
  const row2 = [...ROW_2_GIFS, ...ROW_2_GIFS, ...ROW_2_GIFS];

  return (
    <section
      ref={sectionRef}
      style={{ background: "#0C0C0C" }}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div
        className="flex gap-3 mb-3"
        style={{
          transform: "translateX(" + (offset - 200) + "px)",
          willChange: "transform",
        }}
      >
        {row1.map((src, i) => (
          <img
            key={"r1-" + i}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover flex-shrink-0"
            style={{
              width: "clamp(300px, 50vw, 420px)",
              height: "clamp(200px, 32vw, 270px)",
            }}
          />
        ))}
      </div>
      <div
        className="flex gap-3"
        style={{
          transform: "translateX(" + -(offset - 200) + "px)",
          willChange: "transform",
        }}
      >
        {row2.map((src, i) => (
          <img
            key={"r2-" + i}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover flex-shrink-0"
            style={{
              width: "clamp(300px, 50vw, 420px)",
              height: "clamp(200px, 32vw, 270px)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ======== ABOUT SECTION ======== */
function AboutSection() {
  const deco = [
    {
      src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
      pos: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%]",
      w: "clamp(120px, 16vw, 210px)",
      dx: -80,
      dy: 0,
      delay: 0.1,
    },
    {
      src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
      pos: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]",
      w: "clamp(100px, 14vw, 180px)",
      dx: -80,
      dy: 0,
      delay: 0.25,
    },
    {
      src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
      pos: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%]",
      w: "clamp(120px, 16vw, 210px)",
      dx: 80,
      dy: 0,
      delay: 0.15,
    },
    {
      src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
      pos: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]",
      w: "clamp(130px, 17vw, 220px)",
      dx: 80,
      dy: 0,
      delay: 0.3,
    },
  ];

  return (
    <section
      className="relative min-h-screen px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
      style={{ background: "#0C0C0C" }}
    >
      {deco.map((d, i) => (
        <FadeIn
          key={i}
          delay={d.delay}
          x={d.dx}
          y={d.dy}
          duration={0.9}
          className={"absolute pointer-events-none select-none " + d.pos}
        >
          <img src={d.src} alt="" style={{ width: d.w }} />
        </FadeIn>
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40} duration={0.7}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(2.5rem, 12vw, 160px)" }}
          >
            About me
          </h2>
        </FadeIn>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24 w-full px-4 sm:px-8">
          <AnimatedText
            text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed mx-auto"
            style={{ maxWidth: 560, fontSize: "clamp(0.9rem, 2vw, 1.35rem)" }}
          />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

/* ======== SERVICES SECTION ======== */
const SERVICES = [
  {
    num: "01",
    title: "3D Modeling",
    desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
  },
  {
    num: "02",
    title: "Rendering",
    desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
  },
  {
    num: "03",
    title: "Motion Design",
    desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
  },
  {
    num: "04",
    title: "Branding",
    desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
  },
  {
    num: "05",
    title: "Web Design",
    desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
  },
];

function ServicesSection() {
  return (
    <section
      className="relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{
        background: "#FFFFFF",
        borderRadius: "clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px) 0 0",
      }}
    >
      <h2
        className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ color: "#0C0C0C", fontSize: "clamp(2.5rem, 12vw, 160px)" }}
      >
        Services
      </h2>
      <div className="mx-auto" style={{ maxWidth: 1024 }}>
        {SERVICES.map((svc, i) => (
          <FadeIn key={svc.num} delay={i * 0.1} y={30} duration={0.6}>
            <div
              className="flex items-start gap-4 sm:gap-6 md:gap-8 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? "1px solid rgba(12,12,12,0.15)" : "none",
                borderBottom: "1px solid rgba(12,12,12,0.15)",
              }}
            >
              <span
                className="font-black flex-shrink-0 leading-none"
                style={{
                  color: "#0C0C0C",
                  fontSize: "clamp(2.5rem, 10vw, 140px)",
                }}
              >
                {svc.num}
              </span>
              <div className="pt-1 sm:pt-2 md:pt-3">
                <h3
                  className="font-medium uppercase"
                  style={{
                    fontSize: "clamp(0.95rem, 2.2vw, 2.1rem)",
                    color: "#0C0C0C",
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  className="font-light leading-relaxed"
                  style={{
                    fontSize: "clamp(0.8rem, 1.6vw, 1.25rem)",
                    opacity: 0.6,
                    color: "#0C0C0C",
                    maxWidth: 672,
                  }}
                >
                  {svc.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ======== PROJECTS SECTION ======== */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.3"],
  });
  const totalCards = PROJECTS.length;
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: "clamp(4rem, 10vw, 8rem)", height: "85vh" }}
    >
      <motion.div
        style={{
          scale,
          borderRadius: "clamp(24px, 5vw, 40px)",
          border: "2px solid #D7E2EA",
          background: "#0C0C0C",
          padding: "clamp(0.75rem, 2vw, 2rem)",
          top: index * 28,
        }}
        className="relative h-full w-full flex flex-col"
      >
        <div className="flex items-start justify-between mb-3 sm:mb-6">
          <div className="flex items-start gap-2 sm:gap-4">
            <span
              className="font-black leading-none"
              style={{ color: "#D7E2EA", fontSize: "clamp(2rem, 10vw, 140px)" }}
            >
              {project.id}
            </span>
            <div className="pt-1 sm:pt-3 h-full">
              <span className="text-[#D7E2EA] text-[10px] sm:text-sm uppercase tracking-wider opacity-70">
                {project.category}
              </span>
              <h3
                className="text-[#D7E2EA] font-medium uppercase"
                style={{ fontSize: "clamp(0.85rem, 2.2vw, 2.1rem)" }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>
        <div
          className="flex gap-2 sm:gap-4"
          style={{ height: "calc(100% - 5rem)" }}
        >
          <div
            className="flex flex-col gap-2 sm:gap-4"
            style={{ width: "40%" }}
          >
            <img
              src={project.col1img1}
              alt=""
              loading="lazy"
              className="object-cover w-full"
              style={{
                borderRadius: "clamp(16px, 5vw, 30px)",
                height: "clamp(80px, 16vw, 230px)",
              }}
            />
            <img
              src={project.col1img2}
              alt=""
              loading="lazy"
              className="object-cover w-full flex-1"
              style={{
                borderRadius: "clamp(16px, 5vw, 30px)",
                height: "clamp(100px, 22vw, 340px)",
              }}
            />
          </div>
          <div style={{ width: "60%" }}>
            <img
              src={project.col2img}
              alt=""
              loading="lazy"
              className="object-cover w-full h-full"
              style={{ borderRadius: "clamp(16px, 5vw, 30px)" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section
      className="relative z-10"
      style={{
        background: "#0C0C0C",
        borderRadius: "clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px) 0 0",
        marginTop: "clamp(-2.5rem, -3vw, -3.5rem)",
      }}
    >
      <div className="px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: "clamp(2.5rem, 12vw, 160px)" }}
        >
          Project
        </h2>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function JackPortfolio() {
  return (
    <main
      className="font-kanit"
      style={{ background: "#0C0C0C", overflowX: "clip" }}
    >
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
