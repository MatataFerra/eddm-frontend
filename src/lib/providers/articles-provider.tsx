// context/ArticlesContext.tsx
"use client";

import { createContext, use, ReactNode, useState, useEffect } from "react";
import { Article } from "@/lib/interfaces/articles";

interface ArticlesContextType {
  articles: Article[] | null;
  isLoading: boolean;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export function ArticlesProvider({
  articles,
  children,
}: {
  articles: Article[] | null;
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Array.isArray(articles) || articles.length === 0) {
      setIsLoading(true);
      return;
    }
    setIsLoading(false);
  }, [articles]);

  return (
    <ArticlesContext.Provider value={{ articles, isLoading }}>{children}</ArticlesContext.Provider>
  );
}

export function useArticles() {
  const context = use(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
}
