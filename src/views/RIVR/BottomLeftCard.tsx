/**
 * BottomLeftCard —— 左下角磨砂玻璃卡片
 * 显示 "5.2K Active Yielders" + "Join Discord" 按钮
 */
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function BottomLeftCard() {
  return (
    <motion.div
      className="absolute bottom-28 right-4 left-auto md:left-6 md:right-auto md:bottom-6 lg:bottom-10 lg:left-10 p-3 md:p-4 lg:p-5 rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[2.2rem] flex flex-col gap-2 lg:gap-3 min-w-[140px] md:min-w-[150px] lg:min-w-[180px] w-fit"
      style={{ background: "rgba(255,255,255,0.3)", backdropFilter: "blur(24px)" }}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* 数字 + 标签 */}
      <div>
        <p className="text-2xl md:text-3xl font-normal tracking-tight" style={{ color: "rgba(30,50,90,0.9)" }}>
          5.2K
        </p>
        <p className="text-[10px] md:text-[12px] font-normal uppercase tracking-wider" style={{ color: "rgba(30,50,90,0.6)" }}>
          Active Yielders
        </p>
      </div>

      {/* Join Discord 按钮 */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center bg-white rounded-full pl-1.5 pr-5 py-1.5 gap-2 hover:bg-white/90 transition-colors self-start group"
      >
        <div className="p-1 rounded-full flex items-center justify-center" style={{ background: "rgba(30,50,90,0.1)" }}>
          <ArrowUpRight className="w-4 h-4" style={{ color: "rgba(30,50,90,0.9)" }} />
        </div>
        <span className="text-[14px] font-normal" style={{ color: "rgba(30,50,90,0.9)" }}>
          Join Discord
        </span>
      </motion.button>
    </motion.div>
  );
}