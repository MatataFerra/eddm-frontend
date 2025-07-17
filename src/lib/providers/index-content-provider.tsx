"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Article } from "@/lib/interfaces/articles";

interface IndexContentContextType {
  indexContent: Article[];
}

const IndexContentContext = createContext<IndexContentContextType | undefined>(undefined);

export function IndexContentProvider({
  indexContent,
  children,
}: {
  indexContent: Article[];
  children: ReactNode;
}) {
  return (
    <IndexContentContext.Provider value={{ indexContent }}>{children}</IndexContentContext.Provider>
  );
}

export function useIndexContent() {
  const context = useContext(IndexContentContext);
  if (!context) {
    throw new Error("useIndexContent must be used within an IndexContentProvider");
  }
  return context;
}
