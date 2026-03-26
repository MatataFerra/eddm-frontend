"use client";

import { createContext, useState, useEffect, use, useEffectEvent } from "react";

export type TOCItem = { title: string; id: string };

type TOCContextType = {
  items: TOCItem[];
  activeId: string;
  isTocOpen: boolean;
  setItems: React.Dispatch<React.SetStateAction<TOCItem[]>>;
  setIsTocOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TOCContext = createContext<TOCContextType>({
  items: [],
  activeId: "",
  isTocOpen: false,
  setItems: () => {},
  setIsTocOpen: () => {},
});

export const useTOC = () => use(TOCContext);

type TOCProviderProps = {
  children: React.ReactNode;
};

export const TOCProvider = ({ children }: TOCProviderProps) => {
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [items, setItems] = useState<TOCItem[]>([]);

  const [activeId, setActiveId] = useState("");

  const handleScroll = useEffectEvent(() => {
    const scrollPosition = window.scrollY + 200;

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      const element = document.getElementById(item.id);
      if (element && element.offsetTop <= scrollPosition) {
        setActiveId(item.id);
        break;
      }
    }
  });

  useEffect(() => {
    if (items.length === 0) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const value = { items, activeId, isTocOpen, setItems, setIsTocOpen };

  return <TOCContext.Provider value={value}>{children}</TOCContext.Provider>;
};

type TOCItemsSyncProps = {
  items: TOCItem[];
};

export function TOCItemsSync({ items }: TOCItemsSyncProps) {
  const { items: currentItems, setItems, setIsTocOpen } = use(TOCContext);

  useEffect(() => {
    const sameItems =
      currentItems.length === items.length &&
      currentItems.every((item, index) => item.id === items[index]?.id);

    if (sameItems) return;

    setItems(items);
    setIsTocOpen(false);
  }, [currentItems, items, setItems, setIsTocOpen]);

  return null;
}
