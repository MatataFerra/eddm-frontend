import { useEffect, useEffectEvent, useRef, useState } from "react";

const FONT_SIZE_CONFIG = {
  MIN: 14,
  MAX: 48,
  PADDING_BUFFER: 48,
} as const;

type ResponsiveFontSizeOptions = {
  minFontSize?: number;
  maxFontSize?: number;
  paddingBuffer?: number;
};

export function useResponsiveFontSize(text: string, options: ResponsiveFontSizeOptions = {}) {
  const {
    minFontSize = FONT_SIZE_CONFIG.MIN,
    maxFontSize = FONT_SIZE_CONFIG.MAX,
    paddingBuffer = FONT_SIZE_CONFIG.PADDING_BUFFER,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isReady, setIsReady] = useState(false);

  const adjustFontSize = useEffectEvent(() => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (!container || !textElement) return;

    setIsReady(false);

    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;

    const availableHeight = containerHeight - paddingBuffer;

    let min = minFontSize;
    let max = maxFontSize;
    let optimal = min;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      textElement.style.fontSize = `${mid}px`;

      const fitsHeight = textElement.scrollHeight <= availableHeight;
      const fitsWidth = textElement.scrollWidth <= containerWidth;

      if (fitsHeight && fitsWidth) {
        optimal = mid;
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    textElement.style.fontSize = `${optimal}px`;
    setIsReady(true);
  });

  useEffect(() => {
    adjustFontSize();

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(adjustFontSize);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [text]);

  return { containerRef, textRef, isReady };
}
