import { type ReactNode, useRef, useState, useCallback, type ElementType } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── FadeIn ─── */
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
  style,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Magnet ─── */
interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
  activeTransition?: string;
  inactiveTransition?: string;
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = "",
  style,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < padding) {
        setIsActive(true);
        setPos({ x: dx / strength, y: dy / strength });
      } else {
        setIsActive(false);
        setPos({ x: 0, y: 0 });
      }
    },
    [padding, strength],
  );

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setPos({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transform: "translate3d(" + pos.x + "px, " + pos.y + "px, 0)",
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

/* ─── ContactButton ─── */
export function ContactButton({
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href="#"
      className={"inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest " + className}
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
        outline: "2px solid white",
        outlineOffset: "-3px",
        padding: "clamp(0.75rem, 1.5vw, 1rem) clamp(2rem, 3.5vw, 3rem)",
        fontSize: "clamp(0.7rem, 1vw, 1rem)",
      }}
      {...props}
    >
      Contact Me
    </a>
  );
}

/* ─── LiveProjectButton ─── */
export function LiveProjectButton({
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href="#"
      className={"inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-all duration-200 " + className}
      style={{
        padding: "clamp(0.6rem, 1vw, 0.875rem) clamp(1.5rem, 2.5vw, 2.5rem)",
        fontSize: "clamp(0.75rem, 1vw, 1rem)",
      }}
      {...props}
    >
      Live Project
    </a>
  );
}

/* ─── CharSpan: single character with scroll-driven opacity ─── */
function CharSpan({ char, progressRef, index, total }: { char: string; progressRef: { current: number }; index: number; total: number }) {
  const start = index / total;
  const end = (index + 1) / total;
  const display = char === " " ? "\u00A0" : char;
  return (
    <span className="relative inline">
      <span className="invisible">{display}</span>
      <motion.span className="absolute inset-0" initial={{ opacity: 0.2 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "50px" }}>{display}</motion.span>
    </span>
  );
}

/* ─── AnimatedText ─── */
interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedText({ text, className = "", style }: AnimatedTextProps) {
  const chars = text.split("");
  // Simple scroll-reveal using whileInView with stagger
  return (
    <p className={className} style={style}>
      {chars.map((char, i) => (
        <span key={i} className="relative inline">
          <span className="invisible">{char === " " ? "\u00A0" : char}</span>
          <motion.span
            className="absolute inset-0"
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ delay: i * 0.015, duration: 0.3 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </p>
  );
}
