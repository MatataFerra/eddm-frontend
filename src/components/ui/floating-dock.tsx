import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";

type ItemsProps = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export const FloatingDock = ({
  items,
  desktopClassName,
}: {
  items: ItemsProps[];
  desktopClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  );
};

const FloatingDockDesktop = ({ items, className }: { items: ItemsProps[]; className?: string }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <nav
      style={{ width: "100vw" }}
      className="h-16 fixed bottom-4 left-0 right-0 z-40 shadow-lg mb-8 flex justify-center">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "items-end gap-4 rounded-2xl px-4 pb-3 flex bg-accent-foreground  mx-auto opacity-50 hover:opacity-100 transition-opacity justify-center",
          className
        )}>
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </motion.div>
    </nav>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: ItemsProps & {
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
          <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex aspect-square items-center justify-center rounded-full bg-neutral-800">
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 2, x: "-50%" }}
                  className="absolute -top-8 left-1/2 w-fit rounded-md border px-2 py-0.5 text-xs whitespace-pre border-neutral-900 bg-neutral-800 text-white">
                  {title}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              style={{ width: widthIcon, height: heightIcon }}
              className="flex items-center justify-center">
              {icon}
            </motion.div>
          </motion.div>
        </a>
      ) : (
        onClick && (
          <motion.div
            ref={ref}
            style={{ width, height }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex aspect-square items-center justify-center rounded-full bg-neutral-800 cursor-pointer">
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 2, x: "-50%" }}
                  className="absolute -top-8 left-1/2 w-fit rounded-md border px-2 py-0.5 text-xs whitespace-pre border-neutral-900 bg-neutral-800 text-white">
                  {title}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              style={{ width: widthIcon, height: heightIcon }}
              className="flex items-center justify-center">
              {icon}
            </motion.div>
          </motion.div>
        )
      )}
    </>
  );
}
