"use client";

import { createContext, PropsWithChildren, use, useState } from "react";

const IndexContentContext = createContext({
  isOpen: false,
  toggleIsOpen: () => {},
});

// Proveedor del Contexto
const IndexContentProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <IndexContentContext.Provider value={{ isOpen, toggleIsOpen }}>
      {children}
    </IndexContentContext.Provider>
  );
};

const useIndexContentProvider = () => {
  const context = use(IndexContentContext);
  if (!context) {
    throw new Error("useSheetContext must be used within a ModalProvider");
  }
  return context;
};

export { IndexContentProvider, useIndexContentProvider };
