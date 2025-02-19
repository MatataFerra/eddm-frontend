import { cache } from "react";
import { Article } from "@lib/interfaces/articles";

export type Methods = "GET" | "POST" | "PUT" | "DELETE";
export type Params = Partial<keyof PopulateOptions> | Partial<keyof PopulateOptions>[];
type PopulateOptions = Pick<Article, "cover" | "header" | "media" | "blocks">;
type AvailableFields<T> = Exclude<keyof T, "cover" | "header" | "media" | "blocks">;
export type Fields<T> = Array<AvailableFields<T>> | AvailableFields<T>;
type Url = string;

type FetchOptions = {
  method?: Methods;
  params?: {
    populate?: Params | "*";
  };
  fields?: Fields<Article>;
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

function formatFields(fields?: Fields<Article>): string | undefined {
  if (!fields) return undefined;
  return Array.isArray(fields) ? fields.join(",") : fields;
}

const formatPopulate = (populate?: Params | "*"): Record<string, string> => {
  const formatted: Record<string, string> = {};

  if (Array.isArray(populate)) {
    populate.forEach((item) => {
      formatted[`populate[${item}]`] = "true";
    });
  } else if (typeof populate === "string") {
    if (populate === "*") return { populate: "*" };

    formatted[`populate[${populate}]`] = "true";
  }

  return formatted;
};

const formatParams = (
  params: Record<string, string | string[] | Record<string, unknown>>
): Record<string, string> => {
  const formatted: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formatted[key] = value.join(",");
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

export async function fetchData<T>(
  url: Url,
  { params = {}, method = "GET", fields }: FetchOptions = {}
): Promise<StrapiResponse<T>> {
  const formattedFields = formatFields(fields);
  const formattedPopulate = formatPopulate(params.populate);

  const mergedParams = {
    ...formattedPopulate,
    ...(formattedFields ? { fields: formattedFields } : {}),
  };

  const queryString = new URLSearchParams(formatParams(mergedParams)).toString();
  const fullUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api${url}${
    queryString ? `?${queryString}` : ""
  }`;

  const res = await fetch(fullUrl, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    // next: {
    //   revalidate: 300,
    // },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Error en ${method} ${url}: ${res.status} ${res.statusText}`);
  }

  const response = await res.json();
  return response;
}

// Versión con cache
export const fetchDataCached = cache(fetchData);
