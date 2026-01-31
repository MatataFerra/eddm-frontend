import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type MasonryProps = PropsWithChildren<{
  className?: string;
}>;

export function Masonry({ children, className }: MasonryProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 px-2 md:grid-cols-3 md:gap-6 lg:gap-8 auto-rows-[minmax(180px,auto)] grid-flow-dense",
        className,
      )}>
      {children}
    </div>
  );
}
