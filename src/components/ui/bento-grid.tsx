import { cn } from "@lib/utils";
import { PropsWithChildren } from "react";

type BentoGridProps = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

export const BentoGrid = ({ className, children, onClick }: BentoGridProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}>
      {children}
    </div>
  );
};
