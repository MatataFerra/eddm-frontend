import type { ArticleReadStatus } from "@/lib/interfaces/share";
import { BookOpenText, BookIcon, BookCheckIcon } from "lucide-react";

export function ReadingStatusResolver({ status }: { status: ArticleReadStatus }) {
  switch (status) {
    case "read":
      return <BookCheckIcon className="w-6 h-6 text-green-400" />;
    case "reading":
      return <BookOpenText className="w-6 h-6 text-blue-400" />;
    case "unread":
    default:
      return <BookIcon className="w-6 h-6 text-gray-400" />;
  }
}
