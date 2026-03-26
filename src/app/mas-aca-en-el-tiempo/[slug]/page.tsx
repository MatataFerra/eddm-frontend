import type { Metadata } from "next";
import { APP_ROUTES } from "@/lib/constants";
import { getFurtherTimeArticlesContentFromNotion } from "@/lib/api_methods/get-notion";
import type { Article } from "@/lib/interfaces/articles";
import type { ContentBySlug } from "@/lib/interfaces/share";
import { TOCProvider } from "@/lib/providers/toc-entry-provider";
import { Navigation } from "@/components/blocks/navigation/navigation";
import { FurtherTimeArticleRender } from "@/components/blocks/further-in-time/further-render/further-render";
import { Suspense } from "react";
import { TOCItemsStream } from "@/components/blocks/navigation/toc-items-stream";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
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
  } catch {
    return {
      title: "Historias que están Pasando | El diario de Mati",
    };
  }
}

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const { slug } = pageParams;
  const articlePromise = getFurtherTimeArticlesContentFromNotion<ContentBySlug<Article>>({
    query: slug,
    strategy: "slug",
  });

  return (
    <TOCProvider>
      <Suspense fallback={null}>
        <TOCItemsStream articlePromise={articlePromise} />
      </Suspense>
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
