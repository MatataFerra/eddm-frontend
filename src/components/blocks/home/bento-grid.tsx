import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div
      data-item="bento-grid"
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 auto-rows-[60px] gap-6 max-w-7xl mx-auto w-full relative z-10",
        className,
      )}>
      {children}
    </div>
  );
}

export const BentoItem = ({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
}: {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
}) => {
  const colSpanClass = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  }[colSpan];

  /* CAMBIO: Mapeamos los nuevos tamaños */
  const rowSpanClass = {
    1: "md:row-span-1", // ~60px (Tu nueva card pequeña)
    2: "md:row-span-2", // ~140px (Card estándar)
    3: "md:row-span-3", // ~220px
    4: "md:row-span-4", // ~300px (Ideal para el Mapa)
    5: "md:row-span-5",
    6: "md:row-span-6",
  }[rowSpan];

  return (
    <div
      data-item="bento-item"
      className={cn("h-full w-full", colSpanClass, rowSpanClass, className)}>
      {children}
    </div>
  );
};
