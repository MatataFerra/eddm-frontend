import { fetchData } from "@lib/fetch/caller";
import { CACHE_TAGS, EXTERNAL_API_ENDPOINTS } from "@/lib/constants";
import { cacheLife, cacheTag } from "next/cache";

export async function getSettings<T>(): Promise<T | null> {
  "use cache";

  cacheLife({ expire: 3600, stale: 300, revalidate: 60 });
  cacheTag(CACHE_TAGS.SETTINGS);

  try {
    const response = await fetchData<T>(EXTERNAL_API_ENDPOINTS.SETTINGS, {
      tags: CACHE_TAGS.SETTINGS,
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
