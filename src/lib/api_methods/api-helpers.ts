import { ApiResponse } from "@lib/fetch";
export function isApiResponse<T>(response: unknown): response is ApiResponse<T> {
  return (response as ApiResponse<T>).data !== undefined;
}
