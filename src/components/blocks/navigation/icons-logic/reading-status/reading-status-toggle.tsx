import type { ArticleReadStatus } from "@/lib/interfaces/share";
import { BookOpenText, BookIcon, BookCheckIcon } from "lucide-react";

type ReadingStatusToggleProps = {
  status: ArticleReadStatus;
};

type StatusConfig = {
  icon: typeof BookCheckIcon;
  className: string;
};

const statusConfig: Record<ArticleReadStatus | "unread", StatusConfig> = {
  read: { icon: BookCheckIcon, className: "w-6 h-6 text-green-400" },
  reading: { icon: BookOpenText, className: "w-6 h-6 text-blue-400" },
  unread: { icon: BookIcon, className: "w-6 h-6 text-gray-400" },
};

export function ReadingStatusToggle({ status }: ReadingStatusToggleProps) {
  const config = statusConfig[status] || statusConfig.unread;
  const Icon = config.icon;
  return <Icon className={config.className} />;
}
