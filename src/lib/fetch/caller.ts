import "server-only";
import { debugFetch } from "@/lib/fetch/debug";
import { Article } from "@lib/interfaces/articles";
import { generateToken } from "../services/jwt";

type Methods = "GET" | "POST" | "PUT" | "DELETE";
type AvailableFields<T> = Exclude<keyof T, "cover" | "header" | "media" | "blocks">;
type Fields<T> = Array<AvailableFields<T>> | AvailableFields<T>;
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
  revalidate?: number;
};

export type ApiResponse<T> = {
  data: T;
  ok?: boolean;
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

declare global {
  // evitas TS error
  var __NET_HITS__: Map<string, number> | undefined;
}

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
  const { params = {}, method = "GET", isExternalUrl = false, fields, headers, tags } = opts;

  const formattedFields = formatFields(fields);
  const mergedParams: Record<string, ParamValue> = {
    ...params,
    ...(formattedFields && params.fields === undefined ? { fields: formattedFields } : {}),
  };

  const qs = new URLSearchParams(formatParams(mergedParams)).toString();
  const base = isExternalUrl ? String(url) : `${process.env.NEXT_PUBLIC_API_URL}/api${url}`;
  const fullUrl = qs ? `${base}${base.includes("?") ? "&" : "?"}${qs}` : base;

  const defaultTag = !isExternalUrl && typeof url === "string" ? url.split("/")[1] : undefined;
  const tagList = Array.isArray(tags) ? tags : tags ? [tags] : defaultTag ? [defaultTag] : [];

  const res = await debugFetch(fullUrl, {
    method,
    headers: {
      Authorization: AUTH,
      "Content-Type": "application/json",
      ...headers,
    },
    // 👇 Dejamos que el caller decida revalidate. Si NO lo pasa y arriba usás "use cache" + cacheLife,
    // no forzamos reglas conflictivas.
    next: {
      ...(tagList.length ? { tags: tagList } : {}),
    },
  });

  if (!res.ok) throw new Error(`Error en ${method} ${url}: ${res.status} ${res.statusText}`);
  return res.json();
}

export const fetchData = <T>(url: Url, opts?: FetchOptions) => _fetchData<T>(url, opts);
