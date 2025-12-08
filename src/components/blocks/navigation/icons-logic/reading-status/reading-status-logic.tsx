import { ReadingStatusToggle } from "./reading-status-toggle";
import { useLocalStorageConfig } from "@/lib/providers/local-storage-provider";

type ReadingStatusLogicProps = {
  current: string | null;
};

export function ReadingStatusLogic({ current }: ReadingStatusLogicProps) {
  const { articlesReadStatus } = useLocalStorageConfig();

  return <ReadingStatusToggle status={articlesReadStatus[current ?? ""] ?? "unread"} />;
}
