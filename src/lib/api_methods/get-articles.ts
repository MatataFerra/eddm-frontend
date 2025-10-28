import { fetchDataCached } from "@lib/fetch/caller";

export async function getArticles<T>(): Promise<T | null> {
  try {
    const response = await fetchDataCached<T>("/articles");

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function getContentNavigateArticles<T>(): Promise<T | null> {
  try {
    const response = await fetchDataCached<T>("/articles/content-navigate");

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function getOneArticle<T>(query: string): Promise<T | null> {
  try {
    const response = await fetchDataCached<T>(`/articles/${query}`);

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
