"use client";

import { BentoWrapper } from "@/components/blocks/articles/bento-grid";

import { cn } from "@/lib/utils";
import type { SettingsListItemResponse } from "@/lib/interfaces/cards";
import { useRootData } from "@/lib/providers/root-data-provider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import dynamic from "next/dynamic";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import type { Category } from "@/lib/interfaces/share";
import { QuoteIcon } from "@/components/ui/quote-icon";
import { toast } from "sonner";

const ModalArticle = dynamic(
  () => import("@/components/blocks/articles/modal-article").then((m) => m.ModalArticle),
  {
    loading: () => <div className="animate-pulse size-full rounded-lg bg-zinc-200/40" />,
  }
);

const BentoCard = dynamic(
  () => import("@/components/blocks/articles/bento-card").then((m) => m.BentoCard),
  {
    loading: () => <div className="h-40 rounded-lg bg-zinc-200/40 animate-pulse" />,
  }
);

const categoryHeadings: Record<string, string> = {
  context: "Entradas que van a servir para dar contexto",
};

type Props = {
  settings: SettingsListItemResponse | null;
};

function groupArticles(articles: ContentNavigate[] | null) {
  const map = new Map<string, ContentNavigate[]>();

  if (!articles) return map;

  for (const a of articles) {
    const key = a.category.name;
    const arr = map.get(key);
    if (arr) arr.push(a);
    else map.set(key, [a]);
  }

  for (const [key, list] of map) {
    list.sort((a, b) => a.order - b.order);
    map.set(key, list);
  }

  return map;
}

export function GridClient({ settings }: Props) {
  const { articles } = useRootData();

  const articlesByCategory = groupArticles(articles);

  const filteredArticles = (category: Category) => articlesByCategory.get(category.name) ?? [];

  if (!articles) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-2xl">No hay artículos publicados</p>
      </div>
    );
  }

  if (!settings?.ok || !settings.data || settings.data.length === 0 || !settings) {
    return (
      <BentoWrapper>
        <div className="flex justify-center items-center h-auto text-center w-full col-span-3">
          <p className="text-2xl font-bold text-red-400">
            No se pueden visualizar las categorías correctamente
          </p>
        </div>
      </BentoWrapper>
    );
  }

  function handleUserFeedback() {
    const task = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    toast.promise(task, {
      loading: "Has solicitado un artículo. Procesando...",
      success: "Redirigiendo...",
      error: "Hubo un error. Por favor, intenta de nuevo.",
    });
  }

  return (
    <BentoWrapper>
      {settings.data.map((category, index) => {
        if (!category.show) return null;

        if (category.type === "phrase") {
          return (
            <div
              key={(category.text ?? "phrase") + index}
              style={{
                gridColumn: `span ${category.columns}`,
                gridRow: `span ${category.rows}`,
                background: category.gradient
                  ? `linear-gradient(${category.gradient.direction
                      .replace(/_/g, " ")
                      .toLowerCase()}, ${category.gradient.from}, ${
                      category.gradient.via ?? category.gradient.from
                    }, ${category.gradient.to})`
                  : undefined,
                color: category.gradient?.textColor ?? undefined,
              }}
              className={cn(
                "hidden md:flex rounded-xl justify-center items-center size-full border border-black overflow-hidden text-black dark:text-white p-8 italic text-balance relative"
              )}>
              <QuoteIcon />

              <p className="w-full [text-wrap:balance] [font-size:clamp(12px,5vw,24px)] h-full">
                {category.text}
              </p>
            </div>
          );
        }

        const list = filteredArticles(category as unknown as Category);
        if (list.length === 0) return null;

        return (
          <ModalArticle
            key={category.name}
            triggerClassName="size-full p-4 rounded-lg shadow-lg text-4xl font-bold cursor-pointer font-dancing"
            cover={!!category.cover}
            trigger={category.name}
            style={{ gridColumn: `span ${category.columns}`, gridRow: `span ${category.rows}` }}
            url={category.url ?? "https://via.placeholder.com/300x200.png?text=No+Image"}>
            <h2 className="text-2xl font-bold">
              {categoryHeadings[category.name] || `Artículos de ${category.name}`}
            </h2>
            <Carousel>
              <CarouselContent className="p-4">
                {list.map((article) => (
                  <CarouselItem key={article.id} className="basis-1/2 md:basis-1/3">
                    <BentoCard article={article} onClick={handleUserFeedback} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-8" />
              <CarouselNext className="-right-8" />
            </Carousel>
          </ModalArticle>
        );
      })}
    </BentoWrapper>
  );
}
