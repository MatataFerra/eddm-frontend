import { fetchDataCached } from "@lib/fetch/caller";

export async function getTales<T>(): Promise<T | null> {
  try {
    const response = await fetchDataCached<T>("/tales");

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function getContentNavigateTales<T>(): Promise<T | null> {
  try {
    const response = await fetchDataCached<T>("/tales/content-navigate");

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function getOneTale<T>(query: string): Promise<T | null> {
  try {
    const response = await fetchDataCached<T>(`/tales/${query}`);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
