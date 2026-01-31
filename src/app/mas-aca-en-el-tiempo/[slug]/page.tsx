import { APP_ROUTES } from "@/lib/constants";
import { getFurtherTimeArticlesContentFromNotion } from "@/lib/api_methods/get-notion";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { Article } from "@/lib/interfaces/articles";
import type { ContentBySlug } from "@/lib/interfaces/share";
import { TOCProvider } from "@/lib/providers/toc-entry-provider";
import { Navigation } from "@/components/blocks/navigation/navigation";
import { FurtherTimeArticleRender } from "@/components/blocks/further-in-time/further-render/further-render";

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const { slug } = pageParams;
  const articlePromise = getFurtherTimeArticlesContentFromNotion<
    ApiResponse<ContentBySlug<Article>>
  >({
    query: slug,
    strategy: "slug",
  });

  return (
    <TOCProvider articlePromise={articlePromise}>
      <FurtherTimeArticleRender furtherTimeArticlePromise={articlePromise} />
      <Navigation
        redirect={APP_ROUTES.furtherTime}
        typeOfOrder={[
          {
            type: "category",
            name: "further",
          },
        ]}
      />
    </TOCProvider>
  );
}
