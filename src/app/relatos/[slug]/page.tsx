import type { Metadata } from "next";
import { TaleRender } from "@/components/blocks/tales/tale-render";
import { APP_ROUTES } from "@/lib/constants";
import type { ApiResponse } from "@/lib/fetch/caller";
import { getTaleContentFromNotion } from "@/lib/api_methods/get-notion";
import type { Tale } from "@/lib/interfaces/tales";
import type { ContentBySlug } from "@/lib/interfaces/share";
import { Navigation } from "@/components/blocks/navigation/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getTaleContentFromNotion<ApiResponse<ContentBySlug<Tale>>>({
    query: slug,
    strategy: "slug",
  });

  return {
    title: data?.data?.title
      ? `${data.data.title} | El diario de Mati`
      : "Relatos y escritos | El diario de Mati",
    description: data?.data?.description ?? data?.data?.summary ?? undefined,
  };
}

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const { slug } = pageParams;
  const talePromise = getTaleContentFromNotion<ApiResponse<ContentBySlug<Tale>>>({
    query: slug,
    strategy: "slug",
  });

  return (
    <>
      <TaleRender tale={talePromise} />
      <Navigation
        redirect={APP_ROUTES.tales}
        typeOfOrder={[
          {
            type: "category",
            name: "tale",
          },
        ]}
      />
    </>
  );
}
