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
  { params = {}, method = "GET", isExternalUrl = false, fields, headers }: FetchOptions = {}
): Promise<ApiResponse<T> | NextResponse<{ message: string }>> {
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

  try {
    const res = await fetch(fullUrl, {
      method,
      headers: {
        Authorization: `Bearer ${createToken}`,
        "Content-Type": "application/json",
        ...headers,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" });
  }
}

// Versión con cache
export const fetchDataCached = cache(fetchData);
