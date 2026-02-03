"use client";

import { QuoteIcon } from "@/components/ui/quote-icon";
import { useResponsiveFontSize } from "@/lib/hooks/use-responsive-text";
import { SPANISH_COMMON_BLACKLIST } from "@/lib/text-highlighter";
import { RandomizedTextHighlighter } from "@/components/blocks/articles/text-render/text-highlighter";
import { cn } from "@/lib/utils";

type ResponsiveQuoteTextProps = {
  text: string;
  className?: string;
};

export function ResponsiveQuoteText({ text, className }: ResponsiveQuoteTextProps) {
  const { containerRef, textRef, isReady } = useResponsiveFontSize(text);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative size-full flex flex-col justify-center items-center p-6 md:p-8 overflow-hidden rounded-2xl",
        className,
      )}>
      <div className="self-start mb-2 shrink-0">
        <QuoteIcon />
      </div>

      <p
        ref={textRef}
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        className={cn("w-full text-balance leading-snug font-medium")}>
        <RandomizedTextHighlighter
          text={text}
          blacklist={SPANISH_COMMON_BLACKLIST}
          whitelist={["realidad", "introspección"]}
          highlightRatio={0.1}
        />
      </p>
    </div>
  );
}
