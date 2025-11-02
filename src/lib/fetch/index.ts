import { cache } from "react";
import { Article } from "@lib/interfaces/articles";
import { NextResponse } from "next/server";
import { generateToken } from "../services/jwt";

export type Methods = "GET" | "POST" | "PUT" | "DELETE";
export type Params = Partial<keyof PopulateOptions> | Partial<keyof PopulateOptions>[];
type PopulateOptions = Pick<Article, "cover" | "header" | "media">;
type AvailableFields<T> = Exclude<keyof T, "cover" | "header" | "media" | "blocks">;
export type Fields<T> = Array<AvailableFields<T>> | AvailableFields<T>;
type Url = string;

type FetchOptions = {
  method?: Methods;
  params?: {
    populate?: Params | "*";
  };
  fields?: Fields<Article>;
  isExternalUrl?: boolean;
  headers?: Record<string, string>;
};

export type ApiResponse<T> = {
  data: T;
  metadata: {
    message: string;
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

export async function fetchDataOnClient<T>(
  url: Url,
  { method = "GET", isExternalUrl = false, headers }: FetchOptions = {}
): Promise<ApiResponse<T> | NextResponse<{ message: string }>> {
  const fullUrl = isExternalUrl ? url : `${process.env.NEXT_PUBLIC_API_URL}/api${url}`;

  try {
    const res = await fetch(fullUrl, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!res.ok) {
      throw new Error(`Error en ${method} ${url}: ${res.status} ${res.statusText}`);
    }

    const response = await res.json();
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" });
  }
}

export async function fetchData<T>(
  url: Url,
  { params = {}, method = "GET", isExternalUrl = false, fields, headers }: FetchOptions = {}
): Promise<T> {
  if (typeof window !== "undefined") {
    throw new Error("fetchData is server-only");
  }

  const formattedFields = formatFields(fields);
  const formattedPopulate = formatPopulate(params.populate);
  const createToken = generateToken({
    user: process.env.TOKEN_USER,
    password: process.env.TOKEN_PASSWORD,
  });

  const mergedParams = {
    ...formattedPopulate,
    ...(formattedFields ? { fields: formattedFields } : {}),
  };

  const queryString = new URLSearchParams(formatParams(mergedParams)).toString();
  const fullUrl = isExternalUrl
    ? url
    : `${process.env.NEXT_PUBLIC_API_URL}/api${url}${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(fullUrl, {
    method,
    headers: {
      Authorization: `Bearer ${createToken}`,
      "Content-Type": "application/json",
      ...headers,
    },
    next: {
      revalidate: 600,
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Error en ${method} ${url}: ${res.status} ${res.statusText}`);
  }

  const response = await res.json();
  return response;
}

// Versión con cache
export const fetchDataCached = cache(fetchData);

// Fetch para SWR
export async function swrFetcher<T>(key: string | [string, Record<string, unknown>?]): Promise<T> {
  // key puede ser string o tuple; soportemos ambos
  let path: string,
    qs = "";
  if (Array.isArray(key)) {
    path = key[0];
    const params = key[1] ?? {};
    qs = new URLSearchParams(params as Record<string, string>).toString();
  } else {
    path = key;
  }

  const url = `/api/proxy?path=${encodeURIComponent(path)}${
    qs ? `&qs=${encodeURIComponent(qs)}` : ""
  }`;
  const res = await fetch(url); // navegador
  if (!res.ok) {
    const err = new Error(`Fetch failed ${res.status}`);
    (err as Error & { status?: number }).status = res.status;
    throw err; // SWR manejará error
  }
  return res.json() as Promise<T>;
}
