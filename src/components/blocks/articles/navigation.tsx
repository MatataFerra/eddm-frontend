"use client";

import { useArticleNavigation } from "@/lib/hooks/use-article-natigation";
import { Article } from "@/lib/interfaces/articles";
import { cn, EntriesOrderByCategory, monthsOrdered } from "@/lib/utils";
import { ChevronLeft, ChevronRight, House, Bookmark, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useArticles } from "@/lib/providers/articles-provider";
import { FloatingDock } from "@/components/ui/floating-dock";

type NavigationProps = {
  redirect: "/" | "/12-meses-viajando" | "/relatos";
  item: Article;
  items: Article[];
  typeOfOrder: EntriesOrderByCategory[];
};

export function Navigation({ item, items, redirect }: NavigationProps) {
  const { isLoading } = useArticles();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useLocalStorage<string[]>(
    "bookmarkedArticles",
    []
  );
  const { replace, push } = useRouter();
  const { next: getNextArticle, previous: getPreviousArticle } = useArticleNavigation(
    item,
    items,
    monthsOrdered
  );

  useEffect(() => {
    setBookmarked(bookmarkedArticles.includes(item.slug));
  }, [bookmarkedArticles, item.slug]);

  function handleBookmark() {
    const isAlreadyBookmarked = bookmarkedArticles.includes(item.slug);

    const updatedArticles = isAlreadyBookmarked
      ? bookmarkedArticles.filter((id) => id !== item.slug)
      : [...bookmarkedArticles, item.slug];

    setBookmarkedArticles(updatedArticles);
    setBookmarked(!isAlreadyBookmarked);
  }

  const iconItems = [
    {
      title: "Anterior",
      icon: <ChevronLeft />,
      onClick: () => {
        if (!getPreviousArticle) return;

        push(getPreviousArticle?.slug);
      },
    },
    {
      title: "Inicio",
      icon: <House />,
      onClick: () => replace(redirect),
    },
    {
      title: "Siguiente",
      icon: <ChevronRight />,
      onClick: () => {
        if (!getNextArticle) return;
        push(getNextArticle?.slug);
      },
    },
    {
      title: "Favorito",
      icon: isLoading ? (
        <Loader2 className="animate-spin text-gray-500" />
      ) : (
        <Bookmark
          className={cn(
            "cursor-pointer transition-colors",
            bookmarked ? "text-red-300 fill-red-300" : "text-white"
          )}
        />
      ),
      onClick: handleBookmark,
    },
  ];

  return (
    <>
      <div className="md:bg-accent-foreground flex items-center justify-center mx-auto">
        <FloatingDock items={iconItems} />
      </div>
    </>
  );
}
