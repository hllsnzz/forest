/**
 * Prisma 主页面 —— 创意工作室落地页
 *
 * 页面结构：
 * 1. Hero：全屏视频背景 + 噪声叠加 + 导航药丸 + 底部标题"Prisma" + 描述 + CTA
 * 2. About：深色卡片 + 逐词上拉标题 + 逐字符滚动显影段落
 * 3. Features：四列功能卡片（视频卡 + 3 张文案卡）
 *
 * 所有视频和图片已下载到本地 assets/images/prisma/
 */
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import WordsPullUp from "./WordsPullUp";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";
import AnimatedLetter from "./AnimatedLetter";
import "./prisma.css";

/* ===== 本地静态资源导入 ===== */
import heroVid from "../../assets/images/prisma/hero.mp4";
import featuresCardVid from "../../assets/images/prisma/features-card.mp4";
import icon1 from "../../assets/images/prisma/icon1.webp";
import icon2 from "../../assets/images/prisma/icon2.webp";
import icon3 from "../../assets/images/prisma/icon3.webp";

/* ===== 导航链接 ===== */
const NAV_LINKS = ["Our story", "Collective", "Workshops", "Programs", "Inquiries"];

/* ===== About 段落的逐字符动画 ===== */
const ABOUT_TEXT = "Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.";

/* ===== Features 卡片数据 ===== */
const FEATURE_CARDS = [
  {
    id: 0,
    type: "video",
    src: featuresCardVid,
    title: "Your creative canvas.",
  },
  {
    id: 1,
    type: "text",
    icon: icon1,
    title: "Project Storyboard.",
    num: "01",
    items: [
      "Drag-and-drop scene builder for rapid pre-vis.",
      "Real-time collaboration across your entire team.",
      "Version history with frame-accurate restore points.",
    ],
  },
  {
    id: 2,
    type: "text",
    icon: icon2,
    title: "Smart Critiques.",
    num: "02",
    items: [
      "AI-powered analysis of pacing, composition, and color.",
      "Annotated feedback with frame-specific creative notes.",
      "Seamless tool integrations — Premiere, DaVinci, After Effects.",
    ],
  },
  {
    id: 3,
    type: "text",
    icon: icon3,
    title: "Immersion Capsule.",
    num: "03",
    items: [
      "Auto-silence notifications for deep creative flow.",
      "Ambient soundscapes tailored to your project mood.",
      "Schedule sync across distributed team timezones.",
    ],
  },
];

/**
 * FadeUp —— 进入视口时淡入上移
 */
