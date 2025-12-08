"use client";

import { useEffect, useEffectEvent } from "react";
import { ListIcon, X, ChevronLeft, ChevronRight, House } from "lucide-react";
import { useTOC } from "@/lib/providers/toc-entry-provider";
import { FloatingDock } from "@/components/blocks/dock/floating-dock";
import { useArticleNavigation } from "@/lib/hooks/use-article-natigation";
import { type RoutePaths, TRANSLATE_ARTICLE_READ_STATUS } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { ReadingStatusIcon } from "@/components/blocks/navigation/icons-logic/reading-status/reading-status-icon";

import type { ArticleReadStatus, EntriesOrderByCategory } from "@/lib/interfaces/share";

import { BookmarkIcon } from "@/components/blocks/navigation/icons-logic/bookmark/bookmark-icon";
import { extractSlugFromPathname } from "@/lib/utils";
import { FloatingEntryContentList } from "@/components/blocks/navigation/floating-entry-content-list";
import { useLocalStorageConfig } from "@/lib/providers/local-storage-provider";

type EntryNavWrapperProps = {
  redirect: RoutePaths;
  typeOfOrder: EntriesOrderByCategory[];
};

export function EntryNavWrapper({ redirect, typeOfOrder }: EntryNavWrapperProps) {
  const { activeId, setIsTocOpen, isTocOpen } = useTOC();
  const { replace, push } = useRouter();
  const pathname = usePathname();
  const segment = extractSlugFromPathname(pathname);
  const { bookmarked, articlesReadStatus, update } = useLocalStorageConfig();

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
      bookmarked.includes(current?.slug ?? "")
        ? bookmarked.filter((s) => s !== current?.slug)
        : [...bookmarked, current?.slug ?? ""]
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

  const baseDockItems = [
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
      title: "separator",
      keyId: "separator-1",
      icon: null,
    },
    {
      title: "Favorito",
      keyId: "bookmark",
      icon: <BookmarkIcon current={current?.slug ?? null} />,
      onClick: handleBookmark,
    },
    {
      title: `Estado de lectura - ${
        TRANSLATE_ARTICLE_READ_STATUS.es[articlesReadStatus?.[current?.slug ?? ""] ?? "unread"]
      }`,
      keyId: "reading-status",
      icon: <ReadingStatusIcon slug={current?.slug ?? ""} />,
      onClick: handleReadingStatusChange,
    },
  ];

  function resolveTocDockItem() {
    return {
      keyId: "toc-trigger",
      title: isTocOpen ? "Cerrar Índice" : "Índice",
      only: "mobile",
      icon: isTocOpen ? (
        <X className="h-full w-full text-neutral-300" />
      ) : (
        <ListIcon className={`h-full w-full ${activeId ? "text-blue-400" : "text-neutral-300"}`} />
      ),
      onClick: () => setIsTocOpen(!isTocOpen),
    };
  }

  const tocDockItem = resolveTocDockItem();

  const dockItems = tocDockItem ? [...baseDockItems, tocDockItem] : baseDockItems;

  return (
    <>
      <FloatingEntryContentList />
      <FloatingDock items={dockItems} />
    </>
  );
}
