"use client";

import { useArticles } from "@/lib/providers/articles-provider";
import { BentoCard } from "@/components/blocks/articles/bento-card";
import { BentoWrapper } from "@/components/blocks/articles/bento-grid";
import { ModalArticle } from "@/components/blocks/articles/modal-article";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Category, cn } from "@/lib/utils";
import useSWR from "swr";
import { swrFetcher } from "@lib/fetch";
import { useCallback } from "react";
import { SettingsListItemResponse } from "@/lib/interfaces/cards";
import { LoaderFive } from "@/components/ui/loader";

const categoryHeadings: Record<string, string> = {
  context: "Entradas que van a servir para dar contexto",
};

export function ArticlesHomeGrid() {
  const { articles } = useArticles();
  const {
    data: settings,
    error,
    isLoading,
  } = useSWR<SettingsListItemResponse>(["/settings"], swrFetcher);

  const filteredArticles = useCallback(
    (category: Category) => {
      return articles.filter((article) => article.category.name === category.name);
    },
    [articles]
  );

  return (
    <>
      {articles ? (
        <BentoWrapper>
          {isLoading ? (
            <div
              className="flex justify-center h-auto items-center w-full"
              style={{ gridColumn: "span 2" }}>
              <LoaderFive text="Cargando portadas..." />
            </div>
          ) : error ? (
            <div
              className="flex justify-center items-center h-auto w-full"
              style={{ gridColumn: "span 2" }}>
              <p className="text-2xl font-bold" style={{ color: "oklch(70.4% 0.191 22.216)" }}>
                Error al cargar los artículos
              </p>
            </div>
          ) : (
            settings?.data.map((category, index) => {
              if (!category.show) return null;

              if (category?.type === "phrase") {
                return (
                  <div
                    key={category.text + index}
                    style={{
                      gridColumn: `span ${category.columns}`,
                      gridRow: `span ${category.rows}`,
                    }}
                    className={cn(
                      "rounded-xl flex justify-center items-center size-full border border-black overflow-hidden text-black dark:text-white p-4 text-7xl italic text-balance dark:bg-neutral-800 bg-gradient-to-tr from-sky-200 via-emerald-200 to-yellow-100 font-dancing",
                      category.className
                    )}>
                    {category.text}
                  </div>
                );
              }

              if (filteredArticles.length === 0) return null;

              return (
                <ModalArticle
                  key={category.name}
                  triggerClassName="size-full p-4 rounded-lg shadow-lg text-4xl font-bold cursor-pointer font-dancing"
                  cover={!!category.cover}
                  trigger={category.name}
                  className={cn(`row-span-${category.rows} col-span-${category.columns}`)}
                  url={category.url ?? "https://via.placeholder.com/300x200.png?text=No+Image"}>
                  <h2 className="text-2xl font-bold">
                    {categoryHeadings[category?.name] || `Artículos de ${category.name}`}
                  </h2>
                  <Carousel>
                    <CarouselContent className="p-4">
                      {filteredArticles(category)
                        .toSorted((a, b) => {
                          return a.order - b.order;
                        })
                        .map((article) => (
                          <CarouselItem key={article.id} className="basis-1/2 md:basis-1/3">
                            <BentoCard article={article} />
                          </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-8" />
                    <CarouselNext className="-right-8" />
                  </Carousel>
                </ModalArticle>
              );
            })
          )}
        </BentoWrapper>
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl">No hay artículos publicados</p>
        </div>
      )}
    </>
  );
}
