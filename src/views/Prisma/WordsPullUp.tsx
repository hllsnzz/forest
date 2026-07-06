/**
 * WordsPullUp —— 逐词上拉动画
 * 原理：将文本按空格拆分为词，每个词是一个 motion.span，
 * 进入视口时从 y:20 → y:0 恢复 opacity，以 0.08s 递增延迟。
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delayEach?: number;
}

export default function WordsPullUp({ text, className = "", showAsterisk = false, delayEach = 0.08 }: WordsPullUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: delayEach } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em] relative"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {word}
          {i === words.length - 1 && showAsterisk && (
            <sup className="absolute text-[0.31em]" style={{ top: "0.65em", right: "-0.3em" }}>*</sup>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}