import { fetchDataCached, ApiResponse } from "@lib/fetch";
import { generateToken } from "../services/jwt";
import { monthsOrdered } from "../utils";

function isApiResponse<T>(response: unknown): response is ApiResponse<T> {
  return (response as ApiResponse<T>).data !== undefined;
}

export async function getOrder<T>(): Promise<T> {
  const createToken = generateToken({
    user: process.env.TOKEN_USER,
    password: process.env.TOKEN_PASSWORD,
  });
  const response = await fetchDataCached<T>(process.env.NEXT_PUBLIC_API_GET_ORDER, {
    isExternalUrl: true,
    headers: {
      "x-token": createToken,
    },
  });

  if (isApiResponse(response)) {
    return response.data ? response.data : (monthsOrdered as unknown as T);
  } else {
    return response.statusText as unknown as T;
  }
}
