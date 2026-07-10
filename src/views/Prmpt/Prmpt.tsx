import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./prmpt.css";

// ─── 本地化静态资源（Vite 静态导入，自动处理 hash 指纹）────────────────────
// 视频：CloudFront 来源，已下载到 src/assets/images/prmpt/
import videoLeftSrc  from "../../assets/images/prmpt/video-left.mp4";
import videoRightSrc from "../../assets/images/prmpt/video-right.mp4";

// 画廊图片：higgs.ai webp 格式，已下载到 src/assets/images/prmpt/
import img01 from "../../assets/images/prmpt/01.webp";
import img02 from "../../assets/images/prmpt/02.webp";
import img03 from "../../assets/images/prmpt/03.webp";
import img04 from "../../assets/images/prmpt/04.webp";
import img05 from "../../assets/images/prmpt/05.webp";
import img06 from "../../assets/images/prmpt/06.webp";
import img07 from "../../assets/images/prmpt/07.webp";
import img08 from "../../assets/images/prmpt/08.webp";
import img09 from "../../assets/images/prmpt/09.webp";
import img10 from "../../assets/images/prmpt/10.webp";

// ─── 视频 / 图片路径常量 ─────────────────────────────────────────────────────
const LEFT_VIDEO  = videoLeftSrc;
const RIGHT_VIDEO = videoRightSrc;

// 10 张档案服装图片（按展示顺序）
const GALLERY_IMAGES = [img01, img02, img03, img04, img05, img06, img07, img08, img09, img10];

// 圆圈内符号随机切换列表（滚动时每 80ms 变化一次）
const SYMBOLS = ["8", "$", "^^", "%", "/"];

// ─── 散点网格布局算法 ──────────────────────────────────────────────────────────
// 每行 cols 格，只填充 1~2 个位置，其余为 -1（空占位）
// 公式：a = (r*2 + r%2) % cols；每 3 行额外放一张在 b = (a+2)%cols
function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let idx = 0;
  let r = 0;
  while (idx < count) {
    const row = new Array(cols).fill(-1) as number[];
    const a = (r * 2 + (r % 2)) % cols;
    if (idx < count) row[a] = idx++;
    if (r % 3 === 0) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      if (idx < count) row[b] = idx++;
    }
    rows.push(row);
    r++;
  }
  return rows;
}

// ─── 根据视口宽度确定列数 ─────────────────────────────────────────────────────
function getCols(w: number): number {
  if (w < 640) return 2;
  if (w < 1024) return 3;
  return 4;
}

