import { TaleRender } from "@/components/blocks/tales/tale-render";
import { notFound } from "next/navigation";
import type { ApiResponse } from "@/lib/fetch/caller";
import { getTaleContentFromNotion } from "@/lib/api_methods/get-notion";
import { FALLBACK_SLUG } from "@/lib/constants";
import type { NotionTaleContentBySlug } from "@/lib/interfaces/tales";

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const { slug } = pageParams;
  const talePromise = getTaleContentFromNotion<ApiResponse<NotionTaleContentBySlug>>({
    query: slug,
    strategy: "slug",
  });

  if (slug === FALLBACK_SLUG) {
    notFound();
  }

  return <TaleRender tale={talePromise} />;
}
