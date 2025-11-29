import { fetchData } from "@lib/fetch/caller";
import { CACHE_TAGS, EXTERNAL_API_ENDPOINTS } from "@/lib/constants";
import { cacheLife, cacheTag } from "next/cache";

export async function getIndexContent<T>(): Promise<T | null> {
  "use cache";

  cacheLife({ expire: 3600, stale: 300, revalidate: 60 });
  cacheTag(CACHE_TAGS.INDEX_CONTENT);

  try {
    const response = await fetchData<T>(EXTERNAL_API_ENDPOINTS.INDEX_CONTENT, {
      tags: CACHE_TAGS.INDEX_CONTENT,
    });

    return response;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
