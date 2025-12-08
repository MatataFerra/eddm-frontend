import { CircleDot } from "lucide-react";
import dynamic from "next/dynamic";

const ReadingStatusLogicDynamic = dynamic(
  () =>
    import("@/components/blocks/navigation/icons-logic/reading-status/reading-status-logic").then(
      (mod) => mod.ReadingStatusLogic
    ),
  {
    ssr: false,
    loading: () => <CircleDot className="w-6 h-6 text-gray-400 animate-pulse" />,
  }
);

type ReadingStatusIconProps = {
  slug: string;
};

export function ReadingStatusIcon({ slug }: ReadingStatusIconProps) {
  return <ReadingStatusLogicDynamic current={slug} />;
}
