import { use } from "react";
import { ArticlePromise } from "@/lib/interfaces/articles";
import { RichTextRenderer } from "@/components/blocks/markdown/rich-text-renderer";

type ArticleContentProps = {
  contentPromise: ArticlePromise;
};

export function ArticleContent({ contentPromise }: ArticleContentProps) {
  const data = use(contentPromise);

  if (data?.metadata?.message) {
    const msg = data.metadata.message;
    // eslint-disable-next-line no-console
    console.log(`\x1b[90m[Notion]\x1b[0m \x1b[36m${msg}\x1b[0m`);
  }

  if (!data?.data) return null;

  return <RichTextRenderer content={data.data.md_content ?? data.data.content} />;
}
