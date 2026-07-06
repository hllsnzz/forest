/**
 * AnimatedLetter —— 逐字符滚动驱动的透明度动画
 * 原理：每个字符根据它在文本中的位置，
 * 在滚动进度 [charPos-0.1, charPos+0.05] 区间内 opacity 从 0.2 → 1，
 * 形成文字逐字显影效果。
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AnimatedLetter({ text }: { text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p ref={ref}>
      {chars.map((char, i) => {
        const charProgress = i / chars.length;
        return (
          <CharSpan
            key={i}
            scrollYProgress={scrollYProgress}
            start={Math.max(0, charProgress - 0.1)}
            end={Math.min(1, charProgress + 0.05)}
            char={char}
          />
        );
      })}
    </p>
  );
}

function CharSpan({ scrollYProgress, start, end, char }: {
  scrollYProgress: any;
  start: number;
  end: number;
  char: string;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}