import { cn } from "@lib/utils";
import { type KeyboardEvent, PropsWithChildren } from "react";

type BentoGridProps = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

export const BentoGrid = ({ className, children, onClick }: BentoGridProps) => {
  return (
    <div
      {...(onClick
        ? {
            onClick,
            role: "button" as const,
            tabIndex: 0,
            onKeyDown: (e: KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            },
          }
        : {})}
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}>
      {children}
    </div>
  );
};
