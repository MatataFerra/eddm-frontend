import { fetchData } from "@lib/fetch/caller";
import { CACHE_TAGS, EXTERNAL_API_ENDPOINTS } from "@/lib/constants";
import { cacheLife, cacheTag } from "next/cache";

export async function getTrip<T>(): Promise<T | null> {
  "use cache";

  cacheLife({ expire: 3600, stale: 300, revalidate: 60 });
  cacheTag(CACHE_TAGS.TRIP);
  try {
    const response = await fetchData<T>(EXTERNAL_API_ENDPOINTS.TRIP, {
      tags: CACHE_TAGS.TRIP,
    });

    return response;
  } catch {
    return null;
  }
}
