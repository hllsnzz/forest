/**
 * CozyPaws Hero Page ? ??????
 *
 * ????? h-screen????
 * ????mobile / tablet(md) / desktop(lg+)
 * ???CSS keyframes ????
 */
import { Search, ShoppingCart, Star, ArrowUpRight, Play, ArrowRight, Plus } from "lucide-react";
import logoSrc from "../../assets/images/cozypaws/logo.svg";
import avatarSrc from "../../assets/images/cozypaws/avatar.png";
import productImg from "../../assets/images/cozypaws/product.png";
import videoImg from "../../assets/images/cozypaws/video.png";
import bottomLeft from "../../assets/images/cozypaws/bottom-left.png";
import bottomCenter from "../../assets/images/cozypaws/bottom-center.png";
import bottomRight from "../../assets/images/cozypaws/bottom-right.png";
import "./cozypaws.css";

export default function CozyPaws() {
  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#EFFDF0", fontFamily: "Inter, sans-serif" }}>
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Desktop/Tablet layout */}
        <div className="hidden md:flex flex-1 flex-col overflow-hidden">
          <DesktopHero />
        </div>
        {/* Mobile layout */}
        <div className="flex md:hidden flex-1 flex-col overflow-hidden">
          <MobileHero />
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="shrink-0 relative z-30 w-full px-6 md:px-12 py-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Logo */}
        <img src={logoSrc} alt="CozyPaws" style={{ height: 52 }} className="w-[130px] h-[33px] md:w-[205px] md:h-[52px]" />

        {/* Center nav (desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {["Home","Shop","Delivery and payment","Brands","Blog"].map((link,i) => (
            <a key={i} href="#" className="text-sm font-medium" style={{ color: i===0 ? "#1a3d1a" : "#6b7280" }}>{link}</a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2.5">
          {/* Search (tablet+) */}
          <button className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center" style={{ border: "1px solid rgba(26,61,26,0.15)" }}>
            <Search size={16} style={{ color: "#1a3d1a" }} />
          </button>
          {/* Favorites */}
          <button className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#E86A10" }}>
            <Star size={16} color="white" fill="white" />
            <Badge label="4" />
          </button>
          {/* Cart */}
          <button className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(26,61,26,0.15)" }}>
            <ShoppingCart size={16} style={{ color: "#1a3d1a" }} />
            <Badge label="1" />
          </button>
          {/* Avatar */}
          <img src={avatarSrc} alt="" className="w-9 h-9 rounded-full object-cover" />
        </div>
      </div>
    </header>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "#E86A10", color: "white", border: "2px solid #EFFDF0" }}>
      {label}
    </span>
  );
}

function DesktopHero() {
  return (
    <div className="relative flex-1 flex flex-col px-6 md:px-12 lg:px-12">
      {/* Heading */}
      <div className="relative z-5 text-center pt-12 md:pt-[3rem] lg:pt-[5.4rem]">
        <h1 className="font-serif-display" style={{ fontFamily: "'DM Serif Display', serif", color: "#1a3d1a", fontSize: "clamp(36px, 7.5vw, 110px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
          <span className="inline-block animate-word-pop">Everything</span>{" "}
          <span className="inline-block animate-word-pop" style={{ animationDelay: "0.3s" }}>Your Pets</span>{" "}
          <br className="hidden sm:block" />
          <span className="inline-block animate-word-pop" style={{ animationDelay: "0.6s" }}>Love</span>
        </h1>
      </div>

      {/* Left product card (desktop) */}
      <div className="absolute hidden lg:block animate-slide-in-left" style={{ top: "50px", left: "48px", width: "clamp(160px,14vw,260px)", animationDelay: "0.6s" }}>
        <div style={{ aspectRatio: "260/257", borderRadius: 16, overflow: "hidden" }}>
          <img src={productImg} alt="Cozy Cat House" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-xs" style={{ color: "#4b5563" }}>Cozy Cat House</p>
            <p className="text-sm font-bold" style={{ color: "#1a3d1a" }}>$49.99</p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#1a3d1a" }}>
            <ArrowUpRight size={14} color="white" />
          </div>
        </div>
      </div>

      {/* Right video card (desktop) */}
      <div className="absolute hidden lg:block animate-slide-in-right" style={{ top: "50px", right: "48px", width: "clamp(120px,10vw,177px)", animationDelay: "0.7s" }}>
        <div style={{ aspectRatio: "177/287", borderRadius: 16, overflow: "hidden", position: "relative" }}>
          <img src={videoImg} alt="Video" className="w-full h-full object-cover" />
          {/* ???????? */}
          <div className="absolute w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#1a3d1a", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Play size={16} color="white" fill="white" />
          </div>
          {/* ????????? */}
          <p className="absolute text-xs text-center px-2" style={{ color: "#4b5563", bottom: 10, left: 0, right: 0, lineHeight: 1.3 }}>Watch Product Reviews on TikTok and YouTube</p>
        </div>
      </div>

      {/* Bottom 3 images */}
      <BottomImages />
    </div>
  );
}

function BottomImages() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end" style={{ gap: 0 }}>
      {/* Left */}
      <div className="flex-1 relative animate-photo-reveal" style={{ maxHeight: "min(70vh, 55vw)", animationDelay: "0.8s" }}>
        <img src={bottomLeft} alt="" className="w-full h-auto block" />
        <div className="absolute flex items-center gap-2" style={{ bottom: "clamp(20px, 4vh, 50px)", left: "clamp(8px, 2vw, 24px)" }}>
          <span className="text-lg font-bold" style={{ color: "#1a3d1a" }}>98K+</span>
          <div className="flex">
            <div className="w-6 h-6 rounded-full border-2 overflow-hidden -ml-1 first:ml-0" style={{ borderColor: "#EFFDF0" }}>
              <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center -ml-1.5" style={{ background: "#1a3d1a", borderColor: "#EFFDF0" }}>
              <Plus size={10} color="white" />
            </div>
          </div>
        </div>
      </div>
      {/* Center */}
      <div className="flex-[1.265] relative animate-photo-reveal" style={{ maxHeight: "min(85vh, 70vw)", animationDelay: "0.6s" }}>
        <img src={bottomCenter} alt="" className="w-full h-auto block" />
        <div className="absolute text-center" style={{ bottom: "clamp(20px, 4vh, 50px)", left: "50%", transform: "translateX(-50%)", width: "80%" }}>
          <p className="font-bold text-white text-sm md:text-base" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Best Products for Your Pet</p>
          <button className="mt-2 px-4 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1" style={{ background: "#E86A10", color: "white" }}>
            Explore Products <ArrowRight size={12} />
          </button>
        </div>
      </div>
      {/* Right */}
      <div className="flex-1 relative animate-photo-reveal" style={{ maxHeight: "min(70vh, 55vw)", animationDelay: "1s" }}>
        <img src={bottomRight} alt="" className="w-full h-auto block" />
        <div className="absolute flex items-center gap-1" style={{ bottom: "clamp(20px, 4vh, 50px)", right: "clamp(8px, 2vw, 24px)" }}>
          <Star size={16} color="#E86A10" fill="#E86A10" />
          <span className="text-base font-bold" style={{ color: "#1a3d1a" }}>4.6</span>
        </div>
      </div>
    </div>
  );
}

