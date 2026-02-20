"use client";

import { DockItemProps } from "@/lib/interfaces/dock";
import { AnimatePresence, MotionValue, m, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";

export function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: DockItemProps & {
  mouseX: MotionValue;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <>
      {href ? (
        <a href={href}>
          <m.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex aspect-square items-center justify-center rounded-full bg-neutral-800">
            <AnimatePresence>
              {hovered && (
                <m.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 2, x: "-50%" }}
                  className="absolute -top-8 left-1/2 w-fit rounded-md border px-2 py-0.5 text-xs whitespace-pre border-neutral-900 bg-neutral-800 text-white">
                  {title}
                </m.div>
              )}
            </AnimatePresence>
            <m.div
              style={{ width: widthIcon, height: heightIcon }}
              className="flex items-center justify-center">
              {icon}
            </m.div>
          </m.div>
        </a>
      ) : (
        onClick && (
          <m.div
            ref={ref}
            style={{ width, height }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex aspect-square items-center justify-center rounded-full bg-neutral-800 cursor-pointer active:bg-accent transition-colors">
            <AnimatePresence>
              {hovered && (
                <m.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 2, x: "-50%" }}
                  className="absolute -top-8 left-1/2 w-fit select-none rounded-md border px-2 py-0.5 text-xs whitespace-pre border-neutral-900 bg-neutral-800 text-white">
                  {title}
                </m.div>
              )}
            </AnimatePresence>
            <m.div
              style={{ width: widthIcon, height: heightIcon }}
              className="flex items-center justify-center">
              {icon}
            </m.div>
          </m.div>
        )
      )}
    </>
  );
}
