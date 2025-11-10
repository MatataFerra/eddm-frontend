"use cache";

import { Suspense } from "react";
import type { Tale } from "@/lib/interfaces/articles";
import { TaleSummary } from "@/components/blocks/tales/tale-summary";
import { TaleHeader } from "@/components/blocks/tales/tale-header";
import { TaleContent } from "@/components/blocks/tales/tale-content";
import {
  HeaderLoader,
  SummaryLoader,
  ContentLoader,
} from "@/components/blocks/tales/tale-skeleton";
import type { ApiResponse } from "@/lib/fetch/caller";
import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/constants";

type TaleRenderProps = {
  tale: Promise<ApiResponse<Tale> | null>;
  content: Promise<ApiResponse<string> | null>;
};

export async function TaleRender({ tale, content }: TaleRenderProps) {
  cacheLife({ expire: 3600, stale: 300, revalidate: 60 });
  cacheTag(CACHE_TAGS.TALE_RENDER);
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
            <TaleContent contentPromise={content} />
          </Suspense>
        </article>
      </section>
    </>
  );
}
