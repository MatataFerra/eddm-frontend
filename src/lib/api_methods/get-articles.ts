import { fetchDataCached } from "@lib/fetch/caller";
import type { Article } from "@lib/interfaces/articles";

export async function getArticles<T>(): Promise<T | null> {
  try {
    const response = await fetchDataCached<T>("/articles");

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function getOneArticle(query: string) {
  try {
    const response = await fetchDataCached<Article>(`/articles/${query}`);

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
