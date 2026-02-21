import { cn } from "@/lib/utils";
import { m, type Variants } from "motion/react";

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

export function TimelineItem({ children, index }: { children: React.ReactNode; index: number }) {
  const offset = index % 2 === 0 ? "lg:ml-0" : "lg:ml-16";
  return (
    <m.div
      className={cn("relative pl-10 sm:pl-14 md:pl-20", offset)}
      variants={item}
      initial="hidden"
      animate="show">
      <div className="relative z-20">{children}</div>
    </m.div>
  );
}
