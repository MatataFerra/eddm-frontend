// context/ArticlesContext.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { Article } from "@/lib/interfaces/articles";

interface ArticlesContextType {
  articles: Article[];
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export function ArticlesProvider({
  articles,
  children,
}: {
  articles: Article[];
  children: ReactNode;
}) {
  return <ArticlesContext.Provider value={{ articles }}>{children}</ArticlesContext.Provider>;
}

export function useArticles() {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
}
