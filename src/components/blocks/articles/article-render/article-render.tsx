import { Suspense, use } from "react";
import type { ArticlePromise } from "@/lib/interfaces/articles";
import { ArticleTitle } from "@/components/blocks/articles/article-render/article-title";
import { ArticleHeader } from "@/components/blocks/articles/article-render/article-header";
import {
  TitleLoader,
  HeaderLoader,
  ContentLoader,
  SummaryLoader,
} from "@/components/blocks/share/content-render/content-skeleton";
import { objectIsEmpty } from "@/lib/utils";
import { notFound } from "next/navigation";
import { DesktopTableOfContents } from "@/components/blocks/navigation/desktop-table-of-contents";
import { ContentSummary } from "@/components/blocks/share/content-render/content-summary";
import { Content } from "@/components/blocks/share/content-render/content";
import { MarkAsReadButton } from "./mark-as-read-button";

type ArticleRenderProps = {
  articlePromise: ArticlePromise;
};

export function ArticleRender({ articlePromise }: ArticleRenderProps) {
  const articleData = use(articlePromise);

  if (!articleData || objectIsEmpty(articleData.data)) return notFound();

  return (
    <main className="relative min-h-dvh w-11/12 mx-auto">
      <Suspense fallback={<TitleLoader />}>
        <ArticleTitle articlePromise={articlePromise} />
      </Suspense>

      <section className="p-4">
        <div className="max-w-full">
          <Suspense fallback={<HeaderLoader />}>
            <ArticleHeader articlePromise={articlePromise} />
          </Suspense>
          <article className="max-w-2xl mx-auto prose prose-h1:text-4xl prose-invert prose-ul:list-none">
            <Suspense fallback={<SummaryLoader />}>
              <ContentSummary contentPromise={articlePromise} />
            </Suspense>
            <Suspense fallback={<ContentLoader />}>
              <Content contentPromise={articlePromise} />
            </Suspense>
            <MarkAsReadButton />
          </article>
          <DesktopTableOfContents />
        </div>
      </section>
    </main>
  );
}
