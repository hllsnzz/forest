/**
 * SynapseX 主页面 —— 未来主义神经 AI 界面产品落地页
 *
 * 页面结构（从上到下）：
 * 1. Hero：鼠标擦洗视频（非自动播放，用鼠标水平滑动控制时间轴）
 * 2. 第二段：自动播放视频 + 3D 旋转文字（Framer Motion 滚动驱动）
 * 3. Metrics：自动播放视频 + 三列数据指标
 * 4. Technology：自动播放视频 + 四列功能卡片
 * 5. Architecture：纯黑背景 + 三层架构卡片
 * 6. Footer：左侧视频 + 右侧品牌信息
 *
 * 核心交互：
 * - Hero 视频：水平鼠标移动累积 delta * 0.8 = 视频进度
 * - 3D 文字：useScroll + useSpring + useTransform 驱动 rotateX
 * - ScrambleIn / ScrambleText 乱码入场/悬停动画
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import SynapseXLogo from "./SynapseXLogo";
import SquashHamburger from "./SquashHamburger";
import ScrambleIn from "./ScrambleIn";
import ScrambleText from "./ScrambleText";
import "./synapse.css";

/* ===== 视频资源 URL（CloudFront CDN）===== */
const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4";
const SECTION2_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4";
const METRICS_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4";
const TECH_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4";
const FOOTER_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4";

/* ===== 导航链接 ===== */
const NAV_LINKS = ["Product", "Technology", "Research", "Pricing"];

/* ===== 工具组件 ===== */

/**
 * FadeUp —— 进入视口时触发淡入+上移动画
 * 封装 Framer Motion 的 whileInView，减少重复代码
 */
function FadeUp({ children, delay = 0, duration = 0.8, y = 30, once = true, amount = 0.3, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * VideoBg —— 自动播放、静音、循环的视频背景层
 */
function VideoBg({ src, className = "" }: { src: string; className?: string }) {
  return (
    <video autoPlay muted loop playsInline className={"absolute inset-0 w-full h-full object-cover " + className}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

/**
 * HeroVideo —— 不自播，靠鼠标水平滑动控制播放进度
 *
 * 原理：
 * 1. 视频初始为暂停状态（不设置 autoPlay）
 * 2. 鼠标水平移动时累积 movementX，乘灵敏度系数 0.8
 * 3. 累积值作为 currentTime 设置到 video 元素
 * 4. 通过 seeked 事件防止并发 seek 导致丢帧
 */
function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const totalDelta = useRef(0);
  const seeking = useRef(false);

  const seekVideo = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video || seeking.current) return;
    seeking.current = true;
    video.currentTime = time;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      totalDelta.current += e.movementX * 0.8;
      const video = videoRef.current;
      if (!video) return;
      const maxTime = video.duration || 30;
      const target = Math.max(0, Math.min(maxTime, totalDelta.current));
      seekVideo(target);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [seekVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onSeeked = () => { seeking.current = false; };
    video.addEventListener("seeked", onSeeked);
    return () => video.removeEventListener("seeked", onSeeked);
  }, []);

  return (
    <video ref={videoRef} playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>
  );
}

/**
 * HoverLink —— 导航链接，悬停时触发 ScrambleText 乱码
 */
function HoverLink({ children }: { children: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      className="text-white/70 text-[13px] tracking-[0.08em] uppercase hover:text-white transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ScrambleText text={children} isHovered={hovered} />
    </a>
  );
}

/* ===== 导航栏 ===== */
function NavBar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 py-5">
      <div className="flex items-center gap-2">
        <SynapseXLogo size={20} className="text-white/70" />
        <span className="text-white/70 text-[15px] font-medium tracking-tight">SynapseX</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => <HoverLink key={link}>{link}</HoverLink>)}
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-2 bg-white text-black text-[13px] font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors">
          <i className="bi bi-apple text-base" />
          Download
        </button>
        <div className="md:hidden">
          <SquashHamburger open={isOpen} onToggle={onToggle} />
        </div>
      </div>
    </nav>
  );
}

