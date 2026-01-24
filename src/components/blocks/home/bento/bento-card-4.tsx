import { UniversalCard } from "@/components/ui/styled-cards/universal-card";
import { getStats } from "@/lib/api_methods/get-stats";
import { cn } from "@/lib/utils";
import { Earth, MapPin, NotebookPen, type LucideIcon } from "lucide-react";

type TStatsFromDB = {
  countries: number;
  km: number;
  notes: number;
};

type Stats = {
  label: string;
  value: string;
  StatIcon: LucideIcon;
  type: keyof TStatsFromDB;
};

export const STATS: Stats[] = [
  { label: "Países", value: "3", StatIcon: Earth, type: "countries" },
  { label: "Kilómetros", value: "12", StatIcon: MapPin, type: "km" },
  { label: "Notas", value: "50", StatIcon: NotebookPen, type: "notes" },
];

export async function BentoCard4() {
  const stats = await getStats<TStatsFromDB>();
  const formatter = new Intl.NumberFormat();

  return (
    <UniversalCard mode="soft" variant="red">
      <div className="flex justify-between w-full md:w-8/12 lg:w-10/12 mx-auto p-4">
        {STATS.map(({ label, value, StatIcon, type }) => (
          <div
            key={label}
            className={cn("flex flex-col justify-center items-center text-zinc-800 text-lg")}>
            <StatIcon className="size-8 mb-2" strokeWidth={1} />
            <p className="flex flex-col leading-relaxed">
              <span className="font-semibold">
                {stats
                  ? type === "km"
                    ? `${formatter.format(stats[type])} Km.`
                    : formatter.format(stats[type])
                  : value}
              </span>
              <span>{label}</span>
            </p>
          </div>
        ))}
      </div>
    </UniversalCard>
  );
}
