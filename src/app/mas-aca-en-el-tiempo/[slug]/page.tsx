import type { Metadata } from "next";
import { APP_ROUTES } from "@/lib/constants";
import { getFurtherTimeArticlesContentFromNotion } from "@/lib/api_methods/get-notion";
import type { Article } from "@/lib/interfaces/articles";
import type { ContentBySlug } from "@/lib/interfaces/share";
import { TOCProvider } from "@/lib/providers/toc-entry-provider";
import { Navigation } from "@/components/blocks/navigation/navigation";
import { FurtherTimeArticleRender } from "@/components/blocks/further-in-time/further-render/further-render";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getFurtherTimeArticlesContentFromNotion<ContentBySlug<Article>>({
    query: slug,
    strategy: "slug",
  });

  return {
    title: data?.data?.title
      ? `${data.data.title} | El diario de Mati`
      : "Historias que están Pasando | El diario de Mati",
    description: data?.data?.description ?? data?.data?.summary ?? undefined,
  };
}

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const { slug } = pageParams;
  const articlePromise = getFurtherTimeArticlesContentFromNotion<ContentBySlug<Article>>({
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
