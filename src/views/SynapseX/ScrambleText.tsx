/**
 * ScrambleText —— 悬停驱动的文字乱码效果
 *
 * 原理：
 * - 鼠标移入：所有字符先变成随机乱码，然后从左到右逐帧揭示（每 4 帧揭示 1 个字符）
 * - 鼠标移出：立即恢复为原始文字
 */
import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export default function ScrambleText({ text, isHovered, className = "" }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const revealRef = useRef(0);
  const frameRef = useRef(0);
  const intervalRef = useRef(0);

  useEffect(() => {
    if (isHovered) {
      // 鼠标移入：清除之前的定时器，重新开始
      clearInterval(intervalRef.current);
      revealRef.current = 0;
      frameRef.current = 0;

      intervalRef.current = window.setInterval(() => {
        frameRef.current++;
        // 每 4 帧揭示 1 个字符
        revealRef.current = Math.floor(frameRef.current / 4);
        if (revealRef.current > text.length) {
          clearInterval(intervalRef.current);
          setDisplay(text);
          return;
        }

        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            result += " ";
          } else if (i < revealRef.current) {
            result += text[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(result);
      }, 25);
    } else {
      // 鼠标移出：立即恢复原样
      clearInterval(intervalRef.current);
      setDisplay(text);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, text]);

  return <span className={className}>{display}</span>;
}