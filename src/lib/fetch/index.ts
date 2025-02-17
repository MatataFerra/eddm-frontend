import { cache } from "react";

type Methods = "GET" | "POST" | "PUT" | "DELETE";
type Params = Record<string, string | string[]>;
type Url = string;

type FetchOptions = {
  method?: Methods;
  params?: Params;
};

type StrapiResponse<T> = {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
};

export async function fetchData<T>(
  url: Url,
  { params, method }: FetchOptions = { method: "GET" }
): Promise<StrapiResponse<T>> {
  const formatParams = (params: Record<string, string | string[]>): Record<string, string> => {
    const formatted: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formatted[`${key}[${item}]`] = "true";
        });
      } else if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          formatted[`${key}[${subKey}]`] = String(subValue);
        });
      } else {
        formatted[key] = String(value);
      }
    });

    return formatted;
  };

  // Construir query params
  const buildParams = params ? `?${new URLSearchParams(formatParams(params)).toString()}` : "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api${url}${buildParams}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Error en ${method} ${url}: ${res.status} ${res.statusText}`);
  }

  const response = await res.json();

  return response;
}

export const fetchDataCached = cache(fetchData);
