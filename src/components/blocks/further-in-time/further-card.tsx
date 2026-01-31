"use client";

import {
  GlowCard,
  GlowCardContent,
  GlowCardFooter,
  GlowCardImage,
  GlowCardSurface,
} from "@/components/ui/styled-cards/glow-card";
import { HoverBoxShadowGlow } from "@/components/ui/styled-cards/hover-glow";
import { ENDPOINTS } from "@/lib/constants";
import { usePaletteColors } from "@/lib/hooks/use-pallette-color";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

type BentoConfig = ReturnType<typeof getBentoConfig>;

export function getBentoConfig(index: number) {
  const i = index % 10;

  switch (i) {
    case 0:
      return {
        span: "md:col-span-2 md:row-span-2",
        hasImage: true,
        isFeatured: true,
        placementImage: "center",
        aspect: "aspect-square",
      };
    case 1:
      return {
        span: "md:col-span-1 md:row-span-2",
        hasImage: true,
        isFeatured: false,
        placementImage: "side",
        aspect: "aspect-[9/16]",
      };
    case 5:
      return {
        span: "md:col-span-2 md:row-span-2",
        hasImage: true,
        isFeatured: false,
        placementImage: "side",
        aspect: "aspect-[2/1]",
      };
    case 4:
      return {
        span: "md:col-span-1 md:row-span-4",
        hasImage: true,
        isFeatured: false,
        placementImage: "center",
        aspect: "aspect-square",
      };
    case 3:
    case 7:
      return {
        span: "md:col-span-1 md:row-span-1",
        hasImage: true,
        isFeatured: false,
        placementImage: "side",
        aspect: "aspect-square",
      };
    default:
      return {
        span: "md:col-span-1 md:row-span-2",
        hasImage: true,
        isFeatured: false,
        placementImage: "side",
        aspect: "aspect-[4/3]",
      };
  }
}

export function PremiumMasonry({ articles: items }: { articles: ContentNavigate[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-3 md:gap-6 lg:gap-8 auto-rows-[minmax(180px,auto)] grid-flow-dense">
      {items.map((article, index) => {
        const config = getBentoConfig(index);

        return (
          <MasonryItemGlow
            key={`${article.slug}-${index}`}
            article={article}
            index={index}
            config={config}
          />
        );
      })}
    </div>
  );
}

function MasonryItemGlow({
  article,
  index,
  config,
}: {
  article: ContentNavigate;
  index: number;
  config: BentoConfig;
}) {
  const { push } = useRouter();
  const formatDate = (date: string | Date) =>
    new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(new Date(date));

  const { color, gradients } = usePaletteColors(index);

  return (
    <GlowCard
      data-slot={"further-card-" + String(Number(index))}
      onClick={() => push(ENDPOINTS.FURTHER_TIME_ARTICLE(article.slug))}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={cn("relative group h-full w-full", config.span)}>
      <GlowCardSurface gradient={gradients} className="h-full flex flex-col justify-between">
        <HoverBoxShadowGlow color={color} className="rounded-2xl sm:rounded-3xl" />

        {config.hasImage && article.header?.url ? (
          <div className={cn("absolute w-full overflow-hidden rounded-t-2xl h-full inset-0 z-0")}>
            <GlowCardImage
              src={article.header.url}
              alt={article.title}
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              placement={config.placementImage as "side" | "center"}
            />
          </div>
        ) : null}

        <div
          className={cn(
            "relative z-20 flex flex-col h-full justify-between",
            config.isFeatured ? "p-8" : "p-6",
          )}>
          <GlowCardContent>
            {!config.isFeatured && (
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                Mas acá en el tiempo
              </div>
            )}
            <h3
              className={cn(
                "font-bold leading-tight text-balance text-white transition-colors",
                config.isFeatured ? "text-3xl md:text-4xl lg:text-5xl" : "text-2xl md:text-3xl",
                `group-hover:${color.replace("text-", "text-")}`,
              )}>
              {article.title}
            </h3>
          </GlowCardContent>

          {article.createdAt && (
            <GlowCardFooter accent={color} icon={CalendarDays} className="mt-4">
              <span className="text-lg text-white/70">{formatDate(article.createdAt)}</span>
            </GlowCardFooter>
          )}
        </div>
      </GlowCardSurface>
    </GlowCard>
  );
}
