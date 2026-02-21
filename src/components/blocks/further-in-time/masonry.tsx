import { getBentoConfig } from "@/lib/get-bento-config";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { PropsWithChildren, use } from "react";
import { MasonryItemGlow } from "@/components/blocks/further-in-time/further-card";
import { Masonry } from "@/components/ui/masonry";
import { ApiResponse } from "@/lib/fetch/caller";
import { NoEntryFound } from "../share/no-entry-found";

type MasonryProps = PropsWithChildren<{
  furtherPromise: Promise<ApiResponse<ContentNavigate[]> | null>;
}>;

export function MasonryFurther({ furtherPromise }: MasonryProps) {
  const data = use(furtherPromise);

  const items = data?.data || [];

  if (items.length === 0) {
    return <NoEntryFound message="No se encontraron relatos, prueba refrescando la página" />;
  }

  return (
    <Masonry className="max-w-7xl mx-auto">
      {items.map((article, index) => {
        const config = getBentoConfig(index);

        return (
          <MasonryItemGlow
            key={article.slug}
            article={article}
            index={index}
            config={config}
          />
        );
      })}
    </Masonry>
  );
}
