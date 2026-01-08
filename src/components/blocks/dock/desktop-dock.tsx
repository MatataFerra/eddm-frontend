import { Separator } from "@/components/ui/separator";
import { useHideElementScroll } from "@/lib/hooks/use-hide-element-scroll";
import type { DockItemProps } from "@/lib/interfaces/dock";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";

const IconContainerMemoized = dynamic(() =>
  import("@/components/blocks/dock/desktop-item").then((mod) => mod.IconContainerMemoized)
);

export function FloatingDockDesktop({
  items,
  className,
}: {
  items: DockItemProps[];
  className?: string;
}) {
  const mouseX = useMotionValue(Infinity);
  const { shouldHide } = useHideElementScroll();

  return (
    <AnimatePresence mode="wait">
      <nav className="hidden md:flex fixed bottom-8 left-0 right-0 z-50 justify-center h-16">
        {!shouldHide && (
          <motion.div
            key="dock"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              opacity: { duration: 0.2 },
            }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
              "flex items-end gap-4 rounded-2xl px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 opacity-90 hover:opacity-100 transition-opacity",
              className
            )}>
            {items.map((item) => {
              if (item.only === "mobile") return null;
              if (item.title === "separator") {
                return (
                  <Separator
                    key={item.keyId}
                    orientation="vertical"
                    className="my-auto !h-1/2 bg-zinc-600 mx-1"
                  />
                );
              }

              return (
                <div key={item.keyId} className={item.className}>
                  <IconContainerMemoized mouseX={mouseX} {...item} />
                </div>
              );
            })}
          </motion.div>
        )}
      </nav>
    </AnimatePresence>
  );
}
