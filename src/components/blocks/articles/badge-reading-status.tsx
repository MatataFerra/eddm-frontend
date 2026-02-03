"use client";

import { Badge } from "@/components/ui/badge";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { useLocalStorageObject } from "@/lib/hooks/use-localstorage-object";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import type { LocalStorageConfig } from "@/lib/interfaces/share";
import { useIsMounted } from "usehooks-ts";

export function BadgeReadingStatus({ article }: { article: ContentNavigate }) {
  const isMounted = useIsMounted();
  const {
    value: { "articles-read-status": articlesReadStatus },
  } = useLocalStorageObject<LocalStorageConfig>(LOCALSTORAGE_KEYS.EDDM_CONFIG_OBJECT, {
    version: 1,
    bookmarked: [],
    "articles-read-status": {},
  });

  if (!isMounted) return null;

  const articleStatus = articlesReadStatus[article.slug];
  return (
    <>
      {articleStatus === "read" ? (
        <Badge className="absolute top-4 right-4 z-20">Leído</Badge>
      ) : null}
    </>
  );
}
