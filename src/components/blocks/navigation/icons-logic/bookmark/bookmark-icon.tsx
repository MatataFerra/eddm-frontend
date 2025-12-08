import { CircleDot } from "lucide-react";
import dynamic from "next/dynamic";

const BookmarkLogicDynamic = dynamic(
  () =>
    import("@/components/blocks/navigation/icons-logic/bookmark/bookmark-logic").then(
      (mod) => mod.BookmarkLogic
    ),
  {
    ssr: false,
    loading: () => <CircleDot className="w-6 h-6 text-gray-400 animate-pulse" />,
  }
);

type BookmarkIconProps = {
  current: string | null;
};

export function BookmarkIcon({ current }: BookmarkIconProps) {
  return <BookmarkLogicDynamic current={current} />;
}