function MobileHero() {
  return (
    <div className="flex-1 flex flex-col px-6 py-4 relative">
      {/* Heading + button */}
      <div className="text-center">
        <h1 className="font-serif-display" style={{ fontFamily: "'DM Serif Display', serif", color: "#1a3d1a", fontSize: 36, lineHeight: 1 }}>
          <span className="inline-block animate-word-pop">Everything</span>{" "}
          <span className="inline-block animate-word-pop" style={{ animationDelay: "0.2s" }}>Your</span>{" "}
          <span className="inline-block animate-word-pop" style={{ animationDelay: "0.4s" }}>Pets</span>{" "}
          <span className="inline-block animate-word-pop" style={{ animationDelay: "0.6s" }}>Love</span>
        </h1>
        <button className="mt-3 px-5 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1.5" style={{ background: "#E86A10", color: "white" }}>
          Explore Products <ArrowRight size={14} />
        </button>
      </div>

      {/* Two cards row */}
      <div className="flex gap-3 mt-4 flex-1">
        {/* Product card */}
        <div className="flex-1 animate-scale-in" style={{ animationDelay: "0.5s" }}>
          <div style={{ aspectRatio: "1/1", borderRadius: 16, overflow: "hidden" }}>
            <img src={productImg} alt="Cozy Cat House" className="w-full h-full object-cover" />
          </div>
          <p className="text-xs mt-1" style={{ color: "#4b5563" }}>Cozy Cat House</p>
          <p className="text-sm font-bold" style={{ color: "#1a3d1a" }}>$49.99</p>
        </div>
        {/* Video card */}
        <div className="flex-[0.75] animate-scale-in" style={{ animationDelay: "0.6s" }}>
          <div style={{ aspectRatio: "3/4", borderRadius: 16, overflow: "hidden", position: "relative" }}>
            <img src={videoImg} alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#1a3d1a" }}>
              <Play size={12} color="white" fill="white" />
            </div>
          </div>
          <p className="text-xs mt-1 text-center" style={{ color: "#4b5563" }}>Reviews</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-center gap-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold" style={{ color: "#1a3d1a" }}>98K+</span>
          <div className="flex -space-x-1.5">
            <div className="w-5 h-5 rounded-full border-2 overflow-hidden" style={{ borderColor: "#EFFDF0" }}><img src={avatarSrc} alt="" className="w-full h-full object-cover" /></div>
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ background: "#1a3d1a", borderColor: "#EFFDF0" }}><Plus size={8} color="white" /></div>
          </div>
        </div>
        <div className="w-px h-6" style={{ background: "rgba(0,0,0,0.1)" }} />
        <div className="flex items-center gap-1">
          <Star size={14} color="#E86A10" fill="#E86A10" />
          <span className="text-sm font-bold" style={{ color: "#1a3d1a" }}>4.6</span>
        </div>
      </div>

      {/* Bottom images row */}
      <div className="flex items-end" style={{ gap: 0 }}>
        <div className="flex-1"><img src={bottomLeft} alt="" className="w-full h-auto block" /></div>
        <div className="flex-[1.2]"><img src={bottomCenter} alt="" className="w-full h-auto block" /></div>
        <div className="flex-1"><img src={bottomRight} alt="" className="w-full h-auto block" /></div>
      </div>
    </div>
  );
}