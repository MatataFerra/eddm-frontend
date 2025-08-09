"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useArticleNavigation } from "@/lib/hooks/use-article-natigation";
import { Article } from "@/lib/interfaces/articles";
import { cn, EntriesOrderByCategory, monthsOrdered } from "@/lib/utils";
import { ChevronLeft, ChevronRight, House, Bookmark, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useArticles } from "@/lib/providers/articles-provider";

type NavigationProps = {
  redirect: "/" | "/12-meses-viajando" | "/relatos";
  item: Article;
  items: Article[];
  typeOfOrder: EntriesOrderByCategory[];
};

export function Navigation({ item, items, redirect }: NavigationProps) {
  const { isLoading } = useArticles();
  const [bookmarked, setBookmarked] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
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
  }, [item.id, bookmarkedArticles]);

  function handleBookmark() {
    const isAlreadyBookmarked = bookmarkedArticles.includes(item.slug);

    const updatedArticles = isAlreadyBookmarked
      ? bookmarkedArticles.filter((id) => id !== item.slug)
      : [...bookmarkedArticles, item.slug];

    setBookmarkedArticles(updatedArticles);
    setBookmarked(!isAlreadyBookmarked);
    setOpenTooltip(true);

    setTimeout(() => {
      setOpenTooltip(false);
    }, 1000);
  }

  return (
    <Dock direction="middle" className="border-white/30 bottom-4 right-0 left-0 fixed z-40 w-fit">
      <DockIcon>
        <ChevronLeft
          className="size-8"
          onClick={() => {
            if (!getPreviousArticle) return;

            push(getPreviousArticle?.slug);
          }}
        />
      </DockIcon>
      <DockIcon>
        <House className="size-12" onClick={() => replace(redirect)} />
      </DockIcon>
      <DockIcon>
        <ChevronRight
          className="size-8"
          onClick={() => {
            if (!getNextArticle) return;
            push(getNextArticle?.slug);
          }}
        />
      </DockIcon>

      <Separator orientation="vertical" className="h-3/4" />
      <DockIcon>
        <Tooltip open={openTooltip}>
          <TooltipTrigger>
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            ) : (
              <Bookmark
                className={cn(
                  "size-8 cursor-pointer transition-colors",
                  bookmarked ? "text-red-400 fill-red-300" : "text-white"
                )}
                onClick={handleBookmark}
              />
            )}
          </TooltipTrigger>
          <TooltipContent arrow={false} side="top" sideOffset={8}>
            <p className={cn(bookmarked ? "text-cyan-300" : "text-red-300")}>
              {bookmarked ? "Artículo guardado" : "Eliminado de tus favoritos"}
            </p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
    </Dock>
  );
}
