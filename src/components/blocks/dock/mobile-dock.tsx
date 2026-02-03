import { cn } from "@/lib/utils";
import type { DockItemProps } from "@/lib/interfaces/dock";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { useHideElementScroll } from "@/lib/hooks/use-hide-element-scroll";

const DynamicMobileItem = dynamic(
  () => import("@/components/blocks/dock/mobile-item").then((mod) => mod.MobileItem),
  {
    ssr: false,
  },
);

export function FloatingDockMobile({
  items,
  className,
}: {
  items: DockItemProps[];
  className?: string;
}) {
  const { shouldHide } = useHideElementScroll();

  return (
    <AnimatePresence mode="wait">
      {!shouldHide && (
        <motion.nav
          key="mobile-dock"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden", className)}>
          <div className="flex items-center gap-4 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 px-4 py-3 rounded-2xl shadow-2xl">
            {items.map((item) => {
              if (item.title === "separator") return null;
              if (item.only === "desktop") return null;
              return (
                <div key={item.keyId} className={item.className}>
                  <DynamicMobileItem {...item} />
                </div>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
