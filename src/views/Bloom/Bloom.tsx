import { useEffect } from "react";
import {
  Sparkles,
  Download,
  Wand2,
  BookOpen,
  ArrowRight,
  Globe,
  Users,
  Camera,
  Menu,
} from "lucide-react";
import "./bloom.css";

// ─── 本地化资源（Vite 静态导入）───────────────────────────────────────────
// 背景视频：循环静音自动播放，全屏 object-cover
import bgVideo from "../../assets/images/bloom/bg-video.mp4";
// Logo SVG：白色八瓣花 + 中心圆
import logoSrc from "../../assets/images/bloom/logo.svg";

// ─── 字体样式快捷常量 ────────────────────────────────────────────────────
// Poppins：展示/正文字体（标题 font-weight: 500）
const POPPINS: React.CSSProperties = { fontFamily: "'Poppins', sans-serif" };
// Source Serif 4：仅用于标题内的斜体强调文字
const SERIF: React.CSSProperties = {
  fontFamily: "'Source Serif 4', serif",
  fontStyle: "italic",
};

// ─── Bloom 主页：AI 植物设计平台 ─────────────────────────────────────────
// 布局：全屏视频背景（z-0）+ 左右双列内容（z-10）
// 左列（52%）：毛玻璃强效面板 + 导航 + Hero + 底部引言
// 右列（48%，仅桌面）：社交栏 + 社区卡片 + 功能卡片组
export default function Bloom() {
  // ── 注入 Poppins + Source Serif 4 字体 ────────────────────────────────
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Source+Serif+4:ital@0;1&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-black"
      style={POPPINS}
    >
      {/* ── 背景视频（z-0）：循环、静音、全屏覆盖 ──────────────────────── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src={bgVideo}
      />

      {/* ── 轻微暗化叠层：提升文字对比度 ─────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/25" style={{ zIndex: 1 }} />

      {/* ── 主内容区（z-10）：左右双列 ────────────────────────────────────── */}
      <div className="relative flex min-h-screen" style={{ zIndex: 10 }}>
        {/* ════════════════════════════════════════════════════════════════
            左列（全宽 / 桌面 52%）：毛玻璃面板 + 导航 + Hero + 引言
        ════════════════════════════════════════════════════════════════ */}
        <div className="relative w-full lg:w-[52%] flex flex-col min-h-screen p-4 lg:p-6">
          {/* 毛玻璃强效背景面板（absolute，内缩 inset-4，内容悬浮于其上） */}
          <div
            className="liquid-glass-strong absolute inset-4 lg:inset-6 rounded-3xl"
            style={{ zIndex: 0 }}
          />

          {/* 面板内容（z-10，保证在玻璃层之上）*/}
          <div
            className="liquid-glass rounded-2xl relative flex flex-col min-h-full p-5 lg:p-8"
            style={{ zIndex: 10 }}
          >
            {/* ── 导航 ───────────────────────────────────────────────────── */}
            <nav className="flex items-center justify-between">
              {/* 左侧：Logo 图标 + 品牌名 */}
              <div className="flex items-center gap-2">
                <img src={logoSrc} alt="Bloom" width={32} height={32} />
                <span
                  className="text-white text-2xl tracking-tighter"
                  style={{ fontWeight: 600, ...POPPINS }}
                >
                  bloom
                </span>
              </div>
              {/* 右侧：Menu 按钮（轻量玻璃胶囊）*/}
              <button className="liquid-glass rounded-full flex items-center gap-2 px-4 py-2 text-white/80 text-sm hover:scale-105 active:scale-95 transition-transform">
                <Menu size={15} />
                <span>Menu</span>
              </button>
            </nav>

            {/* ── Hero 中心区域 ───────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-8">
              {/* 大 Logo */}
              <img src={logoSrc} alt="" width={80} height={80} />

              {/* 主标题：Poppins 正文 + Source Serif 4 斜体强调 */}
              <h1
                className="text-6xl lg:text-7xl text-white leading-[1.05]"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-0.05em",
                  ...POPPINS,
                }}
              >
                Innovating the
                <br />
                <span className="text-white">spirit of</span>{" "}
                <span
                  className="text-white/80"
                  style={{ ...SERIF, fontWeight: 500 }}
                >
                  bloom AI
                </span>{" "}
              </h1>

              {/* CTA 按钮：重量级玻璃效果，圆形胶囊 */}
              <button
                className="liquid-glass-strong rounded-full flex items-center gap-3 px-7 py-3.5 text-white text-base hover:scale-105 active:scale-95 transition-transform"
                style={{ fontWeight: 500 }}
              >
                Explore Now
                {/* 圆形图标容器 */}
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                  <Download size={14} />
                </span>
              </button>

              {/* 功能标签胶囊（轻量玻璃）*/}
              <div className="flex flex-wrap gap-3 justify-center">
                {["Artistic Gallery", "AI Generation", "3D Structures"].map(
                  (label) => (
                    <span
                      key={label}
                      className="liquid-glass rounded-full px-5 py-2 text-xs text-white/80"
                    >
                      {label}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* ── 底部引言区域 ─────────────────────────────────────────────── */}
            <div className="flex flex-col items-center gap-3">
              {/* 栏目标签 */}
              <span
                className="text-xs tracking-widest uppercase text-white/50"
                style={POPPINS}
              >
                VISIONARY DESIGN
              </span>

              {/* 引言正文：混合字体 */}
              <p
                className="text-white/80 text-center text-sm leading-relaxed"
                style={POPPINS}
              >
                "We imagined a realm <em style={SERIF}>with no ending.</em>"
              </p>

              {/* 作者署名 + 两侧横线 */}
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-white/30" />
                <span
                  className="text-xs tracking-widest uppercase text-white/50"
                  style={POPPINS}
                >
                  MARCUS AURELIO
                </span>
                <div className="h-px w-10 bg-white/30" />
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            右列（桌面 48%，移动端隐藏）
        ════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex lg:w-[48%] flex-col p-6 gap-4">
          {/* ── 顶部工具栏：社交图标 + 账户按钮 ──────────────────────────── */}
          <div className="flex items-center justify-between">
            {/* 社交图标胶囊（轻量玻璃）*/}
            <div className="liquid-glass rounded-full flex items-center gap-1 px-3 py-2">
              {[Globe, Users, Camera].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-white/80 transition-colors hover:scale-105"
                >
                  <Icon size={13} />
                </button>
              ))}
              <ArrowRight size={13} className="text-white/50 ml-1" />
            </div>

            {/* 右侧：Sparkles + Account 按钮 */}
            <div className="flex items-center gap-2">
              <button className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform">
                <Sparkles size={14} />
              </button>
              <button
                className="liquid-glass rounded-full px-5 py-2 text-white text-sm hover:scale-105 transition-transform"
                style={{ fontWeight: 500 }}
              >
                Account
              </button>
            </div>
          </div>

          {/* ── 社区卡片（轻量玻璃，固定宽度 w-56）────────────────────────── */}
          <div className="liquid-glass rounded-2xl p-5 w-56">
            <h3
              className="text-white text-sm mb-1.5"
              style={{ fontWeight: 500, ...POPPINS }}
            >
              Enter our ecosystem
            </h3>
            <p
              className="text-white/60 text-xs leading-relaxed"
              style={POPPINS}
            >
              Connect with creators and keep active with Bloom's modern
              AI-powered systems.
            </p>
          </div>

          {/* ── 底部功能卡片组（mt-auto 推到底部）──────────────────────────── */}
          {/* 外层：重量级玻璃圆角容器 */}
          <div className="mt-auto liquid-glass rounded-[2.5rem] p-4 flex flex-col gap-3">
            {/* 上方两张并排卡片 */}
            <div className="flex gap-3">
              {/* Processing 卡片 */}
              <div className="liquid-glass rounded-3xl flex-1 p-5">
                <Wand2 size={20} className="text-white/80 mb-3" />
                <h3
                  className="text-white text-sm"
                  style={{ fontWeight: 500, ...POPPINS }}
                >
                  Processing
                </h3>
                <p
                  className="text-white/60 text-xs mt-1 leading-relaxed"
                  style={POPPINS}
                >
                  High-end processing functions that bring floral beauty to form
                </p>
              </div>

              {/* Growth Archive 卡片 */}
              <div className="liquid-glass rounded-3xl flex-1 p-5">
                <BookOpen size={20} className="text-white/80 mb-3" />
                <h3
                  className="text-white text-sm"
                  style={{ fontWeight: 500, ...POPPINS }}
                >
                  Growth Archive
                </h3>
                <p
                  className="text-white/60 text-xs mt-1 leading-relaxed"
                  style={POPPINS}
                >
                  Set-up templates and choices for different plant varieties
                </p>
              </div>
            </div>

            {/* 下方宽卡片：植物特效说明 */}
            {/* hero-flowers.png 用渐变占位（无外链资源可用，设计层面替代）*/}
            <div className="liquid-glass rounded-3xl p-4 flex items-center gap-4">
              {/* 植物缩略图占位（渐变色块，实际部署时替换为真实图片）*/}
              <div
                className="w-24 h-16 rounded-xl flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)",
                }}
              />

              {/* 文字介绍 */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-white text-sm leading-tight"
                  style={{ fontWeight: 500, ...POPPINS }}
                >
                  Advanced Plant Sculpting
                </h3>
                <p
                  className="text-white/60 text-xs mt-1 leading-relaxed"
                  style={POPPINS}
                >
                  Modern 3D crafting assets that permit you to build very
                  complex and lifelike forms
                </p>
              </div>

              {/* + 按钮（轻量玻璃圆圈）*/}
              <button className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform flex-shrink-0 text-lg leading-none">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
