import { TaleRender } from "@/components/blocks/tales/tale-render";
import { APP_ROUTES } from "@/lib/constants";
import type { ApiResponse } from "@/lib/fetch/caller";
import { getTaleContentFromNotion } from "@/lib/api_methods/get-notion";
import type { Tale } from "@/lib/interfaces/tales";
import type { ContentBySlug } from "@/lib/interfaces/share";
import { Navigation } from "@/components/blocks/navigation/navigation";

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
