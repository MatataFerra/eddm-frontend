import { usePaletteColors } from "@/lib/hooks/use-pallette-color";
import {
  GlowCard,
  GlowCardSurface,
  GlowCardTitle,
  GlowCardImage,
  GlowCardContent,
} from "@/components/ui/styled-cards/glow-card";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import type { BentoConfig } from "@/lib/get-bento-config";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ENDPOINTS } from "@/lib/constants";
import dynamic from "next/dynamic";

const Badge = dynamic(
  () =>
    import("@/components/blocks/articles/badge-reading-status").then(
      (mod) => mod.BadgeReadingStatus,
    ),
  { ssr: false },
);

export function ArticleGlowCard({
  article,
  config,
  index,
  className,
}: {
  article: ContentNavigate;
  config?: BentoConfig;
  index: number;
  className?: string;
}) {
  const { gradients } = usePaletteColors(index);
  const { push } = useRouter();

  return (
    <GlowCard
      data-slot={`article-glow-card-${index}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => push(ENDPOINTS.ARTICLE(article.slug))}
      className={cn(
        "hover:scale-[1.02] transition-transform cursor-pointer h-full w-full",
        config?.span,
        className,
      )}>
      <GlowCardSurface gradient={gradients}>
        {article.header?.url && (
          <div className={cn("absolute w-full overflow-hidden rounded-t-2xl h-full inset-0 -z-10")}>
            <GlowCardImage
              src={article.header?.url}
              alt={article.title}
              className="h-48 sm:h-56 md:h-64 lg:h-72 rounded-t-lg"
              placement="center"
            />
          </div>
        )}
        <GlowCardContent className="h-full p-4 relative">
          <GlowCardTitle className="text-3xl md:text-5xl wrap-break-word font-semibold relative z-20 text-shadow-2xs">
            {article.title}
          </GlowCardTitle>
          <Badge article={article} />
        </GlowCardContent>
      </GlowCardSurface>
    </GlowCard>
  );
}
