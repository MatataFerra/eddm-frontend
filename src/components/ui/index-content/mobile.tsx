"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { ListIndexContent } from "./list";
import { useIndexContentProvider } from "./context";
import { XIcon, TableOfContents } from "lucide-react";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { useRef } from "react";
import { useEscapeKey } from "@/lib/hooks/use-escape-key";

export function MobileIndexContent() {
  const { isOpen, toggleIsOpen } = useIndexContentProvider();
  const refSheet = useRef<HTMLDivElement>(null);

  useEscapeKey(() => {
    if (isOpen) {
      toggleIsOpen();
    }
  });

  useOutsideClick(refSheet, () => {
    if (isOpen) {
      toggleIsOpen();
    }
  });

  return (
    <>
      <Sheet open={isOpen}>
        <SheetTrigger
          onClick={() => toggleIsOpen()}
          className="fixed cursor-pointer right-4 top-4 z-10 shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white dark:border-black dark:text-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          <TableOfContents className="size-4" />
          <span className="sr-only">Índice de contenido</span>
        </SheetTrigger>
        <SheetContent ref={refSheet}>
          <SheetHeader className="p-8">
            <SheetTitle>Índice de contenido</SheetTitle>
            <VisuallyHidden>
              <SheetDescription>Aquí puedes navegar por los contenidos del sitio.</SheetDescription>
            </VisuallyHidden>
            <SheetClose
              className="cursor-pointer focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
              onClick={() => toggleIsOpen()}>
              <XIcon className="size-4" color="black" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetHeader>
          <div className="prose px-8">
            <ListIndexContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
