import { Suspense } from "react";
import type { Tale } from "@/lib/interfaces/articles";
import { TaleSummary } from "@/components/blocks/tales/tale-summary";
import { TaleHeader } from "@/components/blocks/tales/tale-header";
import { TaleContent } from "@/components/blocks/tales/tale-content";
import type { ApiResponse } from "@/lib/fetch/caller";

type TaleRenderProps = {
  tale: Promise<ApiResponse<Tale> | null>;
  content: Promise<ApiResponse<string> | null>;
};

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-slate-700/30 ${className}`} />;
}

// ---- Loaders
export function HeaderLoader() {
  return (
    <header className="grid grid-cols-1 grid-rows-1 min-h-96 max-h-96 m-8 relative overflow-hidden rounded-2xl">
      <Skeleton className="col-start-1 col-end-2 row-start-1 row-end-auto h-80" />
      <Skeleton className="col-start-1 col-end-2 row-start-1 row-end-auto h-10 w-2/3 mx-auto self-center z-10" />
    </header>
  );
}

export function SummaryLoader() {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-2">
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  );
}

export function ContentLoader() {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-3">
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-10/12" />
      <Skeleton className="h-4 w-9/12" />
      <Skeleton className="h-4 w-8/12" />
      <Skeleton className="h-4 w-7/12" />
      <Skeleton className="h-4 w-6/12" />
      <Skeleton className="h-4 w-5/12" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-10/12" />
      <Skeleton className="h-4 w-9/12" />
      <Skeleton className="h-4 w-8/12" />
      <Skeleton className="h-4 w-7/12" />
      <Skeleton className="h-4 w-6/12" />
    </div>
  );
}

export async function TaleRender({ tale, content }: TaleRenderProps) {
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
