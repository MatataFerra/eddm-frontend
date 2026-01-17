"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";

import { ListIndexContent } from "@/components/blocks/index-content/list";
import { useIndexContentProvider } from "@/components/blocks/index-content/context";
import { XIcon, TableOfContents } from "lucide-react";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { useRef } from "react";
import { useEscapeKey } from "@/lib/hooks/use-escape-key";
import { cn } from "@/lib/utils";

function TriggerButton({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed right-6 top-6 z-40 flex items-center gap-2 rounded-md border px-4 py-2 transition-all duration-200",
        "bg-zinc-900 border-zinc-800 text-zinc-300",
        "hover:bg-zinc-800 hover:border-zinc-700 hover:text-white",
        "hover:ring-1 hover:ring-zinc-700",
        isOpen && "opacity-0 pointer-events-none"
      )}>
      <TableOfContents className="size-4 opacity-70" />
      <span className="text-sm font-medium">Contenido</span>
    </button>
  );
}

export function ResponsiveIndexContent() {
  const { isOpen, toggleIsOpen } = useIndexContentProvider();
  const refSheet = useRef<HTMLDivElement>(null);

  function handleClose() {
    if (isOpen) toggleIsOpen();
  }

  useEscapeKey(handleClose);
  useOutsideClick(refSheet, handleClose);

  return (
    <>
      <Sheet open={isOpen} modal={false}>
        <TriggerButton onClick={() => toggleIsOpen()} isOpen={isOpen} />
        <SheetContent
          ref={refSheet}
          className="border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm rounded-md p-2">
          <SheetHeader className="p-8">
            <SheetTitle className="text-xl font-bold tracking-tight text-white">
              Índice de contenido
            </SheetTitle>
            <VisuallyHidden>
              <SheetDescription>Aquí puedes navegar por los contenidos del sitio.</SheetDescription>
            </VisuallyHidden>
            <SheetClose
              onClick={handleClose}
              className={cn(
                // 1. Posicionamiento
                "absolute right-4 top-4",

                "flex items-center justify-center rounded-md p-2",
                "border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm",
                "text-zinc-400 transition-all duration-200",
                "hover:bg-zinc-800 hover:border-zinc-700 hover:text-white",
                "focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-0 disabled:pointer-events-none"
              )}>
              <XIcon className="size-4" />
              <span className="sr-only">Cerrar</span>
            </SheetClose>
          </SheetHeader>
          <div
            className="prose prose-invert px-8 h-full prose-h3:mb-0 prose-h3:mt-0.5 prose-ol:pl-0! prose-ul:pl-0!"
            style={{ overflowY: "scroll", overflowX: "hidden" }}>
            <ListIndexContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
