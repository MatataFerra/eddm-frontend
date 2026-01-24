import type { RoutePaths } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";

const cardVariants = cva(
  "relative flex flex-col items-center justify-center text-center overflow-hidden h-full transition-all duration-300",
  {
    variants: {
      mode: {
        soft: "rounded-[26px] px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)] before:absolute before:inset-0 before:rounded-[26px] before:bg-[url('/noise.svg')] before:opacity-[0.035] before:pointer-events-none",
        editorial:
          "group w-full rounded-3xl border-[1.5px] border-white/50 backdrop-blur-md hover:-translate-y-1",
      },
      variant: {
        teal: "text-[#004D40]",
        cream: "text-[#5D4037]",
        red: "text-[#880E4F]",
        yellow: "text-[#78350F]",
      },
    },

    compoundVariants: [
      // --- MODALIDAD: SOFT ---
      {
        mode: "soft",
        variant: "teal",
        class:
          "bg-[radial-gradient(circle_at_center,#F0FDFA_0%,#99F2E9_45%,#00B8A9_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9),0_10px_30px_rgba(0,184,169,0.35)]",
      },
      {
        mode: "soft",
        variant: "cream",
        class:
          "bg-[radial-gradient(circle_at_center,#FFFCF5_0%,#F8F3D4_45%,#E6E0B0_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9),0_10px_30px_rgba(200,190,150,0.35)]",
      },
      {
        mode: "soft",
        variant: "red",
        class:
          "bg-[radial-gradient(circle_at_center,#FFF0F3_0%,#FFC1D0_45%,#F6416C_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9),0_10px_30px_rgba(246,65,108,0.35)]",
      },
      {
        mode: "soft",
        variant: "yellow",
        class:
          "bg-[radial-gradient(circle_at_center,#FFFEF0_0%,#FFEBA0_45%,#FFDE7D_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9),0_10px_30px_rgba(255,222,125,0.35)]",
      },

      // --- MODALIDAD: EDITORIAL ---
      {
        mode: "editorial",
        variant: "teal",
        class:
          "bg-[radial-gradient(circle_at_center,#F0FDFA_0%,#99F2E9_45%,#00B8A9_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9),0_10px_40px_-10px_rgba(0,184,169,0.4)]",
      },
      {
        mode: "editorial",
        variant: "cream",
        class:
          "bg-[radial-gradient(circle_at_center,#FFFCF5_0%,#F8F3D4_50%,#E6E0B0_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9),0_10px_40px_-10px_rgba(200,190,150,0.4)]",
      },
      {
        mode: "editorial",
        variant: "red",
        class:
          "bg-[radial-gradient(circle_at_center,#FFF0F3_0%,#FFC1D0_45%,#F6416C_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9),0_10px_40px_-10px_rgba(246,65,108,0.5)]",
      },
      {
        mode: "editorial",
        variant: "yellow",
        class:
          "bg-[radial-gradient(circle_at_center,#FFFEF0_0%,#FFEBA0_45%,#FFDE7D_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9),0_10px_40px_-10px_rgba(255,222,125,0.5)]",
      },
    ],
    defaultVariants: {
      mode: "editorial",
      variant: "teal",
    },
  },
);

interface UniversalCardProps extends VariantProps<typeof cardVariants> {
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  editorialLine?: boolean;
  link?: RoutePaths;
}

interface CardWrapperProps extends HTMLAttributes<HTMLElement> {
  condition: boolean;
  href?: string | null;
  children: ReactNode;
  target?: string;
}

function CardWrapper({ condition, href, children, className, ...props }: CardWrapperProps) {
  if (condition && href) {
    return (
      <Link href={href} className={cn("cursor-pointer", className)} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export function UniversalCard({
  mode = "editorial",
  link,
  variant,
  icon,
  title,
  children,
  className,
  contentClassName,
  editorialLine = false,
}: UniversalCardProps) {
  const cardClasses = cn(cardVariants({ mode, variant }), className);

  if (mode === "soft") {
    return (
      <CardWrapper condition={!!link} href={link} data-item="soft-card" className={cardClasses}>
        {icon && <div className="mb-2 text-xl opacity-70">{icon}</div>}
        {title && <span className="text-sm font-semibold tracking-tight opacity-90">{title}</span>}
        {children}
      </CardWrapper>
    );
  }

  return (
    <CardWrapper condition={!!link} href={link} data-item="editorial-card" className={cardClasses}>
      <div className={cn("relative z-10 flex flex-col", contentClassName)}>
        {icon && <div className="mb-3 opacity-90 drop-shadow-sm">{icon}</div>}
        {title && <h3 className="text-lg font-bold leading-tight drop-shadow-sm mb-2">{title}</h3>}
        {children}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      {editorialLine && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-current opacity-20 rounded-full" />
      )}
    </CardWrapper>
  );
}
