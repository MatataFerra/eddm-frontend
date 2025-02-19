"use client";

import type { Article } from "@lib/interfaces/articles";
import { ChevronLeft, ChevronRight, House } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

type NavigationProps = {
  articles: Article[];
};

export function Navigation({ articles }: NavigationProps) {
  const { replace, push } = useRouter();
  const { slug } = useParams();
  const article = articles.find((oneArticle) => oneArticle.slug === slug);
  const orderArticles = articles?.toSorted((prev, next) => prev.order - next.order);
  const getNextArticle = orderArticles?.find((art) => {
    if (!article) return;
    if (article.order - 1 === articles.length - 1) return article.order - 1;

    return art.order === article.order + 1;
  });

  const getPreviousArticle = orderArticles?.find((art) => {
    if (!article) return;
    if (article.order === 1) return;

    return art.order === article.order - 1;
  });

  return (
    <nav className="flex gap-2 fixed w-full mb-4 bottom-0 justify-center items-center z-50 *:bg-zinc-700 *:rounded-full *:cursor-pointer *:hover:bg-zinc-600 *:transition-all *:duration-300 *:opacity-20 *:hover:opacity-90 *:active:bg-zinc-900">
      <ChevronLeft
        className="size-8 p-2"
        onClick={() => {
          if (!getPreviousArticle) return;

          push(getPreviousArticle?.slug);
        }}
      />
      <House className="size-14 p-4" onClick={() => replace("/")} />
      <ChevronRight
        className="size-8 p-2"
        onClick={() => {
          if (!getNextArticle) return;
          push(getNextArticle?.slug);
        }}
      />
    </nav>
  );
}
