"use client";

import { createContext, use, PropsWithChildren } from "react";
import type { ContentNavigate } from "@/lib/interfaces/articles";

interface RootDataContextType {
  articles: ContentNavigate[] | null;
  tales: ContentNavigate[] | null;
}

interface RootDataProviderType extends PropsWithChildren<Omit<RootDataContextType, "isLoading">> {
  entries?: ContentNavigate[];
}

const RootDataContext = createContext<RootDataProviderType | undefined>(undefined);

export function RootDataProvider({ articles, tales, children }: RootDataProviderType) {
  const entries = [...(articles || []), ...(tales || [])];

  const ctx = {
    articles,
    tales,
    entries,
  };

  return <RootDataContext.Provider value={ctx}>{children}</RootDataContext.Provider>;
}

export function useRootData() {
  const context = use(RootDataContext);
  if (!context) {
    throw new Error("useRootData must be used within an RootDataProvider");
  }
  return context;
}