/* ===== 主页面 ===== */
export default function SynapseX() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);

  // 800ms 后标记入场动画完成
  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // 第 2 段：3D 文字旋转（Framer Motion 滚动驱动）
  const section2Ref = useRef<HTMLDivElement>(null!);
  const { scrollYProgress } = useScroll({ target: section2Ref, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 15, damping: 32, mass: 1.8 });
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [15, 0, -15]);
  const transform3D = useMotionTemplate`perspective(1200px) rotateX(${rotateX}deg)`;

  return (
    <div className="relative bg-black text-white min-h-screen" style={{ fontFamily: "'Space Mono', monospace" }}>

      {/* ==================== SECTION 1: HERO ==================== */}
      <section className="relative w-full overflow-hidden" style={{ height: "100dvh" }}>
        <HeroVideo />

        {/* 点阵网格叠加层 */}
        <div className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px", opacity: 0.05,
          }}
        />

        {/* 水印大字 "TRANSCENDENCE"（Anton SC 字体） */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" style={{ transform: "translateY(50px)" }}>
          <span className="uppercase text-white/10 select-none leading-none"
            style={{ fontFamily: "'Anton SC', sans-serif", fontSize: "clamp(120px, 30vw, 521px)", letterSpacing: "-4px" }}
          >
            TRANSCENDENCE
          </span>
        </div>

        <NavBar isOpen={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />

        {/* 英雄内容：800ms 后淡入 */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
          style={{ opacity: entranceComplete ? 1 : 0, transition: "opacity 1s ease" }}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/60 text-[11px] sm:text-[12px] tracking-[0.15em] uppercase">Neural Interface v3.0</span>
          </div>

          <h1 className="text-center mb-6">
            <ScrambleIn text="Think. Connect. Transcend." delay={200} triggered={entranceComplete} />
          </h1>
          <p className="text-white/50 text-[13px] sm:text-[14px] text-center max-w-md leading-relaxed mb-8">
            <ScrambleIn text="The first neural interface that adapts to your mind — not the other way around." delay={400} triggered={entranceComplete} />
          </p>

          <div className="flex items-center gap-4">
            <button className="bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
              <ScrambleText text="Get early access" isHovered={false} />
            </button>
            <button className="border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-all">
              <ScrambleText text="Watch demo" isHovered={false} />
            </button>
          </div>
        </div>

        {/* 底部滚动指示器 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <motion.div className="w-px h-8 bg-white/20"
            animate={{ height: [8, 32, 8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* ==================== SECTION 2: 3D 文字旋转 ==================== */}
      <section ref={section2Ref} className="relative w-full overflow-hidden" style={{ height: "100dvh" }}>
        <VideoBg src={SECTION2_VIDEO} />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 sm:px-12">
          <motion.h2 className="text-center"
            style={{
              transform: transform3D,
              fontSize: "clamp(40px, 10vw, 120px)",
              lineHeight: 1, fontWeight: 300,
              letterSpacing: "-0.03em", color: "white",
            }}
          >
            &ldquo;Adapt.&rdquo;
          </motion.h2>
          <div className="w-16 h-px bg-white/20 my-6" />
          <p className="text-white/50 text-[13px] sm:text-[15px] text-center max-w-lg leading-relaxed">
            Intelligence is not static. It responds. It reshapes with every signal.
          </p>
        </div>
      </section>

      {/* ==================== SECTION 3: Metrics ==================== */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <VideoBg src={METRICS_VIDEO} />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 pt-32 pb-32 px-6 max-w-6xl mx-auto">
          <FadeUp duration={1.2} amount={0.3} className="text-center">
            <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20">Performance Metrics</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
            {[
              { value: "2.4ms", label: "Synaptic Latency" },
              { value: "99.7%", label: "Signal Accuracy" },
              { value: "140B", label: "Neural Parameters" },
            ].map((m, i) => (
              <FadeUp key={m.label} delay={i * 0.15} duration={0.8}>
                <p className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">{m.value}</p>
                <p className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">{m.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: Technology ==================== */}
      <section className="relative w-full overflow-hidden" style={{ height: "100dvh" }}>
        <VideoBg src={TECH_VIDEO} />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 flex flex-col h-full px-8 sm:px-12 md:px-16 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <FadeUp y={40} duration={1.0} amount={0.3}>
              <h2 className="text-white font-light leading-[0.95] tracking-[-0.03em]" style={{ fontSize: "clamp(36px, 8vw, 72px)" }}>
                Adaptive /<br />Intelligence
              </h2>
            </FadeUp>
            <FadeUp y={20} duration={1.0} delay={0.2}>
              <p className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2">
                The system learns your neural baseline within 72 hours. From there, every cognitive state is mapped, predicted, and optimized in real time.
              </p>
            </FadeUp>
          </div>
          <div className="flex-1" />
          <FadeUp duration={1.0} delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              {[
                { title: "Cortical Mapping", desc: "Real-time spatial reconstruction of active neural regions." },
                { title: "Signal Isolation", desc: "Separates cognitive intent from biological noise." },
                { title: "State Prediction", desc: "Anticipates cognitive transitions before they occur." },
                { title: "Loop Feedback", desc: "Closed-loop adjustment based on outcome correlation." },
              ].map((item, i) => (
                <FadeUp key={item.title} y={20} duration={0.7} delay={0.3 + i * 0.1}>
                  <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">{item.title}</h3>
                  <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">{item.desc}</p>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ==================== SECTION 5: Architecture ==================== */}
      <section className="relative w-full min-h-screen" style={{ background: "#000" }}>
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <FadeUp y={30} duration={1.0} amount={0.4}>
            <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">Architecture</p>
            <h2 className="text-white font-light leading-[1.15] tracking-[-0.02em] mb-10" style={{ fontSize: "clamp(28px, 6vw, 56px)" }}>
              Three layers. Zero friction.
            </h2>
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              Sensor layer captures raw bioelectric signals. Processing layer isolates intent. Interface layer delivers structured output to any connected system.
            </p>
          </FadeUp>
          <FadeUp duration={1.2} delay={0.4} amount={0.4}>
            <div className="mt-20 flex flex-col items-center gap-4">
              {[
                { num: "Layer 1", label: "Capture" },
                { num: "Layer 2", label: "Process" },
                { num: "Layer 3", label: "Interface" },
              ].map((layer) => (
                <div key={layer.num} className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6">
                  <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">{layer.num}</span>
                  <span className="text-white text-[16px] sm:text-[18px] font-light">{layer.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-black overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          <div className="md:w-1/2 h-[300px] md:h-auto overflow-hidden">
            <VideoBg src={FOOTER_VIDEO} />
          </div>
          <div className="md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <SynapseXLogo size={18} className="text-white/70" />
                <span className="text-white/70 text-[15px] font-medium tracking-tight">SynapseX</span>
              </div>
              <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
                The next evolution of human-machine interaction. Built for those who refuse to be limited by biology alone.
              </p>
            </div>
            <p className="text-white/25 text-[12px] mt-12">&copy; 2026 SynapseX Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}