import { ArticleRender } from "@/components/blocks/articles/article-render/article-render";
import { APP_ROUTES } from "@/lib/constants";
import { MONTHS_ORDERED } from "@/lib/utils";
import { getArticleContentFromNotion } from "@/lib/api_methods/get-notion";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { Article } from "@/lib/interfaces/articles";
import type { ContentBySlug } from "@/lib/interfaces/share";
import { TOCProvider } from "@/lib/providers/toc-entry-provider";
import { Navigation } from "@/components/blocks/navigation/navigation";

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
