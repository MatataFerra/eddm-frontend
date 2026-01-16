import type { ArticlePromise } from "@/lib/interfaces/articles";
import { use } from "react";

type ArticleSummaryProps = {
  articlePromise: ArticlePromise;
};

export function ArticleSummary({ articlePromise }: ArticleSummaryProps) {
  const articlePromiseData = use(articlePromise);

  if (!articlePromiseData) return null;

  const {
    data: { ...article },
  } = articlePromiseData;

  if (!article?.summary) return null;

  return <blockquote className="text-xl font-sans">{article.summary}</blockquote>;
}
