"use client";

import { monthsOrdered } from "@/lib/utils";
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

  const orderedCategories = monthsOrdered
    .filter((item) => item.type === "category")
    .map((item) => (item as { type: "category"; name: string }).name);

  const currentCategoryIndex = orderedCategories.findIndex((cat) => cat === article?.category.name);

  const articlesInSameCategory = articles
    .filter((art) => art.category.name === article?.category.name)
    .toSorted((a, b) => a.order - b.order);

  const currentIndex = articlesInSameCategory.findIndex((art) => art.id === article?.id);

  const getFirstArticleInCategory = (categoryName: string) =>
    articles
      .filter((art) => art.category.name === categoryName)
      .toSorted((a, b) => a.order - b.order)[0];

  const getLastArticleInCategory = (categoryName: string) =>
    articles
      .filter((art) => art.category.name === categoryName)
      .toSorted((a, b) => a.order - b.order)
      .at(-1);

  let getNextArticle = null;
  if (currentIndex !== -1 && currentIndex < articlesInSameCategory.length - 1) {
    getNextArticle = articlesInSameCategory[currentIndex + 1];
  } else if (currentCategoryIndex !== -1 && currentCategoryIndex < orderedCategories.length - 1) {
    const nextCategoryName = orderedCategories[currentCategoryIndex + 1];
    getNextArticle = getFirstArticleInCategory(nextCategoryName);
  }

  let getPreviousArticle = null;
  if (currentIndex > 0) {
    getPreviousArticle = articlesInSameCategory[currentIndex - 1];
  } else if (currentCategoryIndex > 0) {
    const prevCategoryName = orderedCategories[currentCategoryIndex - 1];
    getPreviousArticle = getLastArticleInCategory(prevCategoryName);
  }

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
