import type { ArticlePromise } from "@/lib/interfaces/articles";
import { use } from "react";
import { getNormalizedTitleText } from "@/lib/utils";
import React from "react";

type ArticleHeaderProps = {
  furtherTimeArticlePromise: ArticlePromise;
};

export function FurtherTimeArticleTitle({ furtherTimeArticlePromise }: ArticleHeaderProps) {
  const furtherTimeArticleData = use(furtherTimeArticlePromise);

  if (!furtherTimeArticleData) return null;

  const {
    data: { ...article },
  } = furtherTimeArticleData;

  return (
    <section className="flex items-center justify-center overflow-x-hidden p-8">
      <article>
        <h1 className="text-2xl md:text-5xl m-0 font-bold text-center text-white z-2">
          {article && `${getNormalizedTitleText(article.title)}`}
        </h1>
      </article>
    </section>
  );
}
