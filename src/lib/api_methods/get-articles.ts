import { fetchDataCached, ApiResponse } from "@lib/fetch";
import type { Article } from "@lib/interfaces/articles";

function isApiResponse<T>(response: unknown): response is ApiResponse<T> {
  return (response as ApiResponse<T>).data !== undefined;
}

export async function getArticles<T>(): Promise<T> {
  const response = await fetchDataCached<T>("/articles");

  if (isApiResponse(response)) {
    return response.data;
  } else {
    return response.statusText as unknown as T;
  }
}

export async function getOneArticle(documentId: string) {
  const response = await fetchDataCached<Article>(`/articles/${documentId}`, {
    params: {
      populate: ["header"],
    },
  });

  if (isApiResponse(response)) {
    return response.data;
  } else {
    return response.statusText;
  }
}
