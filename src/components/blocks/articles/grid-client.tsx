"use client";

import dynamic from "next/dynamic";
import { toast } from "sonner";

import { cn, getCategoryStyle, groupArticles } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { SettingsListItemResponse } from "@/lib/interfaces/cards";

import { NoEntryFound } from "@/components/blocks/share/no-entry-found";
import { BentoWrapper } from "@/components/blocks/articles/bento-grid";
import { ResponsiveQuoteText } from "@/components/blocks/articles/text-render/responsive-quote-text";
import { useRootData } from "@/lib/providers/root-data-provider";

const ModalArticleSkeleton = () => (
  <div className="animate-pulse size-full rounded-lg bg-zinc-200/40" />
);
const BentoCardSkeleton = () => <div className="h-40 rounded-lg bg-zinc-200/40 animate-pulse" />;

const ModalArticle = dynamic(
  () => import("@/components/blocks/articles/modal-article").then((m) => m.ModalArticle),
  {
    loading: () => <ModalArticleSkeleton />,
  },
);

const BentoCard = dynamic(
  () => import("@/components/blocks/articles/bento-card").then((m) => m.BentoCard),
  {
    loading: () => <BentoCardSkeleton />,
  },
);

const categoryHeadings: Record<string, string> = {
  context: "Entradas que van a servir para dar contexto",
};

type Props = {
  settings: SettingsListItemResponse | null;
};

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

export function GridClient({ settings }: Props) {
  const { articles } = useRootData();

  const articlesByCategory = groupArticles(articles);

  const getCategoryArticles = (categoryName: string) => articlesByCategory.get(categoryName) ?? [];

  if (!articles) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-2xl text-muted-foreground">No hay artículos publicados</p>
      </div>
    );
  }

  const hasSettings = settings?.ok && settings.data && settings.data.length > 0;

  if (!hasSettings) {
    return <NoEntryFound message="No se pueden visualizar las categorías correctamente" />;
  }

  return (
    <BentoWrapper>
      {settings.data.map((category, index) => {
        if (!category.show) return null;

        const styles = getCategoryStyle(category);

        if (category.type === "phrase") {
          return (
            <div
              key={`${category.text}-${index}`}
              style={styles}
              className={cn(
                "hidden md:flex rounded-xl size-full",
                "border border-black overflow-hidden",
                "relative transition-all hover:shadow-xl",
              )}>
              <ResponsiveQuoteText text={category.text} color={category.gradient?.textColor} />
            </div>
          );
        }

        const list = getCategoryArticles(category.name);
        if (list.length === 0) return null;

        return (
          <ModalArticle
            key={category.name}
            triggerClassName={cn(
              "size-full p-4 rounded-lg shadow-lg",
              "text-4xl font-bold cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            )}
            cover={!!category.cover}
            trigger={category.name}
            style={styles}
            url={category.url ?? "https://via.placeholder.com/300x200.png?text=No+Image"}>
            <h2 className="text-2xl font-bold mb-4">
              {categoryHeadings[category.name] || `Artículos de ${category.name}`}
            </h2>

            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="p-4">
                {list.map((article) => (
                  <CarouselItem key={article.id} className="basis-1/2 md:basis-1/3 pl-4">
                    <BentoCard article={article} onClick={handleUserFeedback} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6" />
              <CarouselNext className="-right-6" />
            </Carousel>
          </ModalArticle>
        );
      })}
    </BentoWrapper>
  );
}
