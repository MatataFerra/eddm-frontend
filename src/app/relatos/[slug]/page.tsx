import { TaleRender } from "@/components/blocks/tales/tale-render";
import type { ApiResponse } from "@/lib/fetch/caller";
import { getTaleContentFromNotion } from "@/lib/api_methods/get-notion";
import type { NotionTaleContentBySlug } from "@/lib/interfaces/tales";

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const { slug } = pageParams;
  const talePromise = getTaleContentFromNotion<ApiResponse<NotionTaleContentBySlug>>({
    query: slug,
    strategy: "slug",
  });

  return <TaleRender tale={talePromise} />;
}
