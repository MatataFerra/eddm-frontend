// debug-fetch.ts — util minimal para loguear y ver si una request salió del caché

type ParamValue = string | number | boolean | null | undefined;
export type FetchOptions = {
  params?: Record<string, ParamValue>;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  isExternalUrl?: boolean;
  headers?: Record<string, string>;
  tags?: string | string[];
  revalidate?: number;
};

const isDebugEnabled =
  process.env.NODE_ENV !== "production" ||
  process.env.DEBUG_FETCH === "1" ||
  process.env.DEBUG_FETCH === "true";

const seenInFlight = new Map<string, string>(); // key -> reqId

// ───────── helpers ─────────
const color = (s: string, code: number) => `\x1b[${code}m${s}\x1b[0m`;
const dim = (s: string) => color(s, 90);
const cyan = (s: string) => color(s, 36);
const yellow = (s: string) => color(s, 33);
const green = (s: string) => color(s, 32);
const red = (s: string) => color(s, 31);

const toArray = <T>(x?: T | T[]) => (Array.isArray(x) ? x : x != null ? [x] : []);
function pickDefaultTag(url: string | URL, isExternal?: boolean) {
  if (isExternal) return undefined;

  const u =
    typeof url === "string"
      ? url.startsWith("http")
        ? new URL(url)
        : new URL(url, "http://internal")
      : url;

  const seg = u.pathname.split("/").filter(Boolean)[0];
  return seg || undefined;
}

function makeKey(url: string | URL, init?: RequestInit, opts?: FetchOptions) {
  const u = typeof url === "string" ? url : url.toString();
  const { headers: _h, ...restInit } = init || {};
  const { headers: _h2, ...restOpts } = opts || {};
  return `${u}::${JSON.stringify(restInit)}::${JSON.stringify(restOpts)}`;
}

function logHit(
  kind: "HIT" | "CACHE" | "ERR",
  reqId: string,
  url: string | URL,
  init: RequestInit,
  opts: FetchOptions,
  ms?: number,
  extra?: string
) {
  if (!isDebugEnabled) return;
  const method = (init.method || "GET").toUpperCase();
  const tagList = toArray(opts.tags || pickDefaultTag(url, (opts as any).isExternalUrl));
  const r = opts.revalidate;
  const label = kind === "HIT" ? green("HIT") : kind === "CACHE" ? yellow("CACHE") : red("ERR");
  const head = `${label} ${cyan(reqId)} ${JSON.stringify([
    String(url),
    method,
    { tags: tagList, revalidate: r },
  ])}`;
  const tail =
    ms != null
      ? ` ${dim(`${ms.toFixed(1)}ms`)}${extra ? " " + dim(extra) : ""}`
      : extra
      ? " " + dim(extra)
      : "";
  console.log(`🔎 ${head}${tail}`);
}

// ───────── API ─────────

/**
 * debugFetch: envuelve `fetch` con logs; marca como CACHE si ve misma key (url+init+opts).
 * Combina `init.next.tags` con `opts.tags` y aplica `opts.revalidate` si no lo trae `init`.
 */
export async function debugFetch(
  url: string | URL,
  init: RequestInit = {},
  opts: FetchOptions = {}
): Promise<Response> {
  const key = makeKey(url, init, opts);
  const wasSeen = seenInFlight.has(key);
  const reqId = wasSeen
    ? seenInFlight.get(key)!
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  if (!wasSeen) seenInFlight.set(key, reqId);

  const defaultTag = pickDefaultTag(url, opts.isExternalUrl);
  const nextInInit: any = (init as any).next ?? {};
  const mergedTags = [
    ...new Set([
      ...toArray(opts.tags),
      ...toArray(nextInInit.tags),
      ...(defaultTag ? [defaultTag] : []),
    ]),
  ];
  const resolvedRevalidate =
    nextInInit.revalidate !== undefined ? nextInInit.revalidate : opts.revalidate;

  const finalInit: RequestInit & { next?: { tags?: string[]; revalidate?: number } } = {
    ...init,
    headers: {
      ...(init.headers || {}),
      "x-debug-req-id": reqId,
      "x-debug-key": key,
    },
    next: {
      ...(mergedTags.length ? { tags: mergedTags } : {}),
      ...(resolvedRevalidate !== undefined ? { revalidate: resolvedRevalidate } : {}),
      ...nextInInit,
    },
  };

  const t0 = performance.now();
  try {
    const res = await fetch(url, finalInit);
    const t1 = performance.now();
    const extra = `${res.status} ${res.headers.get("content-length") ?? ""}`.trim();
    logHit(
      wasSeen ? "CACHE" : "HIT",
      reqId,
      url,
      finalInit,
      { ...opts, tags: mergedTags, revalidate: resolvedRevalidate },
      t1 - t0,
      extra
    );
    return res;
  } catch (e: any) {
    const t1 = performance.now();
    logHit(
      "ERR",
      reqId,
      url,
      finalInit,
      { ...opts, tags: mergedTags, revalidate: resolvedRevalidate },
      t1 - t0,
      e?.message
    );
    throw e;
  } finally {
    seenInFlight.delete(key);
  }
}

/**
 * withDebug: envuelve una función async con logs begin/ok/err.
 */
export function withDebug<TArgs extends any[], TRes>(
  fn: (...args: TArgs) => Promise<TRes>,
  name = fn.name || "fn"
) {
  return async (...args: TArgs): Promise<TRes> => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const t0 = performance.now();
    if (isDebugEnabled) console.log(`${dim(`[${name}]`)} ${cyan(id)} start`, args);
    try {
      const out = await fn(...args);
      const t1 = performance.now();
      if (isDebugEnabled)
        console.log(
          `${dim(`[${name}]`)} ${green("OK")} ${cyan(id)} ${dim(`${(t1 - t0).toFixed(1)}ms`)}`
        );
      return out;
    } catch (e: any) {
      const t1 = performance.now();
      if (isDebugEnabled)
        console.log(
          `${dim(`[${name}]`)} ${red("ERR")} ${cyan(id)} ${dim(`${(t1 - t0).toFixed(1)}ms`)} ${
            e?.message ?? ""
          }`
        );
      throw e;
    }
  };
}
