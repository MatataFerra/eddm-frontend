import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = "", hoverEffect = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        `
        h-full w-full
        relative overflow-hidden rounded-3xl
        bg-white/2
        backdrop-blur-[10px]
        border border-white/50
        p-4

        shadow-[ 
          inset_0_0_20px_rgba(255,255,255,0.05),
          0_20px_60px_rgba(0,0,0,0.75)
        ]

        transition-all duration-500 ease-out
        ${
          hoverEffect
            ? `
              hover:bg-white/5
              hover:border-white/70
              hover:-translate-y-1
              hover:shadow-[ 
                inset_0_0_30px_rgba(255,255,255,0.1),
                0_30px_80px_rgba(0,0,0,0.55)
              ]
            `
            : ""
        }

        ${className}
      `,
      )}>
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('/noise.svg')] mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,200,120,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-linear-to-r from-white/20 to-transparent" />

      <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-linear-to-l from-white/20 to-transparent" />

      <div className="absolute inset-x-0 top-0 h-16 pointer-events-none bg-linear-to-b from-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-linear-to-t from-black/40 to-transparent" />

      <div className="relative z-10 size-full">{children}</div>
    </div>
  );
}
