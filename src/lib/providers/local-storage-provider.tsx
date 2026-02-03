"use client";

import { createContext, use } from "react";
import { LOCALSTORAGE_KEYS } from "@/lib/constants";
import { useLocalStorageObject } from "@/lib/hooks/use-localstorage-object";

import type {
  ArticleStatusMap,
  LocalStorageConfig,
  LocalStorageConfigUpdateFunction,
} from "@/lib/interfaces/share";

interface Actions {
  update: LocalStorageConfigUpdateFunction;
  getArticleReadingStatus: (slug: string) => string | undefined;
}

interface LocalStorageContextValue extends Actions {
  config: LocalStorageConfig;
  bookmarked: string[];
  articlesReadStatus: ArticleStatusMap;
}

const LocalStorageConfigContext = createContext<LocalStorageContextValue | undefined>(undefined);

interface LocalStorageConfigProviderProps {
  children: React.ReactNode;
}

export function LocalStorageConfigProvider({ children }: LocalStorageConfigProviderProps) {
  const { value, update } = useLocalStorageObject<LocalStorageConfig>(
    LOCALSTORAGE_KEYS.EDDM_CONFIG_OBJECT,
    {
      version: 1,
      bookmarked: [],
      "articles-read-status": {},
    },
  );

  function getArticleReadingStatus(slug: string) {
    return value["articles-read-status"][slug];
  }

  const contextValue: LocalStorageContextValue = {
    config: value,
    update,
    getArticleReadingStatus,
    bookmarked: value.bookmarked,
    articlesReadStatus: value["articles-read-status"],
  };

  return (
    <LocalStorageConfigContext.Provider value={contextValue}>
      {children}
    </LocalStorageConfigContext.Provider>
  );
}

export function useLocalStorageConfig() {
  const context = use(LocalStorageConfigContext);
  if (context === undefined) {
    throw new Error("useLocalStorageConfig debe usarse dentro de un LocalStorageConfigProvider");
  }
  return context;
}
