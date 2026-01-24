import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import type { ReactNode } from "react";

export const pastelCardVariants = cva(
  "group relative overflow-hidden rounded-3xl flex flex-col items-center justify-center text-center h-full w-full transition-all duration-300 ease-out hover:-translate-y-1 border-[1.5px] border-white/50 backdrop-blur-md",
  {
    variants: {
      variant: {
        teal: "bg-gradient-to-br from-[#00B8A9]/90 to-[#008f83]/80 shadow-[0_10px_40px_-10px_rgba(0,184,169,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(0,184,169,0.7)] text-white",
        tealDark:
          "bg-gradient-to-br from-[#00695C] to-[#004D40] border-white/20 shadow-[0_10px_40px_-10px_rgba(0,105,92,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(0,105,92,0.7)] text-[#CCFBF1]",
        cream:
          "bg-gradient-to-br from-[#F8F3D4] to-[#E6E0B0] shadow-[0_10px_40px_-10px_rgba(200,190,150,0.4)] hover:shadow-[0_20px_50px_-10px_rgba(200,190,150,0.6)] text-[#5D4037]",
        creamDark:
          "bg-gradient-to-br from-[#5D4037] to-[#3E2723] border-white/20 shadow-[0_10px_40px_-10px_rgba(62,39,35,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(62,39,35,0.7)] text-[#F8F3D4]",

        red: "bg-gradient-to-br from-[#F6416C]/90 to-[#D9385E]/80 shadow-[0_10px_40px_-10px_rgba(246,65,108,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(246,65,108,0.7)] text-white",
        redDark:
          "bg-gradient-to-br from-[#880E4F] to-[#560027] border-white/20 shadow-[0_10px_40px_-10px_rgba(136,14,79,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(136,14,79,0.7)] text-[#FCE4EC]",
        yellow:
          "bg-gradient-to-br from-[#FFDE7D]/90 to-[#FFC107]/70 shadow-[0_10px_40px_-10px_rgba(255,222,125,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(255,222,125,0.7)] text-[#78350F]",
        yellowDark:
          "bg-gradient-to-br from-[#B45309] to-[#78350F] border-white/20 shadow-[0_10px_40px_-10px_rgba(180,83,9,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(180,83,9,0.7)] text-[#FEF3C7]",
      },
    },
    defaultVariants: {
      variant: "teal",
    },
  },
);
interface PastelCardProps extends VariantProps<typeof pastelCardVariants> {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: ReactNode;
  contentClassName?: string;
  editorialLine?: boolean;
}

export function PastelCard({
  children,
  className,
  variant,
  icon,
  title,
  contentClassName,
  editorialLine = false,
}: PastelCardProps) {
  return (
    <div data-item="pastel-card" className={cn(pastelCardVariants({ variant, className }))}>
      <div className={cn("relative z-10 flex flex-col", contentClassName)}>
        {icon && <div className="mb-3 opacity-90 drop-shadow-sm">{icon}</div>}

        {title && <h3 className="text-lg font-bold leading-tight drop-shadow-sm mb-2">{title}</h3>}

        {children}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[#7A4F2E]/15" />
      {editorialLine && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-[#7A4F2E]/20 rounded-full" />
      )}
    </div>
  );
}
