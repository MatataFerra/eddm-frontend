"use client";

import { useArticleNavigation } from "@/lib/hooks/use-article-natigation";
import type { Article, ContentNavigate } from "@/lib/interfaces/articles";
import { cn, type EntriesOrderByCategory } from "@/lib/utils";
import { ChevronLeft, ChevronRight, House } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { FloatingDock } from "@/components/ui/floating-dock";
import dynamic from "next/dynamic";

type NavigationProps = {
  redirect: "/" | "/12-meses-viajando" | "/relatos";
  item: Article;
  items: ContentNavigate[] | null;
  typeOfOrder: EntriesOrderByCategory[];
};

export const BookmarkIcon = dynamic(() => import("lucide-react").then((mod) => mod.Bookmark), {
  ssr: false,
});

export function Navigation({ item, items, typeOfOrder, redirect }: NavigationProps) {
  const [bookmarkedArticles, setBookmarkedArticles] = useLocalStorage<string[]>(
    "bookmarkedArticles",
    []
  );
  const { replace, push } = useRouter();
  const { next: getNextArticle, previous: getPreviousArticle } = useArticleNavigation(
    item,
    items ?? [],
    typeOfOrder
  );
  const bookmarked = bookmarkedArticles.includes(item.slug);

  const handleBookmark = useCallback(() => {
    setBookmarkedArticles((prev) => {
      return prev.includes(item.slug) ? prev.filter((s) => s !== item.slug) : [...prev, item.slug];
    });
  }, [item.slug, setBookmarkedArticles]);

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
      icon: (
        <BookmarkIcon
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
