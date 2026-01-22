import { UniversalCard } from "@/components/ui/styled-cards/universal-card";
import { cn } from "@/lib/utils";
import { Earth, MapPin, NotebookPen } from "lucide-react";

export const STATS = [
  { label: "Países", value: "3", Icon: Earth },
  { label: "Kilómetros", value: "12 Km", Icon: MapPin },
  { label: "Notas", value: "50 Notas", Icon: NotebookPen },
];

export function BentoCard4() {
  return (
    <UniversalCard mode="soft" variant="red">
      <div className="flex justify-between w-full md:w-8/12 lg:w-10/12 mx-auto p-4">
        {STATS.map(({ label, value, Icon }) => (
          <div
            key={label}
            className={cn("flex flex-col justify-center items-center text-zinc-800 text-lg")}>
            <Icon className="size-8 mb-2" strokeWidth={1} />
            <p className="flex flex-col leading-relaxed">
              <span className="font-semibold">{value}</span>
              <span>{label}</span>
            </p>
          </div>
        ))}
      </div>
    </UniversalCard>
  );
}
