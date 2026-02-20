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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
}

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const { slug } = pageParams;
  const articlePromise = getArticleContentFromNotion<ApiResponse<ContentBySlug<Article>>>({
    query: slug,
    strategy: "slug",
  });

  return (
    <TOCProvider articlePromise={articlePromise}>
      <ArticleRender articlePromise={articlePromise} />
      <Navigation redirect={APP_ROUTES.journey} typeOfOrder={MONTHS_ORDERED} />
    </TOCProvider>
  );
}
