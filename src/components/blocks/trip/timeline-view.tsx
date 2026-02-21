"use client";

import { m, useScroll, useTransform, type Variants } from "motion/react";
import { getDistanceFromLatLonInKm } from "@/lib/distance-in-km";
import type { Trip } from "@/lib/interfaces/trip";
import { useRef } from "react";
import { GlowTimelineCard } from "@/components/blocks/trip/glow-timeline-card";
import { TimelineItem } from "./timeline-item";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

export function TimeLineTripView({ trip }: { trip: Trip }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end 95%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const isLast = (index: number) =>
    index === trip.stops.length - 1 || index === trip.stops.length - 2;

  return (
    <m.section
      ref={ref}
      variants={container}
      initial="hidden"
      animate="show"
      className="relative mt-12 md:mt-20 lg:mt-32 pl-8 sm:pl-16 md:pl-24 lg:pl-32 pr-4 sm:pr-6">
      <div className="absolute left-4 sm:left-7 md:left-10 top-0 h-full w-px bg-linear-to-b from-white/15 via-white/5 to-transparent z-10" />

      <m.div
        style={{ scaleY: lineScale }}
        className="origin-top absolute left-4 sm:left-7 md:left-10 top-0 h-full w-px z-10">
        <div className="h-full w-full bg-linear-to-b from-violet-400 via-cyan-400 to-pink-400" />
      </m.div>

      <m.div
        style={{ scaleY: lineScale }}
        className="origin-top absolute left-4 sm:left-7 md:left-10 top-0 h-full w-1 blur-2xl z-10">
        <div className="h-full w-full bg-linear-to-b from-violet-400/40 via-cyan-400/40 to-pink-400/40" />
      </m.div>

      <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32 pb-32 sm:pb-48 md:pb-64 lg:pb-80">
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

          return (
            <TimelineItem key={stop.id} index={index}>
              <GlowTimelineCard
                stop={stop}
                index={index}
                distanceToNext={distanceToNext}
                nextStop={nextStop}
                isLast={isLast(index)}
                // image="https://res.cloudinary.com/docq8rbdu/image/upload/v1767770087/el-diario-de-mati/covers/mp3kmcws0swxpwcq7h5j.webp"
                link={stop.googleMapsUrl}
              />
            </TimelineItem>
          );
        })}
      </div>

      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: trip.stops.length * 0.15 + 0.4, duration: 0.6 }}
        className="absolute left-4 sm:left-7 md:left-10 bottom-0 -translate-x-1/2">
        <div className="relative">
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-linear-to-br from-pink-400 to-purple-400 shadow-lg shadow-pink-500/40" />
          <div className="absolute inset-0 rounded-full bg-pink-400/40 blur-xl animate-pulse" />
        </div>
      </m.div>
    </m.section>
  );
}
