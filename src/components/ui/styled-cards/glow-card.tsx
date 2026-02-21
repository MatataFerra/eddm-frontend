import { cn } from "@/lib/utils";
import { type HTMLMotionProps, m, MotionValue } from "motion/react";
import Image from "next/image";
import { forwardRef } from "react";
import { type LucideIcon } from "lucide-react";

type GlowCardProps = HTMLMotionProps<"article"> & { link?: string };

export const GlowCard = forwardRef<HTMLDivElement, GlowCardProps>(
  ({ children, link, ...props }, ref) => {
    function handleClick() {
      if (link) window.open(link, "_blank", "noopener,noreferrer");
    }

    return (
      <m.article
        ref={ref}
        onClick={link ? handleClick : undefined}
        role={link ? "link" : undefined}
        tabIndex={link ? 0 : undefined}
        className={cn("relative group", link && "cursor-pointer")}
        {...props}>
        {children}
      </m.article>
    );
  },
);

GlowCard.displayName = "GlowCardRoot";

export function GlowCardSurface({
  gradient,
  children,
  className,
}: {
  gradient: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div
        data-slot="surface"
        className={cn(
          "relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/10 via-white/5 to-white/2 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 transition-all duration-500 hover:shadow-3xl size-full",
          className,
        )}>
        <div
          data-slot="surface-gradient"
          className={cn("absolute inset-0 bg-linear-to-br opacity-40", gradient)}
        />
        <div className="absolute -top-12 sm:-top-20 -right-12 sm:-right-20 w-24 h-24 sm:w-40 sm:h-40 bg-white/5 rounded-full blur-2xl sm:blur-3xl" />
        {children}
        <div className={cn("h-0.5 sm:h-1 bg-linear-to-r opacity-60", gradient)} />
      </div>
    </>
  );
}

export function GlowCardImage({
  src,
  alt,
  blur,
  className,
  placement = "side",
}: {
  src: string;
  alt: string;
  blur?: MotionValue<string>;
  className?: string;
  placement?: "side" | "center";
}) {
  if (placement === "center") {
    return (
      <m.div
        data-slot="image"
        style={{ filter: blur }}
        className="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl -z-10">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className={cn("object-cover", className)} />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
      </m.div>
    );
  }

  return (
    <div className="absolute inset-y-0 right-0 w-3/5 sm:w-5/6 pointer-events-none">
      <m.div
        data-slot="image"
        style={{ filter: blur }}
        className="relative w-full h-full translate-x-6 sm:translate-x-10 opacity-80 mask-[linear-gradient(to_left,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_left,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_100%)]">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={cn("object-cover", className)} />
        <div className="absolute inset-0 bg-linear-to-l from-white/10 via-transparent to-transparent" />
      </m.div>
    </div>
  );
}

export function GlowCardHeader({
  index,
  accent,
  icon: Icon,
}: {
  index?: number;
  accent: string;
  icon?: LucideIcon;
}) {
  return (
    <div data-slot="header" className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
      {index !== undefined && (
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-white/15 to-white/5 border border-white/10 shadow-lg shadow-black/20">
          <span className={cn("text-lg sm:text-xl md:text-2xl font-light", accent)}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}

      {Icon && (
        <div className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5", accent)} />
        </div>
      )}
    </div>
  );
}

export function GlowCardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-slot="content" className={cn("mb-4 sm:mb-5 md:mb-6", className)}>
      {children}
    </div>
  );
}

export function GlowCardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      data-slot="title"
      className={cn(
        "text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white mb-1 leading-tight",
        className,
      )}>
      {children}
    </h3>
  );
}

export function GlowCardSubtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      data-slot="subtitle"
      className={cn("text-sm sm:text-base text-white/50 font-light", className)}>
      {children}
    </p>
  );
}

export function GlowCardFooter({
  accent,
  icon: Icon,
  children,
  delay = 0.2,
  className,
}: {
  accent: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      data-slot="footer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-linear-to-r from-white/5 to-transparent border-l-2 border-white/20",
        className,
      )}>
      {Icon && (
        <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
          <Icon className={cn("w-4 h-4", accent)} />
        </div>
      )}
      <div className="flex-1 min-w-0">{children}</div>
    </m.div>
  );
}
