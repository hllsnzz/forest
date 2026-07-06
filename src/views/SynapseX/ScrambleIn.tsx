/**
 * ScrambleIn —— 入场文字乱码揭示动画
 *
 * 原理：
 * 1. 组件触发后，以 25ms 为间隔循环执行
 * 2. 每帧从左侧开始"揭示"约 0.5 个字符（revealCursor 向右推进）
 * 3. 已揭示的区域显示正确文字
 * 4. 未揭示但靠前的字符显示随机字符（最多 3 个），再往前是空白
 * 5. 空格始终保持为空格
 * 6. 触发前渲染 &nbsp; 占位
 */
import { useEffect, useState, useRef } from "react";

// 乱码用到的字符集
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

interface ScrambleInProps {
  text: string;
  delay?: number;       // 延迟多少毫秒后开始
  triggered: boolean;   // 是否触发动画
}

export default function ScrambleIn({ text, delay = 0, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState("");       // 当前显示的文字
  const [started, setStarted] = useState(false);      // 是否已开始动画
  const revealRef = useRef(0);        // 已揭示到的字符位置
  const frameRef = useRef(0);         // 累计帧数
  const intervalRef = useRef(0);      // setInterval ID

  useEffect(() => {
    // 未触发时显示占位空格
    if (!triggered) {
      setDisplay("");
      return;
    }

    // 延迟 delay 毫秒后开始动画
    const timer = setTimeout(() => {
      setStarted(true);

      intervalRef.current = window.setInterval(() => {
        frameRef.current++;
        // 每帧揭示 0.5 个字符（即每 2 帧揭示 1 个字符）
        revealRef.current = Math.floor(frameRef.current * 0.5);
        if (revealRef.current > text.length) {
          clearInterval(intervalRef.current);
          setDisplay(text); // 全部揭示完毕
          return;
        }

        // 逐字符构建显示内容
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            result += " "; // 空格始终不动
          } else if (i < revealRef.current) {
            result += text[i]; // 已揭示的区域：显示正确字符
          } else if (i < revealRef.current + 3) {
            // 未揭示但靠近揭示位置的 3 个字符：随机乱码
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
            // 更远的字符：空白
            result += "";
          }
        }
        setDisplay(result);
      }, 25);
    }, delay);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalRef.current);
    };
  }, [triggered, delay, text]);

  // 未触发 → 占位空格
  if (!triggered && !started) {
    return <span>&nbsp;</span>;
  }

  return <span>{display || "\u00A0"}</span>;
}