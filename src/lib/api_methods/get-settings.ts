import { fetchDataCached } from "@lib/fetch/caller";

export async function getSettings<T>(): Promise<T | null> {
  try {
    const response = await fetchDataCached<T>("/settings");
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
