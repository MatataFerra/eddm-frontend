import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const glassTitleVariants = cva(
  "relative font-serif font-semibold tracking-tight transition-all duration-300",
  {
    variants: {
      variant: {
        default: [
          "text-[#f5f1e8]",
          "[text-shadow:0_1px_1px_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.35)]",
          "before:content-[attr(data-text)] before:absolute before:inset-0",
          "before:text-[#fff7e6] before:opacity-70 before:translate-y-px before:pointer-events-none",
        ].join(" "),

        gold: [
          "bg-linear-to-b from-[#D9C088] via-[#C4A360] to-[#9E7C38]",
          "bg-clip-text text-transparent",
          "drop-shadow-[0_1px_2px_rgba(160,120,60,0.3)]",
        ].join(" "),
      },
      size: {
        sm: "text-3xl md:text-4xl",
        md: "text-5xl md:text-7xl",
        lg: "text-6xl md:text-9xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface GlassTitleProps extends VariantProps<typeof glassTitleVariants> {
  children: ReactNode;
  className?: string;
}

export function GlassTitle({ children, className, variant, size }: GlassTitleProps) {
  const textContent = typeof children === "string" ? children : "";

  return (
    <h1 data-text={textContent} className={cn(glassTitleVariants({ variant, size, className }))}>
      {children}
    </h1>
  );
}
