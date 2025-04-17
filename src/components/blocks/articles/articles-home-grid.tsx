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
import { cn, monthsOrdered } from "@/lib/utils";

const categoryHeadings: Record<string, string> = {
  context: "Entradas que van a servir para dar contexto",
};

export function ArticlesHomeGrid() {
  const { articles } = useArticles();

  return (
    <>
      {articles ? (
        <BentoWrapper>
          {monthsOrdered.map((category, index) => {
            if (category?.type === "phrase") {
              return (
                <div
                  key={category.text + index}
                  className={cn(
                    "rounded-xl flex justify-center items-center size-full border border-black overflow-hidden text-black dark:text-white p-2 text-xl italic text-pretty",
                    category.className
                  )}>
                  {category.text}
                </div>
              );
            }

            const filteredArticles = articles.filter(
              (article) => article.category.name === category.name
            );

            if (filteredArticles.length === 0) return null;

            return (
              <ModalArticle
                key={category.name}
                triggerClassName="size-full p-4 rounded-lg shadow-lg text-4xl font-bold cursor-pointer font-dancing"
                cover={!!category.cover}
                trigger={category.name}>
                <h2 className="text-2xl font-bold">
                  {categoryHeadings[category?.name] || `Artículos de ${category.name}`}
                </h2>
                <Carousel>
                  <CarouselContent className="p-4">
                    {filteredArticles
                      .toSorted((a, b) => {
                        return a.order - b.order;
                      })
                      .map((article) => (
                        <CarouselItem key={article.id} className="basis-1/2">
                          <BentoCard article={article} />
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
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl">No hay artículos publicados</p>
        </div>
      )}
    </>
  );
}
