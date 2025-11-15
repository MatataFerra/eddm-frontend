"use cache";

import { Suspense } from "react";
import type { TalePromise } from "@/lib/interfaces/tales";
import { TaleSummary } from "@/components/blocks/tales/tale-summary";
import { TaleHeader } from "@/components/blocks/tales/tale-header";
import { TaleContent } from "@/components/blocks/tales/tale-content";
import {
  HeaderLoader,
  SummaryLoader,
  ContentLoader,
} from "@/components/blocks/tales/tale-skeleton";
import { notFound } from "next/navigation";
import { objectIsEmpty } from "@/lib/utils";

type TaleRenderProps = {
  tale: TalePromise;
};

export async function TaleRender({ tale }: TaleRenderProps) {
  const taleData = await tale;

  if (objectIsEmpty(taleData?.data)) return notFound();

  return (
    <>
      <section className="relative mb-40">
        <Suspense fallback={<HeaderLoader />}>
          <TaleHeader talePromise={tale} />
        </Suspense>
        <article className="max-w-xl mx-auto prose prose-h1:text-4xl prose-invert p-4">
          <Suspense fallback={<SummaryLoader />}>
            <TaleSummary talePromise={tale} />
          </Suspense>
          <Suspense fallback={<ContentLoader />}>
            <TaleContent contentPromise={tale} />
          </Suspense>
        </article>
      </section>
    </>
  );
}
