import { cn } from "@/lib/utils";

export function HoverBoxShadowGlow({ color, className }: { color: string; className?: string }) {
  return (
    <div
      data-slot="hover-box-shadow-glow"
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100",
        className,
      )}
      style={{
        boxShadow: `inset 0 0 0 1px ${color}70, 0 30px 80px ${color}60`,
      }}
    />
  );
}
