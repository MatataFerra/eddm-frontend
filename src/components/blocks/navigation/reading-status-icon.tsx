import type { ArticleReadStatus, ArticleStatusMap } from "@/lib/interfaces/share";
import { CircleDot } from "lucide-react";

import dynamic from "next/dynamic";

type ReadingStatusIconProps = {
  articleStatus: ArticleStatusMap;
  slug: string;
};

export const ReadingStatusDynamicIcon = dynamic(
  () =>
    import("@/components/blocks/navigation/reading-status-dynamic").then(
      (mod) => mod.ReadingStatusResolver
    ),
  {
    ssr: false,
    loading: () => <CircleDot className="w-6 h-6 text-gray-400 animate-pulse" />,
  }
);

export function ReadingStatusIcon({ articleStatus, slug }: ReadingStatusIconProps) {
  const status: ArticleReadStatus = articleStatus?.[slug] ?? "unread";

  if (!slug) return <ReadingStatusDynamicIcon status="unread" />;
  return <ReadingStatusDynamicIcon status={status} />;
}
