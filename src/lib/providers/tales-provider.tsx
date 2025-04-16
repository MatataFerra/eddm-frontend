"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Article } from "@/lib/interfaces/articles";

interface TalesContextType {
  tales: Article[];
}

const TalesContext = createContext<TalesContextType | undefined>(undefined);

export function TalesProvider({ tales, children }: { tales: Article[]; children: ReactNode }) {
  return <TalesContext.Provider value={{ tales }}>{children}</TalesContext.Provider>;
}

export function useTales() {
  const context = useContext(TalesContext);
  if (!context) {
    throw new Error("useTales must be used within an TalesProvider");
  }
  return context;
}
