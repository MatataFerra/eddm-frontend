import { fetchData } from "@lib/fetch/caller";
import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, EXTERNAL_API_ENDPOINTS } from "@/lib/constants";

export async function getTales<T>(): Promise<T | null> {
  "use cache";

  cacheLife({ expire: 3600, stale: 300, revalidate: 60 });
  cacheTag(CACHE_TAGS.TALES);

  try {
    const response = await fetchData<T>(EXTERNAL_API_ENDPOINTS.TALES, {
      tags: CACHE_TAGS.TALES,
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function getContentNavigateTales<T>(): Promise<T | null> {
  "use cache";

  try {
    cacheTag(CACHE_TAGS.CONTENT_TALES_NAVIGATE);
    cacheLife({ expire: 3600, stale: 300, revalidate: 60 });

    const response = await fetchData<T>(EXTERNAL_API_ENDPOINTS.TALES_CONTENT_NAVIGATE, {
      tags: CACHE_TAGS.CONTENT_TALES_NAVIGATE,
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function getOneTale<T>(query: string): Promise<T | null> {
  "use cache";

  try {
    cacheLife({ expire: 3600, stale: 300, revalidate: 60 });
    cacheTag(CACHE_TAGS.TALE(query));

    const response = await fetchData<T>(EXTERNAL_API_ENDPOINTS.TALE(query), {
      tags: CACHE_TAGS.TALE(query),
      // sin revalidate aquí, porque lo controla cacheLife arriba
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
