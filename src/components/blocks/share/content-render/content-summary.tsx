import type { ArticlePromise } from "@/lib/interfaces/articles";
import type { TalePromise } from "@/lib/interfaces/tales";
import { use } from "react";

type ArticleSummaryProps = {
  contentPromise: ArticlePromise | TalePromise;
};

export function ContentSummary({ contentPromise }: ArticleSummaryProps) {
  const contentPromiseData = use(contentPromise);

  if (!contentPromiseData) return null;

  const {
    data: { ...article },
  } = contentPromiseData;

  if (!article?.summary) return null;

  return <blockquote className="text-xl font-sans">{article.summary}</blockquote>;
}
