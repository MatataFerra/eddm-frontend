import { TripStop } from "@/lib/interfaces/trip";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";

type Props = {
  stop: TripStop;
  index: number;
  distanceToNext?: number;
  nextStop?: TripStop;
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

export function StopCard({ stop, index, distanceToNext, nextStop }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 20%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(8px)", "blur(0px)"]);

  const colorIndex = index % gradients.length;
  const gradient = gradients[colorIndex];
  const accent = accentColors[colorIndex];
  const glow = glowColors[colorIndex];

  return (
    <motion.article
      ref={ref}
      style={{ y, opacity, scale, filter: blur }}
      className="relative group">
      <div
        className={cn(
          "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl",
          glow,
        )}
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-3xl",
          "bg-linear-to-br from-white/10 via-white/5 to-white/2",
          "backdrop-blur-xl border border-white/10",
          "shadow-2xl shadow-black/40",
          "transition-all duration-500",
          "hover:border-white/20 hover:shadow-3xl",
        )}>
        <div className={cn("absolute inset-0 bg-linear-to-br opacity-40", gradient)} />

        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

        <div className="relative px-8 py-8">
          <div className="flex items-start justify-between mb-6">
            <div
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-2xl",
                "bg-linear-to-br from-white/15 to-white/5",
                "border border-white/10",
                "shadow-lg shadow-black/20",
              )}>
              <span className={cn("text-2xl font-light", accent)}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div
              className={cn(
                "p-3 rounded-xl bg-white/5 border border-white/10",
                "backdrop-blur-sm",
              )}>
              <MapPin className={cn("w-5 h-5", accent)} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-3xl font-light tracking-tight text-white mb-2 leading-tight">
              {stop.city}
            </h3>
            <p className="text-base text-white/50 font-light">{stop.country}</p>
          </div>

          {distanceToNext && nextStop && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl",
                "bg-linear-to-r from-white/5 to-transparent",
                "border-l-2 border-white/20",
              )}>
              <div className={cn("p-2 rounded-lg bg-white/10", "backdrop-blur-sm")}>
                <Navigation className={cn("w-4 h-4", accent)} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/40 mb-0.5">Próximo destino</p>
                <p className="text-sm text-white/90">
                  <span className={cn("font-medium", accent)}>
                    {Math.round(distanceToNext).toLocaleString("es-AR")} km
                  </span>{" "}
                  hasta {nextStop.city}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom accent line */}
        <div className={cn("h-1 bg-linear-to-r", gradient, "opacity-60")} />
      </div>
    </motion.article>
  );
}
