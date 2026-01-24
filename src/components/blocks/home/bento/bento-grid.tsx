import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div
      data-item="bento-grid"
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[180px] lg:auto-rows-[60px] gap-6 max-w-7xl mx-auto w-full relative z-10",
        className,
      )}>
      {children}
    </div>
  );
}

type ColSpanValue = 1 | 2 | 3 | 4;
type RowSpanValue = 1 | 2 | 3 | 4 | 5 | 6;
type ResponsiveProp<T> = T | Partial<Record<"base" | "md" | "lg", T>>;

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  colSpan?: ResponsiveProp<ColSpanValue>;
  rowSpan?: ResponsiveProp<RowSpanValue>;
}

const COL_SPANS = {
  base: {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-2", // En móvil, máximo 2 columnas
    4: "col-span-2",
  },
  md: {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  },
  lg: {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
  },
};

const ROW_SPANS = {
  base: {
    1: "row-span-1",
    2: "row-span-2",
    3: "row-span-3",
    4: "row-span-4",
    5: "row-span-5",
    6: "row-span-6",
  },
  md: {
    1: "md:row-span-1",
    2: "md:row-span-2",
    3: "md:row-span-3",
    4: "md:row-span-4",
    5: "md:row-span-5",
    6: "md:row-span-6",
  },
  lg: {
    1: "lg:row-span-1",
    2: "lg:row-span-2",
    3: "lg:row-span-3",
    4: "lg:row-span-4",
    5: "lg:row-span-5",
    6: "lg:row-span-6",
  },
};

function getResponsiveClass<T extends number>(
  prop: ResponsiveProp<T> | undefined,
  lookup: Record<"base" | "md" | "lg", Record<number, string>>,
): string {
  if (!prop) return "";

  // Si es un número, aplicar a todas las breakpoints
  if (typeof prop === "number") {
    return [lookup.base[prop], lookup.md[prop], lookup.lg[prop]].filter(Boolean).join(" ");
  }

  // Si es un objeto, aplicar clases específicas por breakpoint
  const classes: string[] = [];
  if (prop.base !== undefined) classes.push(lookup.base[prop.base]);
  if (prop.md !== undefined) classes.push(lookup.md[prop.md]);
  if (prop.lg !== undefined) classes.push(lookup.lg[prop.lg]);

  return classes.join(" ");
}

export const BentoItem = ({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
}: BentoItemProps) => {
  const colClasses = getResponsiveClass(colSpan, COL_SPANS);
  const rowClasses = getResponsiveClass(rowSpan, ROW_SPANS);

  return (
    <div
      data-item="bento-item"
      className={cn(
        "w-full h-full", // Usa el tamaño del grid en lugar de altura fija
        colClasses,
        rowClasses,
        className,
      )}>
      {children}
    </div>
  );
};
