import { TaleRender } from "@/components/blocks/tales/tale-render";
import type { ApiResponse } from "@/lib/fetch/caller";
import { getTaleContentFromNotion } from "@/lib/api_methods/get-notion";
import type { Tale } from "@/lib/interfaces/tales";
import type { ContentBySlug } from "@/lib/interfaces/share";

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const { slug } = pageParams;
  const talePromise = getTaleContentFromNotion<ApiResponse<ContentBySlug<Tale>>>({
    query: slug,
    strategy: "slug",
  });

  return <TaleRender tale={talePromise} />;
}
