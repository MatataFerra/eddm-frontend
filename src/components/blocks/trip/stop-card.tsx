import type { TripStop } from "@/lib/interfaces/trip";
import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion, useScroll, useTransform } from "motion/react";
import { forwardRef, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";

type Props = {
  stop: TripStop;
  index: number;
  distanceToNext?: number;
  nextStop?: TripStop;
  isLast?: boolean;
  link?: string;
};

const gradients = [
  "from-violet-500/20 via-purple-500/10 to-transparent",
  "from-cyan-500/20 via-blue-500/10 to-transparent",
  "from-pink-500/20 via-rose-500/10 to-transparent",
  "from-emerald-500/20 via-green-500/10 to-transparent",
  "from-amber-500/20 via-orange-500/10 to-transparent",
  "from-indigo-500/20 via-blue-500/10 to-transparent",
];

const accentColors = [
  "text-violet-400",
  "text-cyan-400",
  "text-pink-400",
  "text-emerald-400",
  "text-amber-400",
  "text-indigo-400",
];

const glowColors = [
  "shadow-violet-500/20",
  "shadow-cyan-500/20",
  "shadow-pink-500/20",
  "shadow-emerald-500/20",
  "shadow-amber-500/20",
  "shadow-indigo-500/20",
];

type CardWrapperProps = HTMLMotionProps<"a"> & {
  link?: string;
};

const CardWrapper = forwardRef<HTMLAnchorElement | HTMLElement, CardWrapperProps>(
  ({ children, link, ...props }, ref) => {
    function handleClick() {
      if (link) {
        window.open(link, "_blank", "noopener,noreferrer");
      }
    }

    return (
      <motion.article
        ref={ref}
        onClick={link ? handleClick : undefined}
        role={link ? "link" : undefined}
        tabIndex={link ? 0 : undefined}
        className={cn("relative group block", link && "cursor-pointer")}
        {...props}
        onTap={
          link
            ? (e) => {
                e.preventDefault();
                handleClick();
              }
            : undefined
        }>
        {children}
      </motion.article>
    );
  },
);

CardWrapper.displayName = "CardWrapper";

export function StopCard({ stop, index, distanceToNext, nextStop, isLast, link }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isLast ? ["start 98%", "start 60%"] : ["start 95%", "start 20%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], isLast ? [20, 0] : [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], isLast ? [0.98, 1] : [0.95, 1]);
  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    isLast ? ["blur(4px)", "blur(0px)"] : ["blur(8px)", "blur(0px)"],
  );

  const colorIndex = index % gradients.length;
  const gradient = gradients[colorIndex];
  const accent = accentColors[colorIndex];
  const glow = glowColors[colorIndex];

  return (
    <CardWrapper ref={ref} style={{ y, opacity, scale, filter: blur }} link={link}>
      <div
        className={cn(
          "absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl sm:blur-2xl",
          glow,
        )}
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl sm:rounded-3xl",
          "bg-linear-to-br from-white/10 via-white/5 to-white/2",
          "backdrop-blur-xl border border-white/10",
          "shadow-2xl shadow-black/40",
          "transition-all duration-500",
          "hover:border-white/20 hover:shadow-3xl",
        )}>
        <div className={cn("absolute inset-0 bg-linear-to-br opacity-40", gradient)} />

        <div className="absolute -top-12 sm:-top-20 -right-12 sm:-right-20 w-24 h-24 sm:w-40 sm:h-40 bg-white/5 rounded-full blur-2xl sm:blur-3xl" />

        <div className="relative px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <div className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl",
                "bg-linear-to-br from-white/15 to-white/5",
                "border border-white/10",
                "shadow-lg shadow-black/20",
              )}>
              <span className={cn("text-lg sm:text-xl md:text-2xl font-light", accent)}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div
              className={cn(
                "p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10",
                "backdrop-blur-sm",
              )}>
              <MapPin className={cn("w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5", accent)} />
            </div>
          </div>

          <div className="mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white mb-1 sm:mb-1.5 md:mb-2 leading-tight">
              {stop.city}
            </h3>
            <p className="text-sm sm:text-base text-white/50 font-light">{stop.country}</p>
          </div>

          {distanceToNext && nextStop && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "flex items-center gap-2 sm:gap-2.5 md:gap-3 p-3 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl",
                "bg-linear-to-r from-white/5 to-transparent",
                "border-l-2 border-white/20",
              )}>
              <div
                className={cn(
                  "p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-white/10",
                  "backdrop-blur-sm",
                )}>
                <Navigation className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", accent)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-white/40 mb-0.5">Próximo destino</p>
                <p className="text-xs sm:text-sm text-white/90 truncate">
                  <span className={cn("font-medium", accent)}>
                    {Math.round(distanceToNext).toLocaleString("es-AR")} km
                  </span>{" "}
                  <span className="hidden xs:inline">hasta </span>
                  <span className="xs:inline">{nextStop.city}</span>
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <div className={cn("h-0.5 sm:h-1 bg-linear-to-r", gradient, "opacity-60")} />
      </div>
    </CardWrapper>
  );
}
