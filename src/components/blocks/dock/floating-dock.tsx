import { FloatingDockMobile } from "@/components/blocks/dock/mobile-dock";
import { FloatingDockDesktop } from "@/components/blocks/dock/desktop-dock";
import type { DockItemProps } from "@/lib/interfaces/dock";
import { cn } from "../../../lib/utils";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItemProps[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={cn(desktopClassName)} />
      <FloatingDockMobile items={items} className={cn(mobileClassName)} />
    </>
  );
};
