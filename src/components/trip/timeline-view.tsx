"use client";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { getDistanceFromLatLonInKm } from "@/lib/distance-in-km";
import { Trip } from "@/lib/interfaces/trip";
import { StopCard } from "./stop-card";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const dotColors = [
  { bg: "bg-violet-400", glow: "bg-violet-400/40" },
  { bg: "bg-cyan-400", glow: "bg-cyan-400/40" },
  { bg: "bg-pink-400", glow: "bg-pink-400/40" },
  { bg: "bg-emerald-400", glow: "bg-emerald-400/40" },
  { bg: "bg-amber-400", glow: "bg-amber-400/40" },
  { bg: "bg-indigo-400", glow: "bg-indigo-400/40" },
];

export function TimeLineTripView({ trip }: { trip: Trip }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end 95%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.section
      ref={ref}
      variants={container}
      initial="hidden"
      animate="show"
      className="relative mt-32 pl-32">
      <div className="absolute left-8 top-0 h-full w-0.5 bg-linear-to-b from-white/10 via-white/5 to-transparent rounded-full" />

      <motion.div
        style={{ scaleY: lineScale }}
        className="origin-top absolute left-8 top-0 h-full w-0.5 overflow-hidden rounded-full">
        <div className="h-full w-full bg-linear-to-b from-violet-400 via-cyan-400 to-pink-400" />
      </motion.div>

      <motion.div
        style={{ scaleY: lineScale }}
        className="origin-top absolute left-[1.9rem] top-0 h-full w-1 blur-xl">
        <div className="h-full w-full bg-linear-to-b from-violet-400/30 via-cyan-400/30 to-pink-400/30" />
      </motion.div>

      <div className="space-y-32 pb-80">
        {trip.stops.map((stop, index) => {
          const nextStop = trip.stops[index + 1];
          const distanceToNext = nextStop
            ? getDistanceFromLatLonInKm(
                stop.latitude,
                stop.longitude,
                nextStop.latitude,
                nextStop.longitude,
              )
            : undefined;

          const offset = index % 2 === 0 ? "ml-0" : "ml-16";
          const colorIndex = index % dotColors.length;
          const dotColor = dotColors[colorIndex];

          return (
            <motion.div key={stop.id} variants={item} className={cn("relative", offset)}>
              <div className="absolute -left-30 top-8">
                <div className="relative">
                  <motion.div
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                    className={cn("absolute inset-0 -m-2 rounded-full", dotColor.glow, "blur-lg")}
                  />

                  <div
                    className={cn(
                      "absolute -inset-1 rounded-full",
                      dotColor.bg,
                      "opacity-20 blur-md",
                    )}
                  />

                  <div
                    className={cn(
                      "relative w-3 h-3 rounded-full",
                      dotColor.bg,
                      "shadow-lg shadow-black/40",
                      "ring-2 ring-white/20 ring-offset-2 ring-offset-black/20",
                    )}
                  />

                  <div className="absolute inset-0 rounded-full bg-white/40 blur-sm scale-50" />
                </div>
              </div>

              <StopCard
                stop={stop}
                index={index}
                distanceToNext={distanceToNext}
                nextStop={nextStop}
              />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: trip.stops.length * 0.15 + 0.5, duration: 0.6 }}
        className="absolute left-8 bottom-0 -translate-x-1/2">
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-linear-to-br from-pink-400 to-purple-400 shadow-lg shadow-pink-500/40" />
          <div className="absolute inset-0 rounded-full bg-pink-400/40 blur-lg animate-pulse" />
        </div>
      </motion.div>
    </motion.section>
  );
}