function FadeUp({ children, delay = 0, duration = 0.8, y = 30, className = "" }: {
  children: React.ReactNode; delay?: number; duration?: number; y?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ======================================== */
/* 主页面                                    */
/* ======================================== */
export default function Prisma() {
  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', Oxygen, Ubuntu, Cantarell, sans-serif" }}>
      {/* ======== SECTION 1: HERO ======== */}
      <section className="relative w-full h-screen p-4 md:p-6">
        {/* 圆角容器 */}
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
          {/* 视频背景 */}
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={heroVid} type="video/mp4" />
          </video>

          {/* 噪声叠加层 */}
          <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none z-10" />

          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

          {/* ===== 导航栏：黑色药丸挂在顶部 ===== */}
          <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
              <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap transition-colors"
                    style={{ color: "rgba(225,224,204,0.8)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#E1E0CC"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(225,224,204,0.8)"; }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* ===== 底部内容 ===== */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-12 gap-4">
              {/* 左 8 列：巨大标题 "Prisma" */}
              <div className="col-span-12 md:col-span-8" style={{ color: "#E1E0CC" }}>
                <WordsPullUp
                  text="Prisma"
                  className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] text-left"
                  showAsterisk
                />
              </div>

              {/* 右 4 列：描述 + CTA */}
              <div className="col-span-12 md:col-span-4 flex flex-col justify-end">
                <FadeUp y={20} delay={0.5} duration={0.8}>
                  <p className="text-xs sm:text-sm md:text-base leading-[1.2] mb-4 md:mb-6" style={{ color: "rgba(225,224,204,0.7)" }}>
                    Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
                  </p>
                </FadeUp>
                <FadeUp y={20} delay={0.7} duration={0.8}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 md:px-6 md:py-3 text-sm sm:text-base font-medium transition-all duration-300 hover:gap-3"
                    style={{ background: "#DEDBC8", color: "#000" }}
                  >
                    Join the lab
                    <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
                      <ArrowRight size={16} style={{ color: "#DEDBC8" }} />
                    </span>
                  </a>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== SECTION 2: ABOUT ======== */}
      <section className="bg-black px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl rounded-2xl md:rounded-[2rem] p-8 md:p-12 lg:p-16" style={{ background: "#101010" }}>
          {/* 小标签 */}
          <p className="text-[10px] sm:text-xs mb-6 md:mb-8" style={{ color: "#DEDBC8" }}>Visual arts</p>

          {/* 多段样式标题：逐词上拉 */}
          <WordsPullUpMultiStyle
            segments={[
              { text: "I am Marcus Chen,", className: "" },
              { text: "a self-taught director.", className: "italic" },
              { text: "I have skills in color grading, visual effects, and narrative design.", className: "" },
            ]}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9] text-left max-w-3xl mx-auto mb-10 md:mb-14"
          />

          {/* 逐字符滚动显影段落 */}
          <div className="max-w-3xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed" style={{ color: "#DEDBC8" }}>
            <AnimatedLetter text={ABOUT_TEXT} />
          </div>
        </div>
      </section>

      {/* ======== SECTION 3: FEATURES ======== */}
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* 噪声背景 */}
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

        <div className="relative z-10 px-4 md:px-6 py-16 md:py-20">
          {/* 标题 */}
          <div className="text-center mb-12 md:mb-16">
            <WordsPullUpMultiStyle
              segments={[
                { text: "Studio-grade workflows for visionary creators.", className: "" },
                { text: "Built for pure vision. Powered by art.", className: "text-gray-500" },
              ]}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal"
            />
          </div>

          {/* 四列卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px] max-w-7xl mx-auto">
            {FEATURE_CARDS.map((card, i) => (
              <FeatureCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== FeatureCard 组件 ===== */
function FeatureCard({ card, index }: { card: typeof FEATURE_CARDS[0]; index: number }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden flex flex-col p-5 md:p-6"
      style={{
        background: card.type === "video" ? "#000" : "#212121",
        minHeight: card.type === "video" ? 360 : 280,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 视频卡片 */}
      {card.type === "video" && card.src && (
        <>
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={card.src} type="video/mp4" />
          </video>
          <div className="relative z-10 mt-auto text-sm md:text-base" style={{ color: "#E1E0CC" }}>
            {card.title}
          </div>
        </>
      )}

      {/* 文案卡片 */}
      {card.type === "text" && (
        <>
          {/* 顶部图标 */}
          <img src={card.icon} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-4 object-cover" />

          {/* 标题 + 编号 */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm md:text-base font-medium" style={{ color: "#E1E0CC" }}>{card.title}</h3>
            <span className="text-xs" style={{ color: "rgba(225,224,204,0.5)" }}>{card.num}</span>
          </div>

          {/* 清单列表 */}
          <div className="flex flex-col gap-3 flex-1">
            {(card.items || []).map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#DEDBC8" }} />
                <span className="text-xs sm:text-sm leading-relaxed text-gray-400">{item}</span>
              </div>
            ))}
          </div>

          {/* Learn more */}
          <div className="mt-4">
            <a href="#" className="inline-flex items-center gap-1.5 text-xs sm:text-sm transition-opacity hover:opacity-70" style={{ color: "#DEDBC8" }}>
              Learn more
              <ArrowRight size={12} style={{ transform: "rotate(-45deg)" }} />
            </a>
          </div>
        </>
      )}
    </motion.div>
  );
}