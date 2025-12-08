import { cn } from "@/lib/utils";
import { Bookmark, BookmarkCheck } from "lucide-react";

type BookmarkIconDynamicProps = {
  className?: string;
  isBookmarked?: boolean;
};

export function BookmarkIconToggle({ className, isBookmarked }: BookmarkIconDynamicProps) {
  if (isBookmarked) {
    return <BookmarkCheck className={cn("w-6 h-6 text-red-700 fill-red-300", className)} />;
  }
  return <Bookmark className={cn("w-6 h-6 text-gray-400", className)} />;
}
