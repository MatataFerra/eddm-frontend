import { Suspense, use } from "react";
import type { ArticlePromise } from "@/lib/interfaces/articles";
import { ArticleTitle } from "@/components/blocks/articles/article-render/article-title";
import { ArticleHeader } from "@/components/blocks/articles/article-render/article-header";
import { ArticleSummary } from "@/components/blocks/articles/article-render/article-summary";
import { ArticleContent } from "@/components/blocks/articles/article-render/article-content";
import {
  TitleLoader,
  HeaderLoader,
  ContentLoader,
  SummaryLoader,
} from "@/components/blocks/articles/article-render/article-skeleton";
import { objectIsEmpty } from "@/lib/utils";
import { notFound } from "next/navigation";

export type ArticleRenderProps = {
  articlePromise: ArticlePromise;
};

export function ArticleRender({ articlePromise }: ArticleRenderProps) {
  const articleData = use(articlePromise);

  if (objectIsEmpty(articleData?.data)) return notFound();

  return (
    <>
      <main className="relative min-h-dvh w-11/12 mx-auto">
        <Suspense fallback={<TitleLoader />}>
          <ArticleTitle articlePromise={articlePromise} />
        </Suspense>
        <section className="p-4">
          <div className="max-w-full">
            <Suspense fallback={<HeaderLoader />}>
              <ArticleHeader articlePromise={articlePromise} />
            </Suspense>
            <article className="max-w-xl mx-auto prose prose-h1:text-4xl prose-invert prose-ul:list-none">
              <Suspense fallback={<SummaryLoader />}>
                <ArticleSummary articlePromise={articlePromise} />
              </Suspense>
              <Suspense fallback={<ContentLoader />}>
                <ArticleContent contentPromise={articlePromise} />
              </Suspense>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
