import { fetchDataOnClient } from "@lib/fetch/";
import { isApiResponse } from "./api-helpers";

export async function getIndexContent<T>(): Promise<T> {
  const response = await fetchDataOnClient<T>("/index-content", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (isApiResponse(response)) {
    return response.data;
  } else {
    return response.statusText as unknown as T;
  }
}
