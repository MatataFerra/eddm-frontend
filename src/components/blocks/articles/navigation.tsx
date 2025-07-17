"use client";

import { useArticleNavigation } from "@/lib/hooks/use-article-natigation";
import { Article } from "@/lib/interfaces/articles";
import { EntriesOrderByCategory, monthsOrdered } from "@/lib/utils";
import { ChevronLeft, ChevronRight, House } from "lucide-react";
import { useRouter } from "next/navigation";

type NavigationProps = {
  redirect: "/" | "/12-meses-viajando" | "/relatos";
  item: Article;
  items: Article[];
  typeOfOrder: EntriesOrderByCategory[];
};

export function Navigation({ item, items, redirect }: NavigationProps) {
  const { replace, push } = useRouter();
  const { next: getNextArticle, previous: getPreviousArticle } = useArticleNavigation(
    item,
    items,
    monthsOrdered
  );

  return (
    <nav className="flex gap-2 sticky w-full mb-4 bottom-0 right-0 justify-center items-center z-50 *:bg-zinc-700 *:rounded-full *:cursor-pointer *:hover:bg-zinc-600 *:transition-all *:duration-300 *:hover:opacity-90 *:active:bg-zinc-900">
      <ChevronLeft
        className="size-8 p-2 opacity-40"
        onClick={() => {
          if (!getPreviousArticle) return;

          push(getPreviousArticle?.slug);
        }}
      />
      <House className="size-14 p-4 opacity-60" onClick={() => replace(redirect)} />
      <ChevronRight
        className="size-8 p-2 opacity-40"
        onClick={() => {
          if (!getNextArticle) return;
          push(getNextArticle?.slug);
        }}
      />
    </nav>
  );
}
