import { fetchData } from "@lib/fetch/caller";
import { cacheTag, cacheLife } from "next/cache";
import { CACHE_TAGS, EXTERNAL_API_ENDPOINTS } from "@/lib/constants";
import { logError } from "@/lib/logger";

export async function getContentNavigateArticles<T>(): Promise<T | null> {
  "use cache";

  try {
    cacheTag(CACHE_TAGS.CONTENT_ARTICLES_NAVIGATE);
    cacheLife({ expire: 3600, stale: 300, revalidate: 60 });

    const response = await fetchData<T>(EXTERNAL_API_ENDPOINTS.ARTICLES_CONTENT_NAVIGATE, {
      tags: CACHE_TAGS.CONTENT_ARTICLES_NAVIGATE,
    });

    return response;
  } catch (error) {
    logError(error, { function: "getContentNavigateArticles" });
    return null;
  }
}
