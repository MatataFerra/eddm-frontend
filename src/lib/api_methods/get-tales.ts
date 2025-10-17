import { fetchDataCached } from "@lib/fetch/caller";
import type { Article } from "@lib/interfaces/articles";

export async function getTales<T>(): Promise<T | null> {
  try {
    const response = await fetchDataCached<T>("/tales");

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function getOneTale(query: string) {
  try {
    const response = await fetchDataCached<Article>(`/tales/${query}`);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
