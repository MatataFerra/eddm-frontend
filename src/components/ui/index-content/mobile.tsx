"use client";

import { isMobile, isTablet } from "react-device-detect";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ListIndexContent } from "./list";

export function MobileIndexContent() {
  return (
    <>
      {isMobile || isTablet ? (
        <Sheet>
          <SheetTrigger asChild>
            <button className="cursor-pointer absolute right-4 top-4 z-10 shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white dark:border-black dark:text-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              Índice
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="p-0">
              <SheetTitle>Índice de contenido</SheetTitle>
            </SheetHeader>
            <div className="prose">
              <ListIndexContent />
            </div>
          </SheetContent>
        </Sheet>
      ) : null}
    </>
  );
}
