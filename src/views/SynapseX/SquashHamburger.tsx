/**
 * SquashHamburger —— 带动画的汉堡菜单按钮
 *
 * 三根横线，点击后：
 * - 上横线：旋转 45° + 向下平移，形成"X"的左上→右下斜线
 * - 中横线：淡出 + 缩小
 * - 下横线：旋转 -45° + 向上平移，形成"X"的左下→右上斜线
 * 使用 Framer Motion 的 spring 动画（刚度 300，阻尼 20）产生弹性感
 */
import { motion, type Transition } from "framer-motion";

interface SquashHamburgerProps {
  open: boolean;
  onToggle: () => void;
}

// Spring 过渡配置常量，避免类型推断丢失
const springTransition: Transition = { type: "spring", stiffness: 300, damping: 20 };

export default function SquashHamburger({ open, onToggle }: SquashHamburgerProps) {
  return (
    <button
      onClick={onToggle}
      className="relative z-50 flex items-center justify-center cursor-pointer"
      style={{ width: 18, height: 12 }}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      {/* 上横线：打开时旋转 +45° 并下移到中心 */}
      <motion.span
        className="absolute left-0 w-full bg-white"
        style={{ height: 1.5, top: 0, borderRadius: 1, transformOrigin: "center" }}
        animate={open ? { rotate: 45, y: 5.25, transition: springTransition } : { rotate: 0, y: 0, transition: springTransition }}
      />
      {/* 中横线：打开时淡出 + 缩小 */}
      <motion.span
        className="absolute left-0 w-full bg-white"
        style={{ height: 1.5, top: "50%", borderRadius: 1, transformOrigin: "center", translateY: "-50%" }}
        animate={open ? { opacity: 0, scaleX: 0, transition: { duration: 0.2 } } : { opacity: 1, scaleX: 1, transition: { duration: 0.3, delay: 0.15 } }}
      />
      {/* 下横线：打开时旋转 -45° 并上移到中心 */}
      <motion.span
        className="absolute left-0 w-full bg-white"
        style={{ height: 1.5, top: "100%", borderRadius: 1, transformOrigin: "center", translateY: "-100%" }}
        animate={open ? { rotate: -45, y: -5.25, transition: springTransition } : { rotate: 0, y: 0, transition: springTransition }}
      />
    </button>
  );
}