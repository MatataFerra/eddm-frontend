import { fetchData } from "@/lib/fetch/caller";
import { CACHE_TAGS, EXTERNAL_API_ENDPOINTS, NOTION_PARAM_KEY } from "@/lib/constants";
import { cacheLife, cacheTag } from "next/cache";

type GetNotionContentType = {
  strategy: "slug" | "notionPageId";
  query?: string;
};

export async function getTaleContentFromNotion<T>({
  strategy,
  query,
}: GetNotionContentType): Promise<T | null> {
  "use cache";

  if (!query) return null;

  cacheLife({ expire: 3600, stale: 300, revalidate: 60 });
  cacheTag(CACHE_TAGS.NOTION_TALE(query));

  try {
    const response = await fetchData<T>(EXTERNAL_API_ENDPOINTS.NOTION_TALE, {
      params: { [NOTION_PARAM_KEY.slug]: query, strategy },
      tags: CACHE_TAGS.NOTION_TALE(query),
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
