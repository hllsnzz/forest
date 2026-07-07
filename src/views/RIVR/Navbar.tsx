/**
 * Navbar —— 顶部导航栏
 * 居中链接（Ecosystem、Economics、Developers、Governance），右侧"Book Demo"按钮
 */
import { motion } from "framer-motion";
import { ChevronRight, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Ecosystem", hasDropdown: false },
  { label: "Economics", hasDropdown: true },
  { label: "Developers", hasDropdown: false },
  { label: "Governance", hasDropdown: true },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-10 w-full relative z-10">
      {/* 左侧空白占位，使菜单居中 */}
      <div className="flex-1 hidden md:block" />

      {/* 桌面端菜单 */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-normal" style={{ color: "rgb(45,45,45)" }}>
        {NAV_ITEMS.map((item) => (
          <li
            key={item.label}
            className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group"
          >
            {item.label}
            {item.hasDropdown && (
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </li>
        ))}
      </ul>

      {/* 移动端 Logo */}
      <div className="md:hidden">
        <span className="font-regular tracking-tighter text-xl" style={{ color: "rgba(30,50,90,0.9)" }}>
          RIVR
        </span>
      </div>

      {/* 右侧按钮 */}
      <div className="flex-1 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 hover:opacity-100 transition-colors group"
          style={{ background: "rgba(30,50,90,0.8)", color: "white" }}
        >
          <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="text-xs md:text-sm font-normal">Book Demo</span>
        </motion.button>
      </div>
    </nav>
  );
}