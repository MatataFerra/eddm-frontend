import { cyrb53, mulberry32, normalizeWord } from "@/lib/text-highlighter";
import { useMemo } from "react";
import { FancyHighlightSpan } from "@/components/blocks/articles/text-render/fancy-highlight";

type HighlighterProps = {
  text: string;
  highlightRatio?: number;
  blacklist?: string[];
  whitelist?: string[];
};

export function RandomizedTextHighlighter({
  text,
  highlightRatio = 0.2,
  blacklist = [],
  whitelist = [],
}: HighlighterProps) {
  const processedWords = useMemo(() => {
    if (!text.trim()) return text;

    const words = text.split(" ");
    const totalWords = words.length;
    const indicesToHighlight = new Set<number>();

    const blacklistSet = new Set(blacklist.map(normalizeWord));
    const whitelistSet = new Set(whitelist.map(normalizeWord));

    words.forEach((word, index) => {
      const clean = normalizeWord(word);
      if (whitelistSet.has(clean)) {
        indicesToHighlight.add(index);
      }
    });

    const idealCount = totalWords < 3 ? 1 : Math.floor(totalWords * highlightRatio);

    if (indicesToHighlight.size < idealCount) {
      // Configurar RNG Determinista
      const seed = cyrb53(text);
      const seededRandom = mulberry32(seed);

      let attempts = 0;
      const maxAttempts = totalWords * 3;

      while (indicesToHighlight.size < idealCount && attempts < maxAttempts) {
        const randomIndex = Math.floor(seededRandom() * totalWords);
        const candidateWord = normalizeWord(words[randomIndex]);

        // CONDICIONES PARA AGREGAR AL AZAR:
        // 1. No está ya resaltada
        // 2. No está en la Blacklist
        // 3. No es una palabra vacía (por si hay dobles espacios)
        if (
          !indicesToHighlight.has(randomIndex) &&
          !blacklistSet.has(candidateWord) &&
          candidateWord.length > 0
        ) {
          indicesToHighlight.add(randomIndex);
        }
        attempts++;
      }
    }

    return words.map((word, index) => {
      const suffix = index < words.length - 1 ? " " : "";
      const content = (
        <>
          {word}
          {suffix}
        </>
      );

      if (indicesToHighlight.has(index)) {
        return <FancyHighlightSpan key={index}>{content}</FancyHighlightSpan>;
      }

      return <span key={index}>{content}</span>;
    });
  }, [text, highlightRatio, blacklist, whitelist]);

  return <>{processedWords}</>;
}
