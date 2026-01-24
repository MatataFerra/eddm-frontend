import { fetchData } from "@lib/fetch/caller";
import { cacheTag, cacheLife } from "next/cache";
import { CACHE_TAGS, EXTERNAL_API_ENDPOINTS } from "@/lib/constants";

export async function getStats<T>(): Promise<T | null> {
  "use cache";

  cacheLife("minutes");
  cacheTag(CACHE_TAGS.STATS);

  try {
    const response = await fetchData<T>(EXTERNAL_API_ENDPOINTS.STATS, {
      tags: CACHE_TAGS.STATS,
    });

    return response;
  } catch {
    return null;
  }
}
