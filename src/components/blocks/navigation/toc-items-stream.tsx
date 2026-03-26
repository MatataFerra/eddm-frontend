import { use } from "react";
import { TOCItemsSync } from "@/lib/providers/toc-entry-provider";
import { parseHeadings } from "@/lib/utils";
import type { ArticlePromise } from "@/lib/interfaces/articles";

type TOCItemsStreamProps = {
  articlePromise: ArticlePromise;
};

export function TOCItemsStream({ articlePromise }: TOCItemsStreamProps) {
  const articleData = use(articlePromise);
  const content = articleData?.data?.md_content ?? articleData?.data?.content ?? "";
  const items = parseHeadings(content);

  return <TOCItemsSync items={items} />;
}
