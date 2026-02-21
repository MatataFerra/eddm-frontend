import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, EXTERNAL_API_ENDPOINTS } from "@/lib/constants";
import { fetchData } from "@lib/fetch/caller";

export async function getContentNavigateFurtherTimeArticles<T>(): Promise<T | null> {
  "use cache";

  try {
    cacheTag(CACHE_TAGS.CONTENT_FURTHER_TIME_NAVIGATE);
    cacheLife({ expire: 3600, stale: 300, revalidate: 60 });

    const response = await fetchData<T>(EXTERNAL_API_ENDPOINTS.FURTHER_TIME_CONTENT_NAVIGATE, {
      tags: CACHE_TAGS.CONTENT_FURTHER_TIME_NAVIGATE,
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

