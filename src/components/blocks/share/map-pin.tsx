import { Badge } from "@/components/ui/badge";
import { capitalize, cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

type Props = React.ComponentProps<"span"> & { name: string; className?: string };

export function MapPinBadge({ name, className, ...props }: Props) {
  return (
    <>
      <Badge
        className={cn("flex items-center justify-between bg-white text-black", className)}
        {...props}>
        {capitalize(name)}
        <MapPin />
      </Badge>
    </>
  );
}
