"use client";

import { createContext, use, PropsWithChildren } from "react";
import type { ContentNavigate } from "@/lib/interfaces/articles";

interface RootDataContextType {
  articles: ContentNavigate[] | null;
  tales: ContentNavigate[] | null;
}

type RootDataProviderType = PropsWithChildren<Omit<RootDataContextType, "isLoading">>;

const RootDataContext = createContext<RootDataContextType | undefined>(undefined);

export function RootDataProvider({ articles, tales, children }: RootDataProviderType) {
  const ctx = {
    articles,
    tales,
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
