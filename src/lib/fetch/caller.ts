import "server-only";
import { unstable_cache } from "next/cache";
import { Article } from "@lib/interfaces/articles";
import { generateToken } from "../services/jwt";

export type Methods = "GET" | "POST" | "PUT" | "DELETE";
export type Params = Partial<keyof PopulateOptions> | Partial<keyof PopulateOptions>[];
type PopulateOptions = Pick<Article, "cover" | "header" | "media">;
type AvailableFields<T> = Exclude<keyof T, "cover" | "header" | "media" | "blocks">;
export type Fields<T> = Array<AvailableFields<T>> | AvailableFields<T>;
type Url = string;
type Flat = string | number | boolean;
type ParamValue = Flat | Flat[] | Record<string, unknown>;

type FetchOptions = {
  method?: Methods;
  params?: Record<string, ParamValue>;
  fields?: Fields<Article>;
  isExternalUrl?: boolean;
  headers?: Record<string, string>;
  tags?: string;
};

function formatFields(fields?: Fields<Article>): string | undefined {
  if (!fields) return undefined;
  return Array.isArray(fields) ? fields.join(",") : fields;
}

const formatParams = (params: Record<string, ParamValue>): Record<string, string> => {
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

const AUTH = (() => {
  return `Bearer ${generateToken({
    user: process.env.TOKEN_USER,
    password: process.env.TOKEN_PASSWORD,
  })}`;
})();

async function _fetchData<T>(url: Url, opts: FetchOptions = {}): Promise<T> {
  const { params = {}, method = "GET", isExternalUrl = false, fields, headers } = opts;

  const formattedFields = formatFields(fields);
  const mergedParams: Record<string, ParamValue> = {
    ...params,
    ...(formattedFields && params.fields === undefined ? { fields: formattedFields } : {}),
  };

  const qs = new URLSearchParams(formatParams(mergedParams)).toString();
  const base = isExternalUrl ? String(url) : `${process.env.NEXT_PUBLIC_API_URL}/api${url}`;
  const fullUrl = qs ? `${base}${base.includes("?") ? "&" : "?"}${qs}` : base;

  const res = await fetch(fullUrl, {
    method,
    headers: {
      Authorization: AUTH,
      "Content-Type": "application/json",
      ...headers,
    },
    next: { revalidate: 600 },
  });

  if (!res.ok) throw new Error(`Error en ${method} ${url}: ${res.status} ${res.statusText}`);
  return res.json();
}

// cache cross-request + tag para invalidar
export const fetchData = <T>(url: Url, opts?: FetchOptions) => _fetchData<T>(url, opts);

export const fetchDataCached = <T>(url: Url, opts?: FetchOptions) =>
  unstable_cache(
    () => _fetchData<T>(url, opts),
    [`fetch:${typeof url === "string" ? url : JSON.stringify(url)}:${JSON.stringify(opts ?? {})}`],
    { revalidate: 600, tags: [opts?.tags ?? url.split("/")[1]] }
  )();
