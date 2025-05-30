import { fetchDataCached } from "@lib/fetch";
import type { Article } from "@lib/interfaces/articles";
import { isApiResponse } from "./api-helpers";

export async function getArticles<T>(): Promise<T> {
  const response = await fetchDataCached<T>("/articles");

  if (isApiResponse(response)) {
    return response.data;
  } else {
    return response.statusText as unknown as T;
  }
}

export async function getOneArticle(query: string) {
  const response = await fetchDataCached<Article>(`/articles/${query}`);

  if (isApiResponse(response)) {
    return response.data;
  } else {
    return response.statusText;
  }
}
