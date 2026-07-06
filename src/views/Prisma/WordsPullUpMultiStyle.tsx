/**
 * WordsPullUpMultiStyle —— 支持分段不同样式的逐词上拉动画
 * 接收 segments 数组，每段有 text + className，所有词保留所属段的样式。
 */
import { motion } from "framer-motion";
import { useRef } from "react";

interface Segment {
  text: string;
  className?: string;
}

interface Props {
  segments: Segment[];
  className?: string;
  delayEach?: number;
}

export default function WordsPullUpMultiStyle({ segments, className = "", delayEach = 0.08 }: Props) {
  const ref = useRef(null);
  const words: { text: string; cls: string }[] = [];
  for (const seg of segments) {
    for (const w of seg.text.split(" ")) {
      words.push({ text: w, cls: seg.className || "" });
    }
  }

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
          className={`inline-block mr-[0.3em] ${word.cls}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {word.text}
        </motion.span>
      ))}
    </motion.div>
  );
}