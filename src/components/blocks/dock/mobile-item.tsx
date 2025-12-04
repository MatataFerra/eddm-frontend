import { Button } from "@/components/ui/button";
import type { DockItemProps } from "@/lib/interfaces/dock";
import Link from "next/link";

export function MobileItem({ title, icon, href, onClick }: DockItemProps) {
  if (href) {
    return (
      <Button asChild type="button" size="icon" aria-label={title}>
        <Link href={href}>{icon}</Link>
      </Button>
    );
  }
  return (
    <Button onClick={onClick} type="button" size="icon" aria-label={title}>
      {icon}
    </Button>
  );
}
