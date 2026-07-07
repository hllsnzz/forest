/**
 * Mainframe 主页面 —— 现代交互式 Hero
 *
 * 核心交互：
 * - 桌面端：鼠标水平滑动擦洗视频进度（mousemove delta-based）
 * - 移动端：自动播放视频
 * - 打字机效果标题（"we'd love to hear from you!"）
 * - 多选服务胶囊按钮 + 动态反馈横幅
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import heroVid from "../../assets/images/mainframe/hero.mp4";
import { useTypewriter } from "./useTypewriter";
import "./mainframe.css";

/* ===== 常量 ===== */
const SERVICES = ["Brand", "Digital", "Campaign", "Other"];
const HEADLINE = "we'd love to\nhear from you!";

/* ======================================== */
/* 主页面                                    */
/* ======================================== */
export default function Mainframe() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!", 38, 600);

  // 切换服务选择
  const toggleService = useCallback((s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }, []);

  return (
    <div
      className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* ===== 视频背景（桌面端鼠标擦洗，移动端自动播放）===== */}
      <ScrubbableVideo />

      {/* ===== 固定导航栏 ===== */}
      <Navbar isOpen={isMobileMenuOpen} onToggle={() => setMobileMenuOpen((v) => !v)} />

      {/* ===== 移动端全屏菜单遮罩 ===== */}
      <MobileMenuOverlay isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* ===== 内容层 ===== */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main id="spade-hero" className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
          {/* 打字机标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
              )}
            </h1>
          </motion.div>

          {/* 副标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl leading-relaxed font-normal mb-14 max-w-2xl" style={{ color: "#5A635A" }}>
              Whether you have questions, feedback, <br /> drop us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* ===== 服务多选胶囊 ===== */}
          <section>
            {/* 提示标题 */}
            <h2 className="text-2xl font-medium tracking-tight mb-2 text-black">What sort of service?</h2>
            <p className="text-base mb-8" style={{ opacity: 0.85, color: "#738273" }}>Select all that apply</p>

            {/* 胶囊按钮组 */}
            <div className="flex flex-wrap gap-3 mb-6">
              {SERVICES.map((s) => {
                const active = selectedServices.includes(s);
                return (
                  <motion.button
                    key={s}
                    onClick={() => toggleService(s)}
                    className={`relative flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      active
                        ? "shadow-md shadow-emerald-950/5"
                        : "border hover:bg-[#F1F3F1]/55"
                    }`}
                    style={{
                      background: active ? "#1C2E1E" : "white",
                      color: active ? "white" : "#1C2E1E",
                      borderColor: active ? "transparent" : "#F1F3F1",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {active && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check size={14} className="text-white" />
                      </motion.span>
                    )}
                    {s}
                  </motion.button>
                );
              })}
            </div>

            {/* 动态反馈横幅 */}
            <AnimatePresence mode="wait">
              {selectedServices.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs italic"
                  style={{ opacity: 0.5, color: "#738273" }}
                >
                  Please click to select services above.
                </motion.p>
              ) : (
                <motion.div
                  key="active"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex items-center justify-between px-5 py-4 rounded-2xl"
                    style={{ background: "#FAFBF9", border: "1px solid #F1F3F1" }}
                  >
                    <span className="text-sm" style={{ color: "#738273" }}>
                      Ready to inquire about: <strong>{selectedServices.join(", ")}</strong>
                    </span>
                    <button
                      className="text-xs font-medium uppercase tracking-wider transition-opacity hover:opacity-70"
                      style={{ color: "#4D6D47" }}
                    >
                      Let's Go →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ======================================== */
/* ScrubbableVideo —— 可擦洗视频组件        */
/* ======================================== */
/**
 * 桌面端（>=1024px）：通过鼠标水平移动 delta 计算视频进度
 * 移动端（<1024px）：自动播放
 */
function ScrubbableVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevX = useRef(0);
  const seeking = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      // 移动端：自动播放
      video.autoplay = true;
      video.play().catch(() => {});
      return;
    }

    // 桌面端：鼠标擦洗
    const handleMouse = (e: MouseEvent) => {
      if (!video || seeking.current) return;
      const delta = e.clientX - prevX.current;
      prevX.current = e.clientX;
      const dur = video.duration || 10;
      const target = Math.max(0, Math.min(dur, video.currentTime + (delta / window.innerWidth) * 0.8 * dur));
      video.currentTime = target;
    };

    const handleSeeked = () => {
      seeking.current = false;
    };

    window.addEventListener("mousemove", handleMouse);
    video.addEventListener("seeked", handleSeeked);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full" style={{ background: "#fafafa" }}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-right lg:object-right-bottom"
      >
        <source src={heroVid} type="video/mp4" />
      </video>
    </div>
  );
}

/* ======================================== */
/* Navbar —— 顶部导航栏                      */
/* ======================================== */
function Navbar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
      {/* 左侧 Logo */}
      <div className="flex items-center gap-3">
        <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
          Mainframe&reg;
        </span>
        <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
          &#10033;
        </span>
      </div>

      {/* 桌面端导航链接 */}
      <div className="hidden md:flex items-center gap-1 text-[23px] text-black">
        {["Labs", "Studio", "Openings", "Shop"].map((link, i) => (
          <span key={link} className="flex items-center">
            <a href="#" className="hover:opacity-60 transition-opacity">{link}</a>
            {i < 3 && <span className="opacity-40 mx-2">,&nbsp;</span>}
          </span>
        ))}
      </div>

      {/* 桌面端 CTA */}
      <a
        href="#"
        className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
      >
        Get in touch
      </a>

      {/* 移动端汉堡按钮 */}
      <button
        onClick={onToggle}
        className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5"
        aria-label="Toggle menu"
      >
        <span
          className="block w-6 h-[2px] bg-black transition-all duration-300"
          style={{ transform: isOpen ? "rotate(45deg) translateY(7px)" : "none" }}
        />
        <span
          className="block w-6 h-[2px] bg-black transition-all duration-300"
          style={{ opacity: isOpen ? 0 : 1 }}
        />
        <span
          className="block w-6 h-[2px] bg-black transition-all duration-300"
          style={{ transform: isOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}
        />
      </button>
    </header>
  );
}

/* ======================================== */
/* MobileMenuOverlay —— 移动端全屏菜单       */
/* ======================================== */
function MobileMenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[9] transition-all duration-300 md:hidden"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <div className="flex flex-col items-center justify-center h-full gap-8">
        {["Labs", "Studio", "Openings", "Shop"].map((link) => (
          <a
            key={link}
            href="#"
            onClick={onClose}
            className="text-3xl text-black hover:opacity-60 transition-opacity"
          >
            {link}
          </a>
        ))}
        <a href="#" onClick={onClose} className="text-xl text-black underline underline-offset-4 mt-4">
          Get in touch
        </a>
      </div>
    </div>
  );
}