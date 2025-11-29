import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { useLocalStorageObject } from "@/lib/hooks/use-localstorage-object";
import type { LocalStorageConfig } from "@/lib/interfaces/share";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const BookmarkIconDynamic = dynamic(
  () =>
    import("@/components/blocks/navigation/bookmark-icon-dynamic").then(
      (mod) => mod.BookmarkIconDynamic
    ),
  {
    ssr: false,
  }
);

type BookmarkIconProps = {
  current: string | null;
};

export function BookmarkIcon({ current }: BookmarkIconProps) {
  const { value } = useLocalStorageObject<LocalStorageConfig>(
    LOCALSTORAGE_KEYS.EDDM_CONFIG_OBJECT,
    {
      version: 1,
      bookmarked: [],
      "articles-read-status": {},
    }
  );

  const { bookmarked } = value;

  const isBookmarked = bookmarked.includes(current ?? "");

  return <BookmarkIconDynamic isBookmarked={isBookmarked} className={cn("w-6 h-6")} />;
}
