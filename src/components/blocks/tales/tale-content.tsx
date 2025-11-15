import { use } from "react";
import MarkdownRenderer from "@/components/blocks/articles/rich-text-renderer";
import type { TalePromise } from "@/lib/interfaces/tales";

type TaleContentProps = {
  contentPromise: TalePromise;
};

export function TaleContent({ contentPromise }: TaleContentProps) {
  const content = use(contentPromise);

  if (content?.metadata?.message) {
    const msg = content.metadata.message;
    // eslint-disable-next-line no-console
    console.log(`\x1b[90m[Notion]\x1b[0m \x1b[36m${msg}\x1b[0m`);
  }

  if (!content?.data) return null;

  return <MarkdownRenderer content={content.data.md_content} />;
}
