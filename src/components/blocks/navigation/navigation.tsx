"use client";

import { useArticleNavigation } from "@/lib/hooks/use-article-natigation";
import { type EntriesOrderByCategory } from "@/lib/interfaces/share";
import { LOCALSTORAGE_KEYS, TRANSLATE_ARTICLE_READ_STATUS, type RoutePaths } from "@/lib/constants";
import { ChevronLeft, ChevronRight, House } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useLocalStorageObject } from "@/lib/hooks/use-localstorage-object";
import { ReadingStatusIcon } from "@/components/blocks/navigation/reading-status-icon";
import type { ArticleReadStatus, LocalStorageConfig } from "@/lib/interfaces/share";
import { BookmarkIcon } from "./bookmark-icon";
import { useEffect, useEffectEvent } from "react";
import { extractSlugFromPathname } from "@/lib/utils";

type NavigationProps = {
  redirect: RoutePaths;
  typeOfOrder: EntriesOrderByCategory[];
  segment?: string | null;
};

export function Navigation({ typeOfOrder, redirect }: NavigationProps) {
  const { replace, push } = useRouter();
  const pathname = usePathname();
  const segment = extractSlugFromPathname(pathname);
  const { value, update } = useLocalStorageObject<LocalStorageConfig>(
    LOCALSTORAGE_KEYS.EDDM_CONFIG_OBJECT,
    {
      version: 1,
      bookmarked: [],
      "articles-read-status": {},
    }
  );

  const { "articles-read-status": articlesReadStatus } = value;

  const updaterEvent = useEffectEvent((slug: string, status: ArticleReadStatus) => {
    update("articles-read-status", {
      ...articlesReadStatus,
      [slug]: status,
    });
  });

  const {
    next: getNextArticle,
    previous: getPreviousArticle,
    current,
  } = useArticleNavigation(typeOfOrder, segment);

  useEffect(() => {
    if (!current?.slug) return;
    if (!articlesReadStatus || articlesReadStatus[current.slug]) return;

    updaterEvent(current.slug, "unread");
  }, [current?.slug, articlesReadStatus]);

  function handleBookmark() {
    update(
      "bookmarked",
      value.bookmarked.includes(current?.slug ?? "")
        ? value.bookmarked.filter((s) => s !== current?.slug)
        : [...value.bookmarked, current?.slug ?? ""]
    );
  }

  function handleReadingStatusChange() {
    const currentStatus = articlesReadStatus?.[current?.slug ?? ""] ?? "unread";
    let newStatus: ArticleReadStatus;
    switch (currentStatus) {
      case "unread":
        newStatus = "reading";
        break;
      case "reading":
        newStatus = "read";
        break;
      case "read":
      default:
        newStatus = "unread";
        break;
    }

    const newArticlesReadStatus = {
      ...articlesReadStatus,
      [current?.slug ?? ""]: newStatus,
    };

    update("articles-read-status", newArticlesReadStatus);
  }

  const iconItems = [
    {
      title: "Anterior",
      keyId: "previous-article",
      icon: <ChevronLeft />,
      onClick: () => {
        if (!getPreviousArticle) return;

        push(getPreviousArticle?.slug);
      },
    },
    {
      title: "Inicio",
      keyId: "home",
      icon: <House />,
      onClick: () => replace(redirect, { scroll: false }),
    },
    {
      title: "Siguiente",
      keyId: "next-article",
      icon: <ChevronRight />,
      onClick: () => {
        if (!getNextArticle) return;
        push(getNextArticle?.slug, { scroll: false });
      },
    },
    {
      title: "Favorito",
      keyId: "bookmark",
      icon: <BookmarkIcon current={current?.slug ?? null} />,
      onClick: handleBookmark,
    },
    {
      title: `Estado de lectura - ${
        TRANSLATE_ARTICLE_READ_STATUS[articlesReadStatus?.[current?.slug ?? ""] ?? "unread"]
      }`,
      keyId: "reading-status",
      icon: <ReadingStatusIcon articleStatus={articlesReadStatus} slug={current?.slug ?? ""} />,
      onClick: handleReadingStatusChange,
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
