import { fetchDataCached } from "../fetch/caller";

export async function getTaleContentFromNotion<T>(query?: string): Promise<T | null> {
  if (!query) return null;

  try {
    const response = await fetchDataCached<T>(`/notion/tale`, {
      params: { "notion-page-id": query },
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
