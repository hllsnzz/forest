import { useEffect, useRef, useState } from "react";

// ===== 本地图片导入（Vite 会自动处理 hash 和打包）=====
import bg1 from "../../assets/images/lithos/bg1.webp"; // 底层背景：岩石纹理
import bg2 from "../../assets/images/lithos/bg2.webp"; // 显影层背景：化石纹理
import "./lithos.css";

// ===== 常量 =====
const SPOTLIGHT_R = 260; // 聚光斑的半径（像素）

// 导航栏链接列表
const NAV_LINKS = ["Course", "Field Guides", "Geology", "Plans", "Live Tour"];

/**
 * Logo 组件 —— 左上角的菱形 SVG + 品牌名称
 */
function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* 菱形 SVG 图标，ViewBox 256x256，两个菱形拼成立方体错觉 */}
      <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff">
        <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
      </svg>
      <span className="text-white text-2xl font-playfair italic">Lithos</span>
    </div>
  );
}

/**
 * RevealLayer 组件 —— 核心交互：鼠标聚光显影
 *
 * 原理：
 * 1. 一个隐藏的 <canvas> 实时绘制径向渐变（从鼠标位置向外扩散）
 * 2. 将 canvas 转成 dataURL，作为 maskImage 应用到显影层 <div>
 * 3. 显影层的背景图片（bg2）只有在遮罩的白色区域才可见
 * 4. 鼠标移动时，白色圆形区域跟随，形成"手电筒照出第二张图"的效果
 */
interface RevealLayerProps {
  image: string;    // 显影层的背景图片路径
  cursorX: number;  // 鼠标平滑后的 X 坐标
  cursorY: number;  // 鼠标平滑后的 Y 坐标
}

function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);  // 隐藏 canvas，用来画渐变
  const revealRef = useRef<HTMLDivElement>(null);      // 显影层 div，应用 mask

  // 组件挂载 & 窗口大小变化时，调整 canvas 尺寸
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;   // canvas 宽度 = 视口宽度
      canvas.height = window.innerHeight; // canvas 高度 = 视口高度
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // 每次 cursorX/cursorY 变化时，重新绘制遮罩
  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. 清除上一帧的绘制内容
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 创建径向渐变：从鼠标位置（内圈）向外扩散
    const gradient = ctx.createRadialGradient(
      cursorX, cursorY, 0,             // 内圈：鼠标位置，半径 0
      cursorX, cursorY, SPOTLIGHT_R    // 外圈：半径 260px
    );
    // 渐变色阶：中心纯白 → 边缘完全透明
    gradient.addColorStop(0, "rgba(255,255,255,1)");     // 中心：完全不透明
    gradient.addColorStop(0.4, "rgba(255,255,255,1)");   // 40% 半径内：全白
    gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");// 60%：开始淡出
    gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
    gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");     // 边缘：完全透明

    // 3. 在鼠标位置画一个圆形，用渐变填充
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    // 4. 把 canvas 转成图片 dataURL，作为遮罩应用到显影层
    const dataUrl = canvas.toDataURL();
    reveal.style.maskImage = `url(${dataUrl})`;            // 标准 mask
    reveal.style.webkitMaskImage = `url(${dataUrl})`;     // Safari/WebKit 内核兼容
    reveal.style.maskSize = "100% 100%";
    reveal.style.webkitMaskSize = "100% 100%";
  }, [cursorX, cursorY]); // 鼠标位置变化时重新执行

  return (
    <>
      {/* 隐藏的 canvas，只在内存中绘制，不显示在页面上 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: "none" }}
      />
      {/* 显影层 div：背景是 bg2，通过 maskImage 控制哪些区域可见 */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}

/**
 * Lithos 主页面组件
 *
 * 布局层次（从下到上，按 z-index）：
 *   z-10: 底层背景图（bg1）
 *   z-30: 显影层（bg2 + canvas 遮罩）
 *   z-50: 标题文字 + 底部段落 + 按钮
 *   z-100: 固定导航栏
 */
export default function Lithos() {
  // ---------- 鼠标跟踪 + 平滑 ----------
  const mouseRef = useRef({ x: 0, y: 0 });       // 鼠标原始位置（实时更新）
  const smoothRef = useRef({ x: -999, y: -999 }); // 平滑后的位置（lerp 插值）
  const rafRef = useRef(0);                        // requestAnimationFrame 的 ID
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 }); // 驱动 UI 更新的状态

  useEffect(() => {
    // 监听鼠标移动，将原始坐标存入 mouseRef
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // 动画循环：用 lerp（线性插值）实现平滑跟随
    // 公式: smooth += (target - smooth) * 0.1
    // 每次向目标位置靠近 10%，产生"滞后"的弹性感
    const animate = () => {
      const smooth = smoothRef.current;
      const mouse = mouseRef.current;
      smooth.x += (mouse.x - smooth.x) * 0.1;  // X 轴平滑
      smooth.y += (mouse.y - smooth.y) * 0.1;  // Y 轴平滑
      setCursorPos({ x: smooth.x, y: smooth.y }); // 触发 React 重新渲染
      rafRef.current = requestAnimationFrame(animate); // 下一帧继续
    };
    rafRef.current = requestAnimationFrame(animate);

    // 组件卸载时清理
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    // ===== 外层容器 =====
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ===== 固定导航栏（始终悬浮在顶部，z-100）===== */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        {/* 左侧：Logo */}
        <Logo />

        {/* 中间：导航药丸（桌面端显示） */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link}
              // 第一个按钮（Course）高亮白色，其余半透明
              className={
                i === 0
                  ? "px-4 py-1.5 rounded-full text-sm font-medium text-white"
                  : "px-4 py-1.5 rounded-full text-sm font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              }
            >
              {link}
            </button>
          ))}
        </div>

        {/* 右侧：注册按钮（桌面端显示） */}
        <button className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
          Sign Up
        </button>

        {/* 移动端：汉堡菜单图标（md 以下显示） */}
        <button className="md:hidden text-white text-sm font-medium" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {/* ===== 英雄区（全屏高度，100dvh 适配移动端浏览器）===== */}
      <section
        className="relative w-full overflow-hidden bg-black"
        style={{ height: "100dvh" }}
      >
        {/* 底层背景图：岩石纹理，带 hero-zoom 缩放动画（1.12→1） */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom z-10"
          style={{ backgroundImage: `url(${bg1})` }}
        />

        {/* 显影层：化石纹理，通过鼠标遮罩控制可见区域 */}
        <RevealLayer image={bg2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        {/* ===== 标题文字（居中，z-50，pointer-events-none 让鼠标穿透）===== */}
        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <h1 className="text-white leading-[0.95]">
            {/* 第一行：Playfair Display 斜体，"Layers hold" */}
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: "-0.05em", animationDelay: "0.25s" }}
            >
              Layers hold
            </span>
            {/* 第二行：正常字重，"tales of time"，向上紧凑 -mt-1 */}
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: "-0.08em", animationDelay: "0.42s" }}
            >
              tales of time
            </span>
          </h1>
        </div>

        {/* ===== 左下角段落（sm 及以上显示）===== */}
        <div className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade" style={{ animationDelay: "0.7s" }}>
          <p className="text-sm text-white/80 leading-relaxed">
            Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        {/* ===== 右下角：描述 + CTA 按钮 ===== */}
        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: "0.85s" }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.
          </p>
          {/* 橙色主按钮 */}
          <button
            className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg"
            style={{ boxShadow: "none" }}
          >
            Start Digging
          </button>
        </div>
      </section>
    </div>
  );
}