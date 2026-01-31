"use client";

import {
  GlowCard,
  GlowCardSurface,
  GlowCardImage,
  GlowCardTitle,
  GlowCardContent,
} from "@/components/ui/styled-cards/glow-card";
import { HoverBoxShadowGlow } from "@/components/ui/styled-cards/hover-glow";
import { ENDPOINTS } from "@/lib/constants";
import type { BentoConfig } from "@/lib/get-bento-config";
import { usePaletteColors } from "@/lib/hooks/use-pallette-color";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { cn } from "@/lib/utils";
import { animate, useMotionValue } from "motion/react";

import { useRouter } from "next/navigation";

type ListItemProps = {
  tale: ContentNavigate;
  config: BentoConfig;
  index: number;
};

export function ListItem({ tale: { slug, title, header }, index, config }: ListItemProps) {
  const router = useRouter();
  const blur = useMotionValue("blur(2px)");

  const handleHoverStart = () => {
    animate(blur, "blur(0px)", { duration: 0.5, ease: "easeInOut" });
  };

  const handleHoverEnd = () => {
    animate(blur, "blur(2px)", { duration: 0.5, ease: "easeInOut" });
  };

  const { color, gradients } = usePaletteColors(index);

  return (
    <GlowCard
      data-slot={`list-item-${index}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => router.push(ENDPOINTS.TALE(slug))}
      className={cn("w-full cursor-pointer group", config.span)}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}>
      <GlowCardSurface className="h-full" gradient={gradients}>
        <HoverBoxShadowGlow color={color} className="rounded-2xl sm:rounded-3xl" />
        <GlowCardContent className="h-full">
          <GlowCardTitle className="p-4 text-3xl md:text-5xl wrap-break-words">
            {title}
          </GlowCardTitle>
        </GlowCardContent>
        <div className={cn("absolute w-full overflow-hidden rounded-t-2xl h-full inset-0 -z-10")}>
          <GlowCardImage
            src={header?.url || ""}
            alt={title}
            blur={blur}
            className="size-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
            placement="center"
          />
        </div>
      </GlowCardSurface>
    </GlowCard>
  );
}
