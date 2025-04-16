import { fetchDataCached } from "@lib/fetch";
import type { Article } from "@lib/interfaces/articles";
import { isApiResponse } from "./api-helpers";

export async function getTales<T>(): Promise<T> {
  const response = await fetchDataCached<T>("/tales");

  if (isApiResponse(response)) {
    return response.data;
  } else {
    return response.statusText as unknown as T;
  }
}

export async function getOneTale(query: string) {
  const response = await fetchDataCached<Article>(`/tales/${query}`);

  if (isApiResponse(response)) {
    return response.data;
  } else {
    return response.statusText;
  }
}
