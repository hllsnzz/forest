import "./foldcraft.css";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Studio", href: "#" },
  { label: "Reach Us", href: "#" },
];

export default function FoldCraft() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black font-geist"
      style={{
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "70% center" }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-5 pt-6 pb-4 md:px-12 lg:px-16 md:pt-8 md:pb-5">
        <div className="flex items-center gap-8">
          <span className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-white">
            Foldcraft
          </span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden md:inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black hover:scale-105 transition-transform"
          >
            Let&apos;s Talk
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-50 md:hidden flex items-center justify-center w-11 h-11 active:scale-90"
            aria-label="Toggle menu"
          >
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{
                opacity: mobileMenuOpen ? 0 : 1,
                transform: mobileMenuOpen
                  ? "rotate(90deg) scale(0.5)"
                  : "rotate(0deg) scale(1)",
              }}
            >
              <Menu size={24} className="text-white" />
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen
                  ? "rotate(0deg) scale(1)"
                  : "rotate(-90deg) scale(0.5)",
              }}
            >
              <X size={24} className="text-white" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-x-0 top-0 z-20 bg-black/98 backdrop-blur-xl transition-all duration-500"
        style={{
          transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          height: mobileMenuOpen ? "100vh" : "0",
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
      >
        <div className="flex h-full flex-col justify-center px-8">
          <div
            className="transition-all duration-500 delay-100"
            style={{
              transform: mobileMenuOpen ? "translateY(0)" : "translateY(2rem)",
              opacity: mobileMenuOpen ? 1 : 0,
            }}
          >
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[28px] md:text-3xl font-medium text-white/90 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 inline-block rounded-full bg-white px-10 py-4 text-[17px] font-medium text-black hover:scale-105 transition-transform"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between h-[calc(100vh-76px)] md:h-[calc(100vh-84px)] px-5 pb-8 pt-5 sm:pb-12 sm:pt-10 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        {/* Top */}
        <div className="max-w-3xl">
          <p className="animate-[fadeSlideUp_0.8s_ease_0.2s_both] text-[11px] sm:text-xs md:text-sm tracking-[0.15em] text-white/80 mb-3 sm:mb-4 md:mb-6">
            Brand & Visual Storytelling
          </p>

          <h1 className="animate-[fadeSlideUp_0.8s_ease_0.4s_both] text-[32px] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-white">
            Shaping visual /<br className="hidden sm:block" /> narratives,{" "}
            <br className="sm:hidden" />
            one pixel
            <br className="hidden sm:block" /> at a time.
          </h1>
        </div>

        {/* Bottom */}
        <div>
          <p className="animate-[fadeSlideUp_0.8s_ease_0.7s_both] text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed sm:leading-relaxed text-white/60 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-4 sm:mb-5 md:mb-6">
            Turning vision into reality through craft, motion, and an endless
            pursuit of beauty.
          </p>

          <a
            href="#"
            className="animate-[fadeSlideUp_0.8s_ease_0.9s_both] inline-flex items-center gap-2.5 rounded-lg bg-white px-7 py-3.5 sm:px-7 sm:py-3.5 md:px-8 md:py-4 text-[15px] sm:text-[15px] md:text-base font-semibold text-black hover:scale-105 transition-transform"
          >
            Explore Work
            <ArrowRight size={16} className="sm:size-[18px]" />
          </a>
        </div>
      </div>
    </div>
  );
}
