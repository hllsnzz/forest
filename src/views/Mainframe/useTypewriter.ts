/**
 * useTypewriter —— 打字机效果 Hook
 *
 * 原理：给定一段文字，每隔 speed 毫秒多显示一个字符，
 * 直到全部显示完毕。返回 { displayed, done }。
 */
import { useState, useEffect } from "react";

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 延迟 startDelay 毫秒后开始打字
    const delayTimer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        index++;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay]);

  return { displayed, done };
}