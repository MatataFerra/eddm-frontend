import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

export const softStoryCard = cva(
  "relative rounded-[26px] px-3 py-2 flex flex-col items-center justify-center text-center overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 before:absolute before:inset-0 before:rounded-[26px] before:bg-[url('/noise.svg')] before:opacity-[0.035] before:pointer-events-none",
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
        red: "bg-[radial-gradient(circle_at_center,#FFF0F3_0%,#FFC1D0_20%,#F6416C_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9),0_10px_40px_-10px_rgba(246,65,108,0.5)] text-[#880E4F]",
        redDark:
          "bg-gradient-to-br from-[#880E4F] to-[#560027] border-white/20 shadow-[0_10px_40px_-10px_rgba(136,14,79,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(136,14,79,0.7)] text-[#FCE4EC]",
        yellow:
          "bg-gradient-to-br from-[#FFDE7D]/90 to-[#FFC107]/70 shadow-[0_10px_40px_-10px_rgba(255,222,125,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(255,222,125,0.7)] text-[#78350F]",
        yellowDark:
          "bg-gradient-to-br from-[#B45309] to-[#78350F] border-white/20 shadow-[0_10px_40px_-10px_rgba(180,83,9,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(180,83,9,0.7)] text-[#FEF3C7]",
      },
    },
    defaultVariants: {
      variant: "yellow",
    },
  },
);

interface SoftCardProps extends VariantProps<typeof softStoryCard> {
  icon?: ReactNode;
  title?: string;
  className?: string;
  children?: ReactNode;
}

export function SoftCard({ icon, title, variant, className, children }: SoftCardProps) {
  return (
    <div data-item="soft-card" className={cn(softStoryCard({ variant }), className)}>
      {icon && <div className="mb-2 text-xl opacity-70">{icon}</div>}
      {title && (
        <span className="text-sm font-semibold tracking-tight text-neutral-700">{title}</span>
      )}
      {children}
    </div>
  );
}
