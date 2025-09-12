import { fetchDataCached } from "@lib/fetch";
import { isApiResponse } from "./api-helpers";

export async function getSettings<T>(): Promise<T> {
  const response = await fetchDataCached<T>("/settings");

  if (isApiResponse(response)) {
    return response.data;
  } else {
    return response.statusText as unknown as T;
  }
}
