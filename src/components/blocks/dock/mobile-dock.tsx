import { cn } from "@/lib/utils";
import type { DockItemProps } from "@/lib/interfaces/dock";
import dynamic from "next/dynamic";

const DynamicMobileItem = dynamic(
  () => import("@/components/blocks/dock/mobile-item").then((mod) => mod.MobileItem),
  {
    ssr: false,
  }
);

export function FloatingDockMobile({
  items,
  className,
}: {
  items: DockItemProps[];
  className?: string;
}) {
  return (
    <div className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden", className)}>
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
    </div>
  );
}
