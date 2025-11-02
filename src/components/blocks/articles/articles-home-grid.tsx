"use client";

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
import { type Category, cn } from "@/lib/utils";
import useSWR from "swr";
import { swrFetcher } from "@lib/fetch";
import { useCallback } from "react";
import type { SettingsListItemResponse } from "@/lib/interfaces/cards";
import { LoaderFive } from "@/components/ui/loader";
import FitText from "../share/fit-text";
import { isMobile } from "react-device-detect";
import { useRootData } from "@/lib/providers/root-data-provider";

const categoryHeadings: Record<string, string> = {
  context: "Entradas que van a servir para dar contexto",
};

export function ArticlesHomeGrid() {
  const { articles } = useRootData();
  const {
    data: settings,
    error,
    isLoading,
  } = useSWR<SettingsListItemResponse>(["/settings"], swrFetcher);

  const filteredArticles = useCallback(
    (category: Category) => {
      if (!articles) return [];
      const article = articles?.filter((article) => {
        return article.category.name === category.name;
      });
      return article;
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
              style={{ gridColumn: "span 3" }}>
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
                if (isMobile) return null;

                return (
                  <FitText
                    key={category.text + index}
                    min={24}
                    max={120}
                    style={{
                      gridColumn: `span ${category.columns}`,
                      gridRow: `span ${category.rows}`,
                      background: category.gradient
                        ? `linear-gradient(${category.gradient?.direction
                            .replace(/_/g, " ")
                            .toLowerCase()}, ${category.gradient?.from}, ${
                            category.gradient?.via ?? category.gradient?.from
                          }, ${category.gradient?.to})`
                        : undefined,
                      color: category.gradient?.textColor,
                    }}
                    className={cn(
                      "rounded-xl flex justify-center items-center size-full border border-black overflow-hidden text-black dark:text-white p-8 italic text-balance relative"
                    )}>
                    <svg
                      className="mb-4 size-48 text-gray-400 dark:text-gray-400 absolute top-4 left-4 opacity-30"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 14">
                      <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                    </svg>
                    {category.text}
                  </FitText>
                );
              }

              if (filteredArticles.length === 0) return null;

              return (
                <ModalArticle
                  key={category.name}
                  triggerClassName="size-full p-4 rounded-lg shadow-lg text-4xl font-bold cursor-pointer font-dancing"
                  cover={!!category.cover}
                  trigger={category.name}
                  style={{
                    gridColumn: `span ${category.columns}`,
                    gridRow: `span ${category.rows}`,
                  }}
                  url={category.url ?? "https://via.placeholder.com/300x200.png?text=No+Image"}>
                  <h2 className="text-2xl font-bold">
                    {categoryHeadings[category?.name] || `Artículos de ${category.name}`}
                  </h2>
                  <Carousel>
                    <CarouselContent className="p-4">
                      {filteredArticles(category)
                        ?.toSorted((a, b) => {
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
