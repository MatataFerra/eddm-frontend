import type { ApiResponse } from "@/lib/fetch/caller";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { getContentNavigateFurtherTimeArticles } from "@/lib/api_methods/get-further-time-articles";
import { MasonryFurther } from "@/components/blocks/further-in-time/masonry";

export function ResolvedFurtherArticles() {
  const furtherPromise = getContentNavigateFurtherTimeArticles<ApiResponse<ContentNavigate[]>>();
  return <MasonryFurther furtherPromise={furtherPromise} />;
}
