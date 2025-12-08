import { BookmarkIconToggle } from "./bookmark-icon-toggle"; // Importa el icono simple
import { useLocalStorageConfig } from "@/lib/providers/local-storage-provider";

type BookmarkLogicProps = {
  current: string | null;
};

export function BookmarkLogic({ current }: BookmarkLogicProps) {
  const { bookmarked } = useLocalStorageConfig();

  const isBookmarked = bookmarked.includes(current ?? "");

  return <BookmarkIconToggle isBookmarked={isBookmarked} className="w-6 h-6" />;
}
