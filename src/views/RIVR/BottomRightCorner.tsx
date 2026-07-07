/**
 * BottomRightCorner —— 右下角镂空切角面板
 * 使用 SVG 实现与背景同色的交集遮罩，形成"挖空"效果
 * 内容：圆形图标 + "Documentation" + "Library →"
 */
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";

export default function BottomRightCorner() {
  return (
    <motion.div
      className="absolute bottom-0 right-0 p-3 pt-5 pl-8 sm:p-4 sm:pt-6 sm:pl-10 md:p-6 md:pt-8 md:pl-14 flex items-center gap-3 sm:gap-4 md:gap-6"
      style={{ background: "#f0f0f0", borderTopLeftRadius: "clamp(1.5rem, 4vw, 3.5rem)" }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* 顶部遮罩 SVG（补平上方圆角缺口） */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: "clamp(1.5rem, 4vw, 3.5rem)", height: "clamp(1.5rem, 4vw, 3.5rem)", transform: "translateY(-100%)" }}
      >
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#f0f0f0" />
        </svg>
      </div>

      {/* 左侧遮罩 SVG（补平左方圆角缺口） */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{ width: "clamp(1.5rem, 4vw, 3.5rem)", height: "clamp(1.5rem, 4vw, 3.5rem)", transform: "translateX(-100%)" }}
      >
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#f0f0f0" />
        </svg>
      </div>

      {/* 圆形图标 */}
      <div
        className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border"
        style={{ background: "rgba(30,50,90,0.05)", borderColor: "rgba(30,50,90,0.1)" }}
      >
        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" style={{ color: "rgba(30,50,90,0.8)" }} />
      </div>

      {/* 文字信息 */}
      <div>
        <p className="text-[16px] md:text-[20px] font-normal" style={{ color: "rgba(30,50,90,0.95)" }}>
          Documentation
        </p>
        <div
          className="flex items-center gap-1 cursor-pointer transition-colors"
          style={{ color: "rgba(30,50,90,0.6)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(30,50,90,0.8)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(30,50,90,0.6)"; }}
        >
          <span className="text-[12px] md:text-[15px] font-normal">Library</span>
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </div>
      </div>
    </motion.div>
  );
}