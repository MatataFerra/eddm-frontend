import type { Metadata } from "next";
import { ArticleRender } from "@/components/blocks/articles/article-render/article-render";
import { APP_ROUTES } from "@/lib/constants";
import { MONTHS_ORDERED } from "@/lib/utils";
import { getArticleContentFromNotion } from "@/lib/api_methods/get-notion";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { Article } from "@/lib/interfaces/articles";
import type { ContentBySlug } from "@/lib/interfaces/share";
import { TOCProvider } from "@/lib/providers/toc-entry-provider";
import { Navigation } from "@/components/blocks/navigation/navigation";
import { Suspense } from "react";
import { TOCItemsStream } from "@/components/blocks/navigation/toc-items-stream";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await getArticleContentFromNotion<ApiResponse<ContentBySlug<Article>>>({
      query: slug,
      strategy: "slug",
    });

    return {
      title: data?.data?.title
        ? `${data.data.title} | El diario de Mati`
        : "El diario de Mati",
      description: data?.data?.description ?? data?.data?.summary ?? undefined,
    };
  } catch {
    return {
      title: "El diario de Mati",
    };
  }
}

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const { slug } = pageParams;
  const articlePromise = getArticleContentFromNotion<ApiResponse<ContentBySlug<Article>>>({
    query: slug,
    strategy: "slug",
  });

  return (
    <TOCProvider>
      <Suspense fallback={null}>
        <TOCItemsStream articlePromise={articlePromise} />
      </Suspense>
      <ArticleRender articlePromise={articlePromise} />
      <Navigation redirect={APP_ROUTES.journey} typeOfOrder={MONTHS_ORDERED} />
    </TOCProvider>
  );
}
