import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, usePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bone,
  BookOpen,
  Dna,
  Gem,
  Leaf,
  Plus,
} from "lucide-react";
import "./nhm.css";

// ─── 数据：五个化石章节（图片使用 Cloudinary 外链）────────────────────────────

const chaptersData = [
  {
    name: "Age of Dinosaurs",
    image:
      "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png",
  },
  {
    name: "Fossils of Ancient Life",
    image:
      "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624374/02_pmvxxl.png",
  },
  {
    name: "Reptiles of the Mesozoic",
    image:
      "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png",
  },
  {
    name: "Marine Fossil Gallery",
    image:
      "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png",
  },
  {
    name: "Prehistoric Giants",
    image:
      "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624251/05_kz1tyu.png",
  },
];

// 等宽字体快捷变量，用于标签、计数器、导航等 mono 排版
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";

// ─── 动画变体 ────────────────────────────────────────────────────────────────
// fadeUp：通用淡入上移（用于子元素逐一出现）
// letterBlock：NHM 字母从底部滑入，配合 SVG polygon stagger

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const letterBlock = {
  initial: { y: 120, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// ─── 沙粒溶解过渡图片组件 ────────────────────────────────────────────────────
// 使用 SVG 滤镜链：feTurbulence → feDisplacementMap → feOffset → feGaussianBlur → feColorMatrix
// 进入动画：quartic ease-out（1 - (1-t)^4），位移/模糊/偏移逐渐收缩，透明度从 0 到 1
// 退出动画：cubic ease-in（t^3），反向扩散，通过 usePresence 感知 AnimatePresence 卸载时机
// filterId 每个实例唯一，避免多实例同时存在时滤镜 ID 冲突

interface SandProps {
  src: string;
  alt: string;
  className?: string;
}

function SandTransitionImage({ src, alt, className }: SandProps) {
  const [isPresent, safeToRemove] = usePresence();
  const filterId = useRef(
    `sf-${Math.random().toString(36).slice(2, 10)}`,
  ).current;
  const rafRef = useRef(0);

  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const offsetRef = useRef<SVGFEOffsetElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const colorRef = useRef<SVGFEColorMatrixElement>(null);

  // 核心动画函数：entering=true 为进入，false 为退出
  // 所有 SVG 滤镜属性通过 ref 直接操控，避免 React 重渲染开销
  const runAnimation = useCallback(
    (entering: boolean) => {
      cancelAnimationFrame(rafRef.current);
      const DURATION = 900; // 动画时长 900ms
      const startTime = performance.now();

      const step = (now: number) => {
        const raw = Math.min((now - startTime) / DURATION, 1);
        // 进入：四次缓出（快速到位）；退出：三次缓入（渐快消散）
        const t = entering ? 1 - Math.pow(1 - raw, 4) : Math.pow(raw, 3);

        dispRef.current?.setAttribute(
          "scale",
          String(entering ? 150 * (1 - t) : 150 * t),
        );
        offsetRef.current?.setAttribute(
          "dy",
          String(entering ? -80 * (1 - t) : 120 * t),
        );
        offsetRef.current?.setAttribute(
          "dx",
          String(entering ? -30 * (1 - t) : 30 * t),
        );
        blurRef.current?.setAttribute(
          "stdDeviation",
          String(entering ? 6 * (1 - t) : 6 * t),
        );

        const alpha = entering ? t : Math.max(0, 1 - t * 1.2);
        colorRef.current?.setAttribute(
          "values",
          `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${alpha} 0`,
        );

        if (raw < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else if (!entering) {
          safeToRemove?.();
        }
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [safeToRemove],
  );

  useEffect(() => {
    runAnimation(true);
    return () => cancelAnimationFrame(rafRef.current);
  }, [runAnimation]);

  useEffect(() => {
    if (!isPresent) runAnimation(false);
  }, [isPresent, runAnimation]);

  return (
    <>
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <defs>
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="1.8"
              numOctaves={4}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale={150}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feOffset
              ref={offsetRef}
              in="displaced"
              dx={-30}
              dy={-80}
              result="shifted"
            />
            <feGaussianBlur
              ref={blurRef}
              in="shifted"
              stdDeviation={6}
              result="blurred"
            />
            <feColorMatrix
              ref={colorRef}
              in="blurred"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 0"
            />
          </filter>
        </defs>
      </svg>
      <img
        src={src}
        alt={alt}
        className={className}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        style={{ filter: `url(#${filterId})` }}
      />
    </>
  );
}

// ─── Explore Now CTA 按钮 ────────────────────────────────────────────────────
// 悬停效果：向上微移 0.5px + 加深阴影 + 白色面板从左侧滑入（cubic-bezier 弹入）
// 图标：悬停时缩放 + 旋转 + 上移；文字/图标颜色同步翻转

function ExploreButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="relative overflow-hidden flex items-center gap-3 px-6 py-3.5 border border-[#1a1a1a] rounded-md cursor-pointer"
      style={{
        backgroundColor: "#1a1a1a",
        transform: hovered ? "translateY(-0.5px)" : "none",
        boxShadow: hovered
          ? "3px 3px 0px rgba(17,17,17,0.5)"
          : "0 1px 2px rgba(0,0,0,0.08)",
        transition: "transform 300ms, box-shadow 300ms",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Slide-in bg */}
      <div
        className="absolute inset-0 bg-[#fcfcfc]"
        style={{
          transform: hovered ? "translateX(0)" : "translateX(-101%)",
          transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {/* Leaf icon */}
      <span
        className="relative"
        style={{
          color: hovered ? "#111" : "white",
          transform: hovered
            ? "scale(1.1) rotate(-12deg) translateY(-4px)"
            : "none",
          transition: "color 300ms, transform 300ms",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
          <path d="M9 2C5.5 4 3 7 3 10.5C3 13.5 5.7 16 9 16C12.3 16 15 13.5 15 10.5C15 7 12.5 4 9 2Z" />
          <path d="M9 2L9 16" stroke="#fcfcfc" strokeWidth="1" fill="none" />
          <path
            d="M9 9C8 8.5 6.5 7.5 6 6"
            stroke="#fcfcfc"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M9 9C10 8.5 11.5 7.5 12 6"
            stroke="#fcfcfc"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>
      </span>
      <span
        className="relative text-[15px] font-medium"
        style={{
          color: hovered ? "#111" : "white",
          transition: "color 300ms",
        }}
      >
        Explore Now
      </span>
    </button>
  );
}

// ─── 查看详情按钮（右侧边栏标本信息区） ──────────────────────────────────────
// 圆形圆圈 + Plus 图标；悬停：圆圈填充黑色，图标变白

function ViewDetailsButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="flex items-center gap-3 bg-transparent border-none p-0 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
        style={{
          borderColor: hovered ? "black" : "#9ca3af",
          backgroundColor: hovered ? "#111" : "transparent",
          color: hovered ? "white" : "#111",
        }}
      >
        <Plus size={16} strokeWidth={1.5} />
      </div>
      <span
        style={{
          fontSize: "10px",
          fontFamily: MONO,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontWeight: 700,
        }}
      >
        View Details
      </span>
    </button>
  );
}

// ─── NHM 自然历史博物馆主页 ────────────────────────────────────────────────
// 包含三个区块：
//   Section 1 Hero     — 全屏 NHM SVG 字母动画 + 视频背景 + 左右侧边栏
//   Section 2 Explore  — 「探索世界」标题 + 分类胶囊按钮
//   Section 3 Ancient  — 暗色「古代收藏」区 + 翼龙视差 + 章节列表 + 沙粒图片过渡

export default function NHM() {
  // showVideo：2800ms 后显示背景视频，避免首帧闪烁
  const [showVideo, setShowVideo] = useState(false);
  // activeChapter：当前激活章节索引，初始为第 3 项（Reptiles of the Mesozoic）
  const [activeChapter, setActiveChapter] = useState(2);
  // isMobileMenuOpen：移动端导航展开状态
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 动态注入 JetBrains Mono 字体，组件卸载时清除 link 标签
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // 延迟 2800ms 显示背景视频，避免页面加载初期闪白
  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 2800);
    return () => clearTimeout(t);
  }, []);

  // 每 3500ms 自动切换章节，循环播放（共 5 个章节）
  useEffect(() => {
    const id = setInterval(() => setActiveChapter((p) => (p + 1) % 5), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        backgroundColor: "#fcfcfc",
        color: "#111",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <style>{`::selection{background:#111;color:#fff;}`}</style>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
        {/* 1D · Background video */}
        {showVideo && (
          <div className="absolute inset-0 pointer-events-none z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dsdxaxkiz/video/upload/v1779624998/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4"
            />
          </div>
        )}

        {/* 1A · NHM Logo header */}
        <motion.header
          className="relative pt-6 px-6 md:px-16 z-20"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
        >
          <motion.h1
            className="w-full"
            variants={{
              initial: { scale: 1.03 },
              animate: {
                scale: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.1 },
              },
            }}
          >
            <svg viewBox="0 0 840 100" className="w-full fill-[#111]">
              {/* N */}
              <g transform="translate(0,0)">
                <motion.polygon
                  variants={letterBlock}
                  points="0,0 14,0 14,100 0,100"
                />
                <motion.polygon
                  variants={letterBlock}
                  points="200,0 214,0 214,100 200,100"
                />
                <motion.polygon
                  variants={letterBlock}
                  points="0,0 33,0 214,100 181,100"
                />
              </g>
              {/* H */}
              <g transform="translate(280,0)">
                <motion.polygon
                  variants={letterBlock}
                  points="0,0 14,0 14,100 0,100"
                />
                <motion.polygon
                  variants={letterBlock}
                  points="200,0 214,0 214,100 200,100"
                />
                <motion.polygon
                  variants={letterBlock}
                  points="14,43 200,43 200,57 14,57"
                />
              </g>
              {/* M */}
              <g transform="translate(560,0)">
                <motion.polygon
                  variants={letterBlock}
                  points="0,0 14,0 14,100 0,100"
                />
                <motion.polygon
                  variants={letterBlock}
                  points="266,0 280,0 280,100 266,100"
                />
                <motion.polygon
                  variants={letterBlock}
                  points="0,0 26,0 153,100 127,100"
                />
                <motion.polygon
                  variants={letterBlock}
                  points="254,0 280,0 153,100 127,100"
                />
              </g>
            </svg>
          </motion.h1>

          {/* 1B · Sub-nav bar */}
          <motion.div
            className="flex justify-between items-start mt-8"
            variants={{
              animate: {
                transition: { staggerChildren: 0.1, delayChildren: 0.4 },
              },
            }}
            style={{
              fontSize: "10px",
              fontFamily: MONO,
              letterSpacing: "0.2em",
            }}
          >
            {/* Left — institution lines */}
            <motion.div
              className="flex flex-col"
              style={{ width: "15%" }}
              variants={{
                ...fadeUp,
                animate: {
                  ...fadeUp.animate,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <span>Natura</span>
              <span>History</span>
              <span>Museum</span>
            </motion.div>

            {/* Arrow */}
            <motion.div
              className="hidden md:flex items-center pt-1"
              style={{ width: "5%" }}
              variants={{
                ...fadeUp,
                animate: {
                  ...fadeUp.animate,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
            </motion.div>

            {/* Center — tagline */}
            <motion.p
              className="flex-1 md:flex-none text-gray-800 leading-relaxed"
              style={{ fontFamily: MONO, width: "30%" }}
              variants={{
                ...fadeUp,
                animate: {
                  ...fadeUp.animate,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <span className="hidden md:block">
                Exploring the story of
                <br />
                life on earth through
                <br />
                science, discovery and wonder.
              </span>
              <span className="md:hidden">
                Exploring the story of life on earth through science, discovery
                and wonder.
              </span>
            </motion.p>

            {/* Arrow */}
            <motion.div
              className="hidden md:flex items-center pt-1"
              style={{ width: "5%" }}
              variants={{
                ...fadeUp,
                animate: {
                  ...fadeUp.animate,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
            </motion.div>

            {/* Right — nav links */}
            <motion.nav
              className="hidden md:flex flex-col gap-1 text-gray-800"
              style={{ width: "15%" }}
              variants={{
                ...fadeUp,
                animate: {
                  ...fadeUp.animate,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              {["Visit", "Exhibitions", "Discover", "Learn", "About"].map(
                (l) => (
                  <a
                    key={l}
                    href="#"
                    className="hover:text-black hover:underline"
                  >
                    {l}
                  </a>
                ),
              )}
            </motion.nav>

            {/* Hamburger */}
            <button
              className="relative z-[60] flex flex-col justify-center items-end gap-[6px] bg-transparent border-none p-2 cursor-pointer"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span
                className="block bg-black"
                style={{
                  width: isMobileMenuOpen ? "32px" : "32px",
                  height: "1.5px",
                  transition: "transform 300ms",
                  transform: isMobileMenuOpen
                    ? "translateY(7.5px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block bg-black"
                style={{
                  width: isMobileMenuOpen ? "32px" : "40px",
                  height: "1.5px",
                  transition: "transform 300ms, width 300ms",
                  transform: isMobileMenuOpen
                    ? "translateY(-7.5px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </motion.div>
        </motion.header>

        {/* 1C · Mobile menu overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden absolute left-0 right-0 bg-[#fcfcfc] border-b border-gray-200 shadow-xl z-50 px-6 py-8"
              style={{ top: "120px" }}
            >
              <div
                className="flex flex-col space-y-6 text-gray-800"
                style={{
                  fontSize: "13px",
                  fontFamily: MONO,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {["Visit", "Exhibitions", "Discover", "Learn", "About"].map(
                  (l) => (
                    <a
                      key={l}
                      href="#"
                      className="hover:text-black"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {l}
                    </a>
                  ),
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1E · Left sidebar */}
        <motion.div
          className="relative px-10 md:px-16 mt-20 sm:mt-28 md:mt-32 z-10"
          style={{ width: "320px" }}
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: { staggerChildren: 0.15, delayChildren: 0.6 },
            },
          }}
        >
          {/* Section indicator */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            variants={{
              ...fadeUp,
              animate: { ...fadeUp.animate, transition: { duration: 0.8 } },
            }}
          >
            <span style={{ fontSize: "12px", fontFamily: MONO }}>01</span>
            <div
              className="bg-black/20"
              style={{ width: "4rem", height: "1.5px" }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-normal tracking-tight leading-[1] mb-6"
            style={{ fontSize: "clamp(3.5rem,6vw,5rem)" }}
            variants={{
              ...fadeUp,
              animate: { ...fadeUp.animate, transition: { duration: 0.8 } },
            }}
          >
            TIMELESS
            <br />
            WONDERS
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-gray-700 leading-[1.6] mb-8"
            style={{ fontSize: "13px", width: "240px" }}
            variants={{
              ...fadeUp,
              animate: { ...fadeUp.animate, transition: { duration: 0.8 } },
            }}
          >
            Step into the natural world and
            <br />
            discover the stories written
            <br />
            millions of years ago.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={{
              ...fadeUp,
              animate: { ...fadeUp.animate, transition: { duration: 0.8 } },
            }}
          >
            <ExploreButton />
          </motion.div>
        </motion.div>

        {/* 1F · Right sidebar (desktop only) */}
        <motion.div
          className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 z-10"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: { staggerChildren: 0.15, delayChildren: 0.9 },
            },
          }}
        >
          <motion.div
            variants={{
              ...fadeUp,
              animate: { ...fadeUp.animate, transition: { duration: 0.8 } },
            }}
          >
            <p
              className="mb-1"
              style={{
                fontSize: "10px",
                fontFamily: MONO,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Tyrannosaurus Rex
            </p>
            <p
              className="text-gray-600 leading-[1.6]"
              style={{ fontSize: "12px" }}
            >
              Late Cretaceous period
              <br />
              68–66 million years ago
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3"
            variants={{
              ...fadeUp,
              animate: { ...fadeUp.animate, transition: { duration: 0.8 } },
            }}
          >
            {[
              ["Length", "12.3 m"],
              ["Height", "4.0 m"],
            ].map(([label, val]) => (
              <div key={label}>
                <span
                  className="text-gray-500"
                  style={{
                    fontSize: "10px",
                    fontFamily: MONO,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
                <p style={{ fontSize: "13px", fontWeight: 500 }}>{val}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={{
              ...fadeUp,
              animate: { ...fadeUp.animate, transition: { duration: 0.8 } },
            }}
          >
            <ViewDetailsButton />
          </motion.div>
        </motion.div>

        {/* 1G · Scroll indicator (desktop only) */}
        <motion.div
          className="absolute bottom-10 hidden md:flex items-center gap-4 z-10"
          style={{ left: "4rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.2, duration: 0.8 },
          }}
        >
          <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center gap-[4px]">
            <div
              className="bg-gray-600"
              style={{ width: "1px", height: "12px" }}
            />
            <div
              className="bg-gray-600"
              style={{ width: "1px", height: "12px" }}
            />
          </div>
          <span
            className="text-gray-500 font-semibold"
            style={{
              fontSize: "10px",
              fontFamily: MONO,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Scroll to explore
          </span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — EXPLORE OUR WORLD
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative w-full bg-[#fcfcfc] flex flex-col items-center z-20"
        style={{ minHeight: "75vh" }}
      >
        <div className="w-full flex flex-col items-center pt-24 md:pt-32 px-8 md:px-16">
          {/* 2A · Section label */}
          <motion.div
            className="flex items-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "10px",
              fontFamily: MONO,
              letterSpacing: "0.2em",
            }}
          >
            <span className="text-gray-500">[ 02 ]</span>
            <span
              className="text-gray-900"
              style={{ fontWeight: 700, textTransform: "uppercase" }}
            >
              Explore Our World
            </span>
          </motion.div>

          {/* 2B · Main heading */}
          <motion.h2
            className="text-center font-medium tracking-tight text-[#111] mb-12"
            style={{
              fontSize: "clamp(2.2rem,4.5vw,4.2rem)",
              lineHeight: 1.1,
              maxWidth: "1000px",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="hidden md:inline">
              Unearth the stories of our planet's
              <br />
              past through fossils, minerals, and ancient wonders.
            </span>
            <span className="md:hidden">
              Unearth the stories of our planet's past through fossils,
              minerals, and ancient wonders.
            </span>
          </motion.h2>

          {/* 2C · Action pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-24"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              animate: {
                transition: { staggerChildren: 0.1, delayChildren: 0.3 },
              },
            }}
          >
            {[
              { Icon: Bone, label: "Dinosaurs" },
              { Icon: Dna, label: "Ancient Life" },
              { Icon: Gem, label: "Minerals" },
              { Icon: Leaf, label: "Fossils" },
              { Icon: BookOpen, label: "Learn More" },
            ].map(({ Icon, label }) => (
              <motion.button
                key={label}
                variants={{
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 bg-white/50 backdrop-blur-sm text-gray-800 hover:border-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                <Icon size={14} strokeWidth={2} />
                {label}
              </motion.button>
            ))}
          </motion.div>

          {/* 2D · Spacer */}
          <div className="w-full min-h-[220px] md:min-h-[450px]" />
        </div>

        {/* 2E · Bottom text (desktop) */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-8 md:pb-12 pointer-events-none">
          <div className="hidden md:flex justify-between">
            {["WE DON'T JUST TELL STORIES.", "PALEONTOLOGY (C) 2026"].map(
              (t) => (
                <span
                  key={t}
                  className="text-gray-500"
                  style={{
                    fontSize: "10px",
                    fontFamily: MONO,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — ANCIENT COLLECTION (dark)
      ══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#0a0a0a] text-white flex flex-col z-30">
        {/* 3A · Pterodactyl */}
        <motion.img
          src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779625001/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png"
          alt="Pterodactyl"
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-0 w-[160vw] md:w-[1100px]"
          initial={{ y: "-65%", opacity: 0 }}
          whileInView={{ y: "-78%", opacity: 1 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />

        {/* 3B · Heading area */}
        <div className="relative px-8 md:px-16 pt-32 md:pt-48 mb-16 z-10">
          <div className="flex flex-col xl:flex-row justify-between gap-12">
            {/* Left — main headline */}
            <motion.h2
              className="font-medium tracking-tight text-white leading-[1.15]"
              style={{ fontSize: "clamp(1.8rem,4vw,4rem)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Curated from millions of years of wonder{" "}
              <span
                className="inline-flex items-center gap-2 md:gap-3 mx-2 md:mx-4"
                style={{
                  verticalAlign: "middle",
                  transform: "translateY(-4px)",
                }}
              >
                {([Bone, Dna, Leaf] as (typeof Bone)[]).map((Icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-600 bg-black text-gray-400 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
                  >
                    <Icon size={22} />
                  </button>
                ))}
              </span>{" "}
              &amp; discovery.
            </motion.h2>

            {/* Right — tagline + pills */}
            <motion.div
              className="flex flex-col gap-4 xl:items-end xl:justify-end"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p
                className="text-gray-400 leading-relaxed"
                style={{
                  fontSize: "10px",
                  fontFamily: MONO,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                WE DON'T JUST DISPLAY FOSSILS
                <br />
                WE SHARE EARTH'S STORY
              </p>
              <div className="flex flex-wrap gap-2">
                {["Educational", "Authentic", "Inspiring"].map((label) => (
                  <button
                    key={label}
                    className="px-5 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
                    style={{
                      fontSize: "9px",
                      fontFamily: MONO,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gray-800" />

        {/* 3C · Two-column panel */}
        <div className="flex flex-col md:flex-row relative z-10">
          {/* Left panel — 35% */}
          <div className="md:w-[35%] min-h-[400px] md:min-h-[500px] border-b md:border-b-0 md:border-r border-gray-800 p-8 flex flex-col justify-between">
            <p className="text-gray-500 text-xl tracking-[0.3em]">***</p>

            {/* Chapter image */}
            <div
              className="relative flex-1 my-8"
              style={{ minHeight: "280px" }}
            >
              <AnimatePresence mode="wait">
                <SandTransitionImage
                  key={activeChapter}
                  src={chaptersData[activeChapter].image}
                  alt={chaptersData[activeChapter].name}
                  className="absolute inset-0 w-[80%] h-[80%] m-auto object-contain mix-blend-lighten"
                />
              </AnimatePresence>
            </div>

            {/* Chapter counter */}
            <div
              className="flex items-center gap-2"
              style={{ fontFamily: MONO }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeChapter}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: "10px",
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                  }}
                >
                  0{activeChapter + 1}
                </motion.span>
              </AnimatePresence>
              <span style={{ fontSize: "10px", color: "#333" }}>/ 05</span>
            </div>
          </div>

          {/* Right panel — 65% */}
          <div className="flex-1 flex flex-col">
            {/* Top bar */}
            <div className="border-b border-gray-800 p-8 flex justify-between items-center">
              <span
                className="text-gray-400"
                style={{
                  fontSize: "10px",
                  fontFamily: MONO,
                  letterSpacing: "0.15em",
                }}
              >
                Explore the past. Understand the present.
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeChapter}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-400"
                  style={{
                    fontSize: "10px",
                    fontFamily: MONO,
                    letterSpacing: "0.15em",
                  }}
                >
                  Chapter 0{activeChapter + 1}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Chapter list */}
            {chaptersData.map((chapter, i) => (
              <ChapterRow
                key={i}
                name={chapter.name}
                active={activeChapter === i}
                onClick={() => setActiveChapter(i)}
              />
            ))}
          </div>
        </div>

        {/* 3D · Footer */}
        <div className="h-[1px] bg-gray-800" />
        <div className="px-8 py-8 bg-[#0a0a0a]">
          <span
            className="text-gray-500"
            style={{
              fontSize: "10px",
              fontFamily: MONO,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            DIGGING INTO OUR PLANET'S PAST
          </span>
        </div>
      </section>
    </div>
  );
}

// ─── 章节行组件（Section 3 右侧列表） ─────────────────────────────────────
// 激活行文字为白色；未激活行默认 #444，悬停变 #999
// 激活行右侧显示带动画的 ArrowUpRight 图标

interface ChapterRowProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

function ChapterRow({ name, active, onClick }: ChapterRowProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left border-b border-gray-800/80 py-8 px-8 flex items-center justify-between bg-transparent cursor-pointer transition-colors duration-300"
      style={{ color: active ? "white" : hovered ? "#999" : "#444" }}
    >
      <span className="text-2xl md:text-[2rem] font-medium tracking-tight">
        {name}
      </span>
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={22} strokeWidth={1} className="text-gray-400" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