// ─── 检测触屏设备（移动端走自动播放分支）────────────────────────────────────
function detectTouch(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

// ─── 响应式断点状态 ──────────────────────────────────────────────────────────
interface Viewport {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  w: number;
}

function getViewport(w: number): Viewport {
  return {
    isDesktop: w >= 1024,
    isTablet: w >= 640 && w < 1024,
    isMobile: w < 640,
    w,
  };
}

// ─── 通用 Inter Tight 字体样式 ───────────────────────────────────────────────
const IT: React.CSSProperties = { fontFamily: "'Inter Tight', sans-serif", fontWeight: 500 };
// exclusion 混合模式（让白色文字在亮/暗背景上均可见）
const EXCL = { mixBlendMode: "exclusion" as React.CSSProperties["mixBlendMode"] };

// ─── Prmpt 主组件 ─────────────────────────────────────────────────────────────
// 包含两个阶段：
//   Phase 1（scroll 0→vh）：全屏视频背景 + 黑色面板从底部滑入
//   Phase 2（scroll >vh）：黑色面板固定，内层画廊向上滚动
//   Outro（scroll > vh + maxScroll）：白色遮罩淡入，view 按钮弹出，产品信息上移
export default function Prmpt() {
  // ── DOM Refs ────────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);   // 滚动占位容器
  const panelRef     = useRef<HTMLDivElement>(null);   // 黑色画廊面板
  const wrapRef      = useRef<HTMLDivElement>(null);   // 面板内层包装
  const videoLRef    = useRef<HTMLVideoElement>(null); // 左视频
  const videoRRef    = useRef<HTMLVideoElement>(null); // 右视频
  const canvasRef    = useRef<HTMLDivElement>(null);   // 视频容器
  const cursorRef    = useRef<HTMLDivElement>(null);   // 自定义光标
  const overlayRef   = useRef<HTMLDivElement>(null);   // 白色遮罩
  const buyRef       = useRef<HTMLDivElement>(null);   // view 按钮
  const infoRef      = useRef<HTMLDivElement>(null);   // 产品信息
  const footerRef    = useRef<HTMLDivElement>(null);   // 页脚
  const symbolRef    = useRef<HTMLSpanElement>(null);  // 圆圈内符号

  // 画廊卡片 DOM，按 imgIndex 索引（跳过 -1 空格）
  const cardRefsRef = useRef<(HTMLDivElement | null)[]>(
    new Array(GALLERY_IMAGES.length).fill(null)
  );

  // ── 动画 / 交互状态 Refs（避免触发重渲染）──────────────────────────────────
  const rafRef         = useRef(0);
  const cursorXRef     = useRef(window.innerWidth / 2); // 光标 X，默认居中
  const activeSideRef  = useRef<"left" | "right">("right"); // 上次激活视频侧
  const lastSymbolRef  = useRef(0);                     // 节流计时器

  // ── State（只有需要触发重渲染的才放这里）──────────────────────────────────
  const [vp, setVp] = useState<Viewport>(() => getViewport(window.innerWidth));
  const [cols, setCols] = useState(() => getCols(window.innerWidth));
  const [layout, setLayout] = useState<number[][]>(() =>
    buildLayout(GALLERY_IMAGES.length, getCols(window.innerWidth))
  );
  // 两个视频都就绪后再显示容器（避免黑屏闪烁）
  const [videoReady, setVideoReady] = useState(false);

  // ── 注入 Inter Tight 字体 ──────────────────────────────────────────────────
  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // ── 进入页面重置滚动，离开时也重置 ─────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => { window.scrollTo(0, 0); };
  }, []);

  // ── 响应式：窗口 resize ────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setVp(getViewport(w));
      const c = getCols(w);
      setCols(c);
      setLayout(buildLayout(GALLERY_IMAGES.length, c));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── 动态计算滚动占位高度（layout 变化后等 DOM 稳定再算）────────────────────
  useEffect(() => {
    const update = () => {
      if (!wrapRef.current || !containerRef.current) return;
      const vh = window.innerHeight;
      const maxScroll = Math.max(0, wrapRef.current.scrollHeight - vh);
      containerRef.current.style.height = `${vh + maxScroll + 2 * vh}px`;
    };
    const id = setTimeout(update, 120);
    window.addEventListener("resize", update);
    return () => { clearTimeout(id); window.removeEventListener("resize", update); };
  }, [layout]);

  // ── 视频交互逻辑 ──────────────────────────────────────────────────────────
  useEffect(() => {
    const vl = videoLRef.current;
    const vr = videoRRef.current;
    if (!vl || !vr) return;

    // 两个视频均就绪后显示容器
    let readyCnt = 0;
    const onReady = () => { if (++readyCnt >= 2) setVideoReady(true); };
    vl.addEventListener("canplaythrough", onReady, { once: true });
    vr.addEventListener("canplaythrough", onReady, { once: true });

    const touch = detectTouch();

    if (!touch) {
      // ── 桌面：mousemove → cursorXRef，由 RAF 驱动 scrub ────────────────
      const onMove = (e: MouseEvent) => {
        cursorXRef.current = e.clientX;
        // 自定义光标跟随鼠标
        if (cursorRef.current) {
          cursorRef.current.style.left = `${e.clientX}px`;
          cursorRef.current.style.top  = `${e.clientY}px`;
        }
      };
      window.addEventListener("mousemove", onMove);
      return () => {
        window.removeEventListener("mousemove", onMove);
        vl.removeEventListener("canplaythrough", onReady);
        vr.removeEventListener("canplaythrough", onReady);
      };
    } else {
      // ── 移动端：左右视频交替自动播放，遵循 prefers-reduced-motion ──────
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        vl.style.display = "block";
        vr.style.display = "none";
        vl.play().catch(() => {});

        const onLEnd = () => {
          vl.style.display = "none";
          vr.style.display = "block";
          vr.currentTime = 0;
          vr.play().catch(() => {});
        };
        const onREnd = () => {
          vr.style.display = "none";
          vl.style.display = "block";
          vl.currentTime = 0;
          vl.play().catch(() => {});
        };
        vl.addEventListener("ended", onLEnd);
        vr.addEventListener("ended", onREnd);
        return () => {
          vl.removeEventListener("ended", onLEnd);
          vr.removeEventListener("ended", onREnd);
          vl.removeEventListener("canplaythrough", onReady);
          vr.removeEventListener("canplaythrough", onReady);
          vl.pause();
          vr.pause();
        };
      }
      return () => {
        vl.removeEventListener("canplaythrough", onReady);
        vr.removeEventListener("canplaythrough", onReady);
      };
    }
  }, []);

  // ── 主 RAF 循环：面板动画 + 卡片缩放 + Outro + 桌面视频 scrub ─────────────
  useEffect(() => {
    const touch = detectTouch();

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      const panel   = panelRef.current;
      const wrap    = wrapRef.current;
      const canvas  = canvasRef.current;
      const overlay = overlayRef.current;
      const buy     = buyRef.current;
      const info    = infoRef.current;
      const footer  = footerRef.current;

      if (!panel || !wrap) return;

      // 当前画廊内容高度 vs 视口高度的差值（= 可滚动量）
      const maxScroll = Math.max(0, wrap.scrollHeight - vh);

      // Phase 1：黑色面板从底部滑入
      // panelY 从 vh（完全在屏外）线性降至 0（覆盖全屏）
      panel.style.transform = `translateY(${Math.max(0, vh - scrollY)}px)`;

      // 视频容器：滚过 Hero 区域后隐藏，避免透过面板边缘泄露
      if (canvas) canvas.style.visibility = scrollY >= vh ? "hidden" : "visible";

      // Phase 2：面板锁定顶部，内层包装向上位移展示画廊
      wrap.style.transform = `translateY(${-Math.max(0, scrollY - vh)}px)`;

      // 圆圈符号节流随机化（每 80ms 换一个）
      if (symbolRef.current && scrollY > 0) {
        const now = performance.now();
        if (now - lastSymbolRef.current > 80) {
          lastSymbolRef.current = now;
          symbolRef.current.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        }
      }

      // 卡片缩放：getBoundingClientRect 已含面板 transform，直接用视口坐标
      // 进入：(vh - top) / (0.6*vh)，退出：bottom / (0.4*vh)，取最小值
      cardRefsRef.current.forEach((card) => {
        if (!card) return;
        const { top, bottom } = card.getBoundingClientRect();
        if (bottom <= 0 || top >= vh) { card.style.transform = "scale(0)"; return; }
        const enter = Math.min(1, (vh - top) / (vh * 0.6));
        const exit  = Math.min(1, bottom / (vh * 0.4));
        card.style.transform = `scale(${Math.max(0, Math.min(enter, exit))})`;
      });

      // Outro：scrollY 超过 (vh + maxScroll) 后触发收尾动效
      const outroProgress = Math.max(
        0,
        Math.min(1, (scrollY - vh - maxScroll) / (vh - 100))
      );
      if (overlay) overlay.style.opacity = String(outroProgress);
      if (buy)     buy.style.transform   = `scale(${outroProgress})`;
      if (footer)  footer.style.opacity  = String(outroProgress);
      if (info) {
        const offset = vw >= 1024 ? 166 : 132;
        info.style.transform = `translateY(${-offset * outroProgress}px)`;
      }

      // ── 桌面端视频 scrub（仅 Hero 阶段）──────────────────────────────────
      // 死区：center ± max(30, 5%vw)
      // 光标在左 → 显示右视频；光标在右 → 显示左视频
      // CRITICAL：只在 !video.seeking 时更新 currentTime，防止跳帧
      if (!touch && scrollY < vh) {
        const vl = videoLRef.current;
        const vr = videoRRef.current;
        if (!vl || !vr) return;

        const cx   = cursorXRef.current;
        const half = vw / 2;
        const dead = Math.max(30, vw * 0.05);
        const dist = cx - half;

        if (Math.abs(dist) <= dead) {
          // 死区：两视频 currentTime 保持 0
          if (!vl.seeking) vl.currentTime = 0;
          if (!vr.seeking) vr.currentTime = 0;
        } else if (dist < -dead) {
          // 光标在左侧：激活右视频
          if (activeSideRef.current !== "right") {
            activeSideRef.current = "right";
            vl.style.display = "none";
            vr.style.display = "block";
          }
          const prog = Math.min(1, (Math.abs(dist) - dead) / (half - dead));
          if (vr.duration && !vr.seeking) vr.currentTime = prog * vr.duration;
        } else {
          // 光标在右侧：激活左视频
          if (activeSideRef.current !== "left") {
            activeSideRef.current = "left";
            vr.style.display = "none";
            vl.style.display = "block";
          }
          const prog = Math.min(1, (dist - dead) / (half - dead));
          if (vl.duration && !vl.seeking) vl.currentTime = prog * vl.duration;
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── 解构响应式状态 ────────────────────────────────────────────────────────
  const { isDesktop, isTablet, isMobile } = vp;

  return (
    <>
      {/* ── 1A. 自定义光标（仅桌面，pointer-events-none 不干扰交互） ──────── */}
      {isDesktop && (
        <div
          ref={cursorRef}
          style={{
            position: "fixed",
            pointerEvents: "none",
            zIndex: 50,
            transform: "translate(-50%, -50%)",
            ...EXCL,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22.75" stroke="white" strokeWidth="2.5" />
            {/* 装饰性日式风格字符图案 */}
            <text x="24" y="30" textAnchor="middle" fill="white" fontSize="16" fontFamily="serif">✦</text>
          </svg>
        </div>
      )}

      {/* ── 滚动占位容器（relative，高度动态计算，初始 500vh） ─────────────── */}
      <div
        ref={containerRef}
        id="scroll-spacer"
        style={{
          position: "relative",
          userSelect: "none",
          background: "white",
          height: "500vh",
          cursor: isDesktop ? "none" : "default",
        }}
      >
        {/* ─── 1B. Logo（左上角，mix-blend-mode:exclusion 保证在亮暗背景均可见）*/}
        <motion.div
          style={{
            position: "fixed",
            pointerEvents: "none",
            zIndex: 20,
            ...EXCL,
            top:  isDesktop ? 32 : 16,
            left: isDesktop ? 32 : 16,
            width: isMobile ? 124 : isDesktop ? 355 : 266,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0 }}
        >
          {/* SVG wordmark：prmpt + 圆形 R 商标 */}
          <svg viewBox="0 0 355 110" fill="none" style={{ width: "100%", height: "auto" }}>
            <text
              x="0" y="92"
              style={{ ...IT, fontSize: "92px", letterSpacing: "-4px" }}
              fill="white"
            >
              prmpt
            </text>
            {/* 圆形 ® 商标，右上角 */}
            <g transform="translate(308, 4)">
              <circle cx="22" cy="22" r="20" stroke="white" strokeWidth="2" fill="none" />
              <text x="22" y="28" textAnchor="middle" fill="white" fontSize="15" fontFamily="sans-serif">R</text>
            </g>
          </svg>
        </motion.div>

        {/* ─── 1C. Caption（Logo 下方，技术说明文字作为设计语言的一部分）─── */}
        <motion.p
          style={{
            position: "fixed",
            pointerEvents: "none",
            zIndex: 20,
            ...EXCL,
            left: isDesktop ? 32 : 16,
            top:  isDesktop ? 244 : isTablet ? 180 : 118,
            width: isDesktop ? 692 : isTablet ? "calc(50vw - 48px)" : "calc(100vw - 32px)",
            ...IT,
            fontSize: 12,
            lineHeight: "140%",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            margin: 0,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        >
          When switching between videos near the center, do not reset currentTime
          to 0 abruptly. Add a small dead zone: if cursor is within +/-50px of
          center, keep both videos at currentTime = 0 and show whichever was last
          active.
        </motion.p>

        {/* ─── 1D. 顶部导航（右上角：ABOUT + 汉堡 + CART）──────────────────── */}
        <motion.div
          style={{
            position: "fixed",
            zIndex: 20,
            pointerEvents: "none",
            ...EXCL,
            top:   isDesktop ? 32 : 16,
            right: isDesktop ? 32 : 16,
            width: isDesktop ? 330 : "auto",
            height: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        >
          {/* ABOUT：仅桌面/平板显示 */}
          {!isMobile && (
            <span style={{ ...IT, fontSize: 15, textTransform: "uppercase", color: "white", letterSpacing: "-0.04em" }}>
              ABOUT
            </span>
          )}
          {/* 汉堡菜单 + 购物车 */}
          <div style={{ display: "flex", flexDirection: "row", gap: isDesktop ? 50 : 20, alignItems: "center" }}>
            <svg width={isDesktop ? 30 : 24} height={isDesktop ? 30 : 24} viewBox="0 0 40 40" fill="none">
              <path d="M0 14H40" stroke="white" strokeWidth="2.5" />
              <path d="M0 26H40" stroke="white" strokeWidth="2.5" />
            </svg>
            <span style={{ ...IT, fontSize: isDesktop ? 15 : 13, color: "white", letterSpacing: "-0.04em" }}>
              [ CART ]
            </span>
          </div>
        </motion.div>

        {/* ─── 1E. 产品信息（右下角，Outro 时向上位移）──────────────────────── */}
        <motion.div
          ref={infoRef}
          id="outro-info"
          data-outro-offset={isDesktop ? 166 : 132}
          style={{
            position: "fixed",
            pointerEvents: "none",
            zIndex: 20,
            ...EXCL,
            ...(isDesktop
              ? { right: 32, bottom: 80, width: 330 }
              : { left: 0, right: 0, bottom: 48 }),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
        >
          {/* 顶部：圆圈符号 + 收藏名 */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: isDesktop ? "100%" : 252,
            marginBottom: isDesktop ? 32 : 12,
          }}>
            {/* 动态符号圆圈 */}
            <div style={{
              position: "relative",
              width: isDesktop ? 30 : 20,
              height: isDesktop ? 30 : 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <circle cx="20" cy="20" r="18.75" stroke="white" strokeWidth={isDesktop ? 2.5 : 2} />
              </svg>
              <span
                ref={symbolRef}
                id="circle-symbol"
                style={{
                  ...IT,
                  fontSize: isDesktop ? 15 : 10,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "white",
                  position: "relative",
                  zIndex: 1,
                  lineHeight: 1,
                }}
              >
                8
              </span>
            </div>
            {/* 收藏名称 */}
            <div style={{
              ...IT,
              fontSize: isDesktop ? 30 : 20,
              lineHeight: "100%",
              textAlign: "center",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "white",
              marginTop: 8,
            }}>
              ARCHIVE COLLECTION<br />"PROMPT"
            </div>
          </div>
          {/* 价格 */}
          <div style={{
            ...IT,
            fontSize: isDesktop ? 80 : 60,
            lineHeight: "100%",
            textAlign: "center",
            letterSpacing: "-0.04em",
            color: "white",
          }}>
            $97,33
          </div>
        </motion.div>

        {/* ─── 1F. "view" 按钮（初始 scale(0)，Outro 时弹出）──────────────── */}
        <div
          ref={buyRef}
          id="outro-buy"
          style={{
            position: "fixed",
            pointerEvents: "none",
            zIndex: 20,
            ...EXCL,
            transformOrigin: "right bottom",
            transform: "scale(0)",
            background: "#fff",
            borderRadius: 1335,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...(isDesktop
              ? { right: 32, bottom: 32, width: 330, height: 174 }
              : { left: 16, right: 16, bottom: 60, height: 100 }),
          }}
        >
          <span style={{
            ...IT,
            fontSize: isDesktop ? 110 : 72,
            letterSpacing: "-0.04em",
            color: "#fff",
            ...EXCL,
          }}>
            view
          </span>
        </div>

        {/* ─── 1G. 视频容器（两个 video 叠加，切换 display 控制显示） ──────── */}
        <div
          ref={canvasRef}
          id="main-canvas"
          style={{
            position: "fixed",
            zIndex: 0,
            overflow: "hidden",
            pointerEvents: "none",
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.3s ease",
            ...(isDesktop
              ? { inset: 0, width: "100%", height: "100%" }
              : { left: 0, top: 220, width: "100vw", height: "calc(100vh - 220px)" }),
          }}
        >
          {/* 左视频（桌面：光标右侧触发；移动：轮播第一个） */}
          <video
            ref={videoLRef}
            muted
            playsInline
            preload="auto"
            src={LEFT_VIDEO}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "none" }}
          />
          {/* 右视频（默认显示） */}
          <video
            ref={videoRRef}
            muted
            playsInline
            preload="auto"
            src={RIGHT_VIDEO}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* ─── 1I. 白色遮罩（Outro 时淡入，z-index 在面板之上）────────────── */}
        <div
          ref={overlayRef}
          id="outro-overlay"
          style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 12, background: "#fff", opacity: 0 }}
        />

        {/* ─── 1J. 页脚（Outro 时淡入）───────────────────────────────────── */}
        <div
          ref={footerRef}
          id="outro-footer"
          style={{
            position: "fixed",
            pointerEvents: "none",
            left: 16,
            bottom: isDesktop ? 32 : 24,
            ...EXCL,
            opacity: 0,
            display: "flex",
            flexDirection: "row",
            gap: isDesktop ? 80 : undefined,
            justifyContent: isDesktop ? undefined : ("space-between" as React.CSSProperties["justifyContent"]),
            width: isDesktop ? undefined : "calc(100vw - 32px)",
          }}
        >
          {["PRMPT (R) 2026", "PRIVACY POLICY"].map((text) => (
            <span key={text} style={{ ...IT, fontSize: isDesktop ? 13 : 11, letterSpacing: "-0.02em", textTransform: "uppercase", color: "white" }}>
              {text}
            </span>
          ))}
        </div>

        {/* ─── Section 2: 黑色画廊面板（固定定位，通过 transform 滑入） ─────── */}
        {/* 初始：translateY(100vh)，滚动到 vh 时降至 translateY(0)  */}
        <div
          ref={panelRef}
          style={{
            position: "fixed",
            inset: 0,
            background: "black",
            zIndex: 10,
            transform: "translateY(100vh)",
            overflow: "hidden",
          }}
        >
          {/* 内层包装：Phase 2 时向上位移展示画廊内容 */}
          <div ref={wrapRef} style={{ width: "100%", paddingTop: "min(400px, 40vh)" }}>

            {/* 散点图片网格：repeat(cols, 1fr)，每格 aspect-ratio 2/3 */}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {layout.flatMap((row, rowIdx) =>
                row.map((imgIdx, colIdx) => (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    // 仅真实图片格注册 ref 和 bp-card 类
                    ref={imgIdx >= 0 ? (el) => { cardRefsRef.current[imgIdx] = el; } : undefined}
                    className={imgIdx >= 0 ? "bp-card" : undefined}
                    style={{
                      aspectRatio: "2/3",
                      overflow: "hidden",
                      background: "transparent",
                      // 初始缩放为 0，由 RAF 根据视口位置计算
                      transform: imgIdx >= 0 ? "scale(0)" : undefined,
                      // 左半格从右下角展开，右半格从左下角展开（视觉向内聚拢）
                      transformOrigin: imgIdx >= 0
                        ? colIdx < cols / 2 ? "right bottom" : "left bottom"
                        : undefined,
                    }}
                  >
                    {imgIdx >= 0 && (
                      <img
                        src={GALLERY_IMAGES[imgIdx]}
                        alt={`Archive ${imgIdx + 1}`}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* 底部填充：保证最后一张图片有足够滚动空间显示 */}
            <div style={{ height: "100vh" }} />
          </div>
        </div>
      </div>
    </>
  );
}
