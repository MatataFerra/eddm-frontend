import { Suspense, use } from "react";
import type { ArticlePromise } from "@/lib/interfaces/articles";
import { FurtherTimeArticleHeader } from "@/components/blocks/further-in-time/further-render/further-time-article-header";
import {
  HeaderLoader,
  ContentLoader,
  SummaryLoader,
} from "@/components/blocks/share/content-render/content-skeleton";
import { objectIsEmpty } from "@/lib/utils";
import { notFound } from "next/navigation";
import { DesktopTableOfContents } from "@/components/blocks/navigation/desktop-table-of-contents";
import { ContentSummary } from "@/components/blocks/share/content-render/content-summary";
import { Content } from "@/components/blocks/share/content-render/content";

type ArticleRenderProps = {
  furtherTimeArticlePromise: ArticlePromise;
};

export function FurtherTimeArticleRender({ furtherTimeArticlePromise }: ArticleRenderProps) {
  const articleData = use(furtherTimeArticlePromise);

  if (!articleData || objectIsEmpty(articleData.data)) return notFound();

  return (
    <main className="relative min-h-dvh w-11/12 mx-auto">
      <section className="p-4">
        <div className="max-w-full">
          <Suspense fallback={<HeaderLoader />}>
            <FurtherTimeArticleHeader furtherTimeArticlePromise={furtherTimeArticlePromise} />
          </Suspense>
          <article className="max-w-xl mx-auto prose prose-h1:text-4xl prose-invert prose-ul:list-none">
            <Suspense fallback={<SummaryLoader />}>
              <ContentSummary contentPromise={furtherTimeArticlePromise} />
            </Suspense>
            <Suspense fallback={<ContentLoader />}>
              <Content contentPromise={furtherTimeArticlePromise} />
            </Suspense>
          </article>
          <DesktopTableOfContents />
        </div>
      </section>
    </main>
  );
}
