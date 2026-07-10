import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import "./designpro.css";

// ─── 本地化视频资源 ────────────────────────────────────────────────────────────
import bgVideo from "../../assets/images/designpro/bg-video.mp4";

// ─── 导航链接列表 ─────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About Us", "Courses", "Instructors", "Testimonials", "Blog"];

// ─── ShinyText：RAF 直接操作 DOM 的扫光渐变文字组件 ───────────────────────────
// 为什么用 RAF 而不用 framer-motion MotionValue：
// framer-motion 在将 MotionValue 应用到 background 属性时，其 style 处理会
// 将 WebkitTextFillColor: transparent 取消，导致渐变以约色块显示而非文字形状。
// 通过 ref + requestAnimationFrame 直接设置 backgroundImage，绝对可靠。
interface ShinyTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

function ShinyText({ text, className, style }: ShinyTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let rafId: number;
    const START = performance.now();
    const DURATION = 3000; // 3 秒循环

    const tick = (now: number) => {
      const t = ((now - START) % DURATION) / DURATION; // 0 → 1
      const pos = -100 + t * 300; // -100% 展到 200%
      if (spanRef.current) {
        // 直接设置 backgroundImage，避开 framer-motion 的 style 调和干扰
        spanRef.current.style.backgroundImage =
          `linear-gradient(100deg, #64CEFB ${pos - 25}%, #ffffff ${pos}%, #64CEFB ${pos + 25}%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <span
      ref={spanRef}
      className={className}
      style={{
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        display: "inline-block",
        ...style,
      }}
    >
      {text}
    </span>
  );
}

// ─── DesignPro 主组件 ─────────────────────────────────────────────────────────
// 布局：全屏视频背景 → 导航 → 双列说明文字 → 居中 Hero 标题 + CTA
export default function DesignPro() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── 注入 Inter 字体 ──────────────────────────────────────────────────────
  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <div
      className="relative h-screen overflow-hidden bg-black"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── 背景视频（z-0）：循环静音全屏 ─────────────────────────────────── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src={bgVideo}
      />

      {/* ── 轻微暗化叠层，提升文字对比度 ─────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/50" style={{ zIndex: 1 }} />

      {/* ── 主内容（z-10）：导航 + 文字 + Hero + CTA ──────────────────────── */}
      <div className="relative flex flex-col h-full" style={{ zIndex: 10 }}>

        {/* ════════════════════════════════════════════════════════════════
            导航栏
        ════════════════════════════════════════════════════════════════ */}
        <nav className="w-full px-4 md:px-8 pt-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">

            {/* Logo：双圆 + 品牌名 */}
            <div className="flex items-center gap-2.5">
              {/* 外圆（白色描边）+ 内圆（白色填充）*/}
              <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <span className="text-white font-medium text-sm tracking-tight">DesignPro</span>
            </div>

            {/* 桌面导航：圆角胶囊 + gray-700 描边 */}
            <div className="hidden lg:flex items-center gap-0.5 border border-gray-700 rounded-full px-3 py-1.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/80 hover:text-white text-sm px-3 py-1.5 transition-colors rounded-full hover:bg-white/5"
                >
                  {link}
                </a>
              ))}
              {/* Contact us + 箭头图标 */}
              <a
                href="#"
                className="text-white/80 hover:text-white text-sm px-3 py-1.5 transition-colors rounded-full hover:bg-white/5 flex items-center gap-1"
              >
                Contact us
                <ArrowRight size={13} />
              </a>
            </div>

            {/* 移动端：汉堡图标 */}
            <button
              className="lg:hidden text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* 移动端展开菜单 */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden max-w-7xl mx-auto mt-3 border border-gray-700 rounded-2xl p-3 flex flex-col gap-1 bg-black/70 backdrop-blur-md"
            >
              {[...NAV_LINKS, "Contact us"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/80 hover:text-white text-sm py-2.5 px-4 hover:bg-white/10 rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </motion.div>
          )}
        </nav>

        {/* ════════════════════════════════════════════════════════════════
            顶部双列说明文字
        ════════════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            We deliver transformative programs that empower emerging product designers with
            cutting-edge expertise and vision to thrive globally.
          </p>
          <p className="text-white/80 text-sm md:text-base lg:text-right leading-relaxed">
            8000+ Talented Designers Launched !
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            Hero 中心区域：标签 + 大标题 + CTA（左对齐）
        ════════════════════════════════════════════════════════════════ */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col items-start gap-4 md:gap-6">

          {/* 小号标签 */}
          <p className="text-white/80 text-xs md:text-sm tracking-tight uppercase">
            Seats for Next Program Opening Soon
          </p>

          {/* 主标题：两行，行高 0.85，紧字距，左对齐 */}
          <div
            className="flex flex-col items-start"
            style={{ lineHeight: 0.85, letterSpacing: "-0.04em" }}
          >
            {/* 第一行：Become（纯白，font-medium）*/}
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-white">
              Become
            </span>

            {/* 第二行：Product Leader.（framer-motion 扫光渐变）*/}
            <ShinyText
              text="Product Leader."
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium"
            />
          </div>

          {/* CTA 按钮：黑底圆角，箭头 hover 右移 */}
          <motion.button
            className="group flex items-center gap-3 bg-black hover:bg-gray-900 text-white rounded-full px-6 md:px-8 py-3 md:py-4 text-sm font-medium transition-colors border border-white/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Apply for Next Enrollment
            <span className="group-hover:translate-x-1 transition-transform inline-flex">
              <ArrowRight size={16} />
            </span>
          </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}