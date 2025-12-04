"use client";

import { createContext, useState, useEffect, use } from "react";
import { parseHeadings } from "../utils";
import type { ApiResponse } from "../fetch/caller";
import type { Article } from "../interfaces/articles";
import type { ContentBySlug } from "../interfaces/share";

export type TOCItem = { title: string; id: string };

type TOCContextType = {
  items: TOCItem[];
  activeId: string;
  isTocOpen: boolean;
  setIsTocOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TOCContext = createContext<TOCContextType>({
  items: [],
  activeId: "",
  isTocOpen: false,
  setIsTocOpen: () => {},
});

export const useTOC = () => use(TOCContext);

type TOCProviderProps = {
  children: React.ReactNode;
  articlePromise: Promise<ApiResponse<ContentBySlug<Article>> | null>;
};

export const TOCProvider = ({ children, articlePromise }: TOCProviderProps) => {
  const articleData = use(articlePromise);
  const [isTocOpen, setIsTocOpen] = useState(false);

  const content = articleData?.data?.md_content || "";
  const items = parseHeadings(content);

  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const value = { items, activeId, isTocOpen, setIsTocOpen };

  return <TOCContext.Provider value={value}>{children}</TOCContext.Provider>;
};
