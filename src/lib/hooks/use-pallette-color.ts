import { useMemo } from "react";
import { GLOW_CARD_STYLES } from "@/lib/glow-styles";

type GlowTheme = {
  [K in keyof typeof GLOW_CARD_STYLES]: (typeof GLOW_CARD_STYLES)[K][number];
};

export function usePaletteColors(index: number): GlowTheme {
  const theme = useMemo(() => {
    const length = GLOW_CARD_STYLES.gradients.length;
    const safeIndex = index % length;

    return {
      gradients: GLOW_CARD_STYLES.gradients[safeIndex],
      accents: GLOW_CARD_STYLES.accents[safeIndex],
      glows: GLOW_CARD_STYLES.glows[safeIndex],
      bg: GLOW_CARD_STYLES.bg[safeIndex],
      color: GLOW_CARD_STYLES.color[safeIndex],
    };
  }, [index]);

  return theme;
}
