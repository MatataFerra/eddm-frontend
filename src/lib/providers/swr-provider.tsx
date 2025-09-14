"use client";

import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{ revalidateOnFocus: false, provider: () => new Map(), dedupingInterval: 900_000 }}>
      {children}
    </SWRConfig>
  );
}
