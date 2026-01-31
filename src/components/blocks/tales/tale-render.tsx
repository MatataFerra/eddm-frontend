import { Suspense, use } from "react";
import type { TalePromise } from "@/lib/interfaces/tales";
import { TaleHeader } from "@/components/blocks/tales/tale-header";
import {
  HeaderLoader,
  ContentLoader,
  SummaryLoader,
} from "@/components/blocks/share/content-render/content-skeleton";
import { notFound } from "next/navigation";
import { objectIsEmpty } from "@/lib/utils";
import { Content } from "@/components/blocks/share/content-render/content";
import { ContentSummary } from "@/components/blocks/share/content-render/content-summary";

type TaleRenderProps = {
  tale: TalePromise;
};

export function TaleRender({ tale }: TaleRenderProps) {
  const taleData = use(tale);

  if (objectIsEmpty(taleData?.data)) return notFound();

  return (
    <>
      <section className="relative mb-40">
        <Suspense fallback={<HeaderLoader />}>
          <TaleHeader talePromise={tale} />
        </Suspense>
        <article className="max-w-xl mx-auto prose prose-h1:text-4xl prose-invert p-4">
          <Suspense fallback={<SummaryLoader />}>
            <ContentSummary contentPromise={tale} />
          </Suspense>
          <Suspense fallback={<ContentLoader />}>
            <Content contentPromise={tale} />
          </Suspense>
        </article>
      </section>
    </>
  );
}
