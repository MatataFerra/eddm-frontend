"use client";

import { useArticleNavigation } from "@/lib/hooks/use-article-natigation";
import { useArticles } from "@/lib/providers/articles-provider";
import { monthsOrdered } from "@/lib/utils";
import { ChevronLeft, ChevronRight, House } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export function Navigation() {
  const { replace, push } = useRouter();
  const { slug } = useParams();
  const { articles } = useArticles();
  const article = articles.find((oneArticle) => oneArticle.slug === slug);
  const { next: getNextArticle, previous: getPreviousArticle } = useArticleNavigation(
    article,
    articles,
    monthsOrdered
  );

  return (
    <nav className="flex gap-2 fixed w-full mb-4 bottom-0 right-0 justify-center items-center z-50 *:bg-zinc-700 *:rounded-full *:cursor-pointer *:hover:bg-zinc-600 *:transition-all *:duration-300 *:opacity-20 *:hover:opacity-90 *:active:bg-zinc-900">
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
