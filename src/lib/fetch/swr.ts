export async function swrFetcher<T>(key: string | [string, Record<string, unknown>?]): Promise<T> {
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
  const res = await fetch(url);
  if (!res.ok) {
    const err = new Error(`Fetch failed ${res.status}`);
    (err as Error & { status?: number }).status = res.status;
    throw err;
  }
  return res.json() as Promise<T>;
}
