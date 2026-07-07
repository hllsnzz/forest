/**
 * RIVR 主页面 —— DeFi 仪表盘 Hero 部分
 *
 * 风格：玻璃拟态（Glassmorphism），浅灰背景 #f0f0f0
 * 布局：视频背景全屏卡片 + 顶部导航 + 中央标题 + 左下卡片 + 右下切角面板
 * 动画：Framer Motion 淡入/缩放/滑动
 */
import { motion } from "framer-motion";
import heroVid from "../../assets/images/rivr/hero.mp4";
import "./rivr.css";
import Navbar from "./Navbar";
import HeroBadge from "./HeroBadge";
import BottomLeftCard from "./BottomLeftCard";
import BottomRightCorner from "./BottomRightCorner";

export default function RIVR() {
  return (
    <main className="min-h-screen" style={{ background: "#f0f0f0" }}>
      {/* 外层容器：内边距产生"内嵌"效果 */}
      <div className="w-full h-screen flex items-center justify-center p-3 md:p-5" style={{ background: "#f0f0f0" }}>
        {/* 内层圆角卡片容器 */}
        <section
          className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          {/* 视频背景 */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0"
          >
            <source src={heroVid} type="video/mp4" />
          </video>

          {/* 内容层 */}
          <div className="relative z-10 w-full h-full flex flex-col items-center">
            {/* 导航栏 */}
            <Navbar />

            {/* 中央标题区域 */}
            <div className="w-full flex flex-col items-center pt-8 px-6 text-center max-w-4xl">
              <HeroBadge />

              {/* 主标题 */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal mb-2 tracking-tight leading-[1.05]"
                style={{ color: "#5E6470" }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Fluid Asset Streams
              </motion.h1>

              {/* 副标题 */}
              <motion.p
                className="text-sm sm:text-base md:text-lg opacity-80 leading-relaxed max-w-xl font-normal"
                style={{ color: "#5E6470" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Access Smart Vaults, stake RIVR, NFTs, transform rigid holdings into liquid cash instantly.
              </motion.p>
            </div>

            {/* 左下卡片 */}
            <BottomLeftCard />

            {/* 右下切角面板 */}
            <BottomRightCorner />
          </div>
        </section>
      </div>
    </main>
  );
}