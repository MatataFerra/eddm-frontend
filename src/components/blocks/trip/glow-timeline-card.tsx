import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  GlowCardContent,
  GlowCardHeader,
  GlowCardImage,
  GlowCardFooter,
  GlowCard,
  GlowCardSurface,
  GlowCardTitle,
  GlowCardSubtitle,
} from "@/components/ui/styled-cards/glow-card";
import type { TripStop } from "@/lib/interfaces/trip";
import { MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverBoxShadowGlow } from "@/components/ui/styled-cards/hover-glow";
import { usePaletteColors } from "@/lib/hooks/use-pallette-color";

type Props = {
  stop: TripStop;
  index: number;
  distanceToNext?: number;
  nextStop?: TripStop;
  isLast?: boolean;
  link?: string;
  image?: string;
};

export function GlowTimelineCard({
  stop,
  index,
  distanceToNext,
  nextStop,
  isLast,
  link,
  image,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isLast ? ["start 98%", "start 60%"] : ["start 95%", "start 20%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], isLast ? [20, 0] : [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], isLast ? [0.98, 1] : [0.95, 1]);
  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    isLast ? ["blur(4px)", "blur(0px)"] : ["blur(8px)", "blur(0px)"],
  );
  const imageBlur = useTransform(scrollYProgress, [0, 1], ["blur(6px)", "blur(0px)"]);

  const { color, accents, gradients } = usePaletteColors(index);

  return (
    <GlowCard ref={ref} style={{ y, opacity, scale, filter: blur }} link={link}>
      <GlowCardSurface gradient={gradients}>
        <HoverBoxShadowGlow color={color} className="rounded-2xl sm:rounded-3xl" />
        {image && (
          <GlowCardImage src={image} alt={`${stop.city}, ${stop.country}`} blur={imageBlur} />
        )}
        <div className="relative px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <GlowCardHeader index={index} accent={accents} icon={MapPin} />
          <GlowCardContent>
            <GlowCardTitle>{stop.city}</GlowCardTitle>
            <GlowCardSubtitle>{stop.country}</GlowCardSubtitle>
          </GlowCardContent>
          {distanceToNext && nextStop && (
            <GlowCardFooter accent={accents} icon={Navigation}>
              <p className="text-sm text-white/90 truncate">
                <span className={cn("font-medium", accents)}>
                  {Math.round(distanceToNext).toLocaleString("es-AR")} km
                </span>{" "}
                hasta {nextStop.city}, {nextStop.country}
              </p>
            </GlowCardFooter>
          )}
        </div>
      </GlowCardSurface>
    </GlowCard>
  );
}
