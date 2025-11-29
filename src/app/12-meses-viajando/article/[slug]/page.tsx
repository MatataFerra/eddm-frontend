import { ArticleRender } from "@/components/blocks/articles/article-render/article-render";
import { NavigationWrapper } from "@/components/blocks/navigation/navigation-wrapper";
import { APP_ROUTES } from "@/lib/constants";
import { MONTHS_ORDERED } from "@/lib/utils";
import { getArticleContentFromNotion } from "@/lib/api_methods/get-notion";
import type { ApiResponse } from "@/lib/fetch/caller";
import { Article } from "@/lib/interfaces/articles";
import type { ContentBySlug } from "@/lib/interfaces/share";

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const { slug } = pageParams;
  const articlePromise = getArticleContentFromNotion<ApiResponse<ContentBySlug<Article>>>({
    query: slug,
    strategy: "slug",
  });

  return (
    <>
      <ArticleRender articlePromise={articlePromise} />
      <NavigationWrapper redirect={APP_ROUTES.journey} typeOfOrder={MONTHS_ORDERED} />
    </>
  );
}
