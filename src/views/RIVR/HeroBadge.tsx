/**
 * HeroBadge —— 英雄区顶部的磨砂玻璃胶囊标签
 * 显示 Sparkles 图标 + "Fluid Staking" 文字
 */
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/20 mx-auto mb-3 w-fit"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Sparkles className="w-4 h-4" style={{ color: "rgba(30,50,90,0.8)" }} />
      <span className="text-[14px] font-normal" style={{ color: "rgba(30,50,90,0.9)" }}>
        Fluid Staking
      </span>
    </motion.div>
  );
}