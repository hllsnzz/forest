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

  // Scroll lock when mobile menu is open
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

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        {/* Left: Logo + Desktop Links */}
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Foldcraft
          </span>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Desktop CTA + Mobile Hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop CTA */}
          <a
            href="#"
            className="hidden md:inline-flex rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform"
          >
            Let's Talk
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-50 md:hidden flex items-center justify-center w-10 h-10 active:scale-90"
            aria-label="Toggle menu"
          >
            {/* Menu icon */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{
                opacity: mobileMenuOpen ? 0 : 1,
                transform: mobileMenuOpen
                  ? "rotate(90deg) scale(0.5)"
                  : "rotate(0deg) scale(1)",
              }}
            >
              <Menu size={22} className="text-white" />
            </div>
            {/* X icon */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen
                  ? "rotate(0deg) scale(1)"
                  : "rotate(-90deg) scale(0.5)",
              }}
            >
              <X size={22} className="text-white" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
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
              transform: mobileMenuOpen
                ? "translateY(0)"
                : "translateY(2rem)",
              opacity: mobileMenuOpen ? 1 : 0,
            }}
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-medium text-white/90 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 inline-block rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between h-[calc(100vh-80px)] px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        {/* Top Section */}
        <div className="max-w-3xl">
          {/* Badge */}
          <p className="animate-[fadeSlideUp_0.8s_ease_0.2s_both] text-xs sm:text-sm text-white/90 mb-4 sm:mb-6">
            Brand & Visual Storytelling
          </p>

          {/* Heading */}
          <h1 className="animate-[fadeSlideUp_0.8s_ease_0.4s_both] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white">
            Shaping visual / narratives,<br /> one pixel at a time.
          </h1>
        </div>

        {/* Bottom Section */}
        <div>
          <p className="animate-[fadeSlideUp_0.8s_ease_0.7s_both] text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-5 sm:mb-6">
            Turning vision into reality through craft, motion, and an endless
            pursuit of beauty.
          </p>

          {/* CTA Button */}
          <a
            href="#"
            className="animate-[fadeSlideUp_0.8s_ease_0.9s_both] inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform"
          >
            Explore Work
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
