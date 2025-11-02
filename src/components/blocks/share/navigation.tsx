"use client";

import { useArticleNavigation } from "@/lib/hooks/use-article-natigation";
import { cn, type EntriesOrderByCategory } from "@/lib/utils";
import type { RoutePaths } from "@/lib/constants";
import { Bookmark, ChevronLeft, ChevronRight, House } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { FloatingDock } from "@/components/ui/floating-dock";
import dynamic from "next/dynamic";

type NavigationProps = {
  redirect: RoutePaths;
  typeOfOrder: EntriesOrderByCategory[];
  segment: string | null;
};

export const BookmarkIcon = dynamic(() => import("lucide-react").then((mod) => mod.Bookmark), {
  ssr: false,
  loading: () => <Bookmark className="animate-pulse fill-slate-400 text-slate-500" />,
});

export function Navigation({ typeOfOrder, redirect, segment }: NavigationProps) {
  const [bookmarkedArticles, setBookmarkedArticles] = useLocalStorage<string[]>(
    "bookmarkedArticles",
    [],
    {
      initializeWithValue: true,
    }
  );

  const { replace, push } = useRouter();
  const {
    next: getNextArticle,
    previous: getPreviousArticle,
    current,
  } = useArticleNavigation(typeOfOrder, segment);

  const bookmarked = bookmarkedArticles.includes(current?.slug ?? "");

  const handleBookmark = useCallback(() => {
    setBookmarkedArticles((prev) => {
      return prev.includes(current?.slug ?? "")
        ? prev.filter((s) => s !== current?.slug)
        : [...prev, current?.slug ?? ""];
    });
  }, [current?.slug, setBookmarkedArticles]);

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
      onClick: () => replace(redirect, { scroll: false }),
    },
    {
      title: "Siguiente",
      icon: <ChevronRight />,
      onClick: () => {
        if (!getNextArticle) return;
        push(getNextArticle?.slug, { scroll: false });
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
