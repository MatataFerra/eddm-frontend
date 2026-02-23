import { MapIcon } from "@/components/ui/icons/map";
import { TravelIcon } from "@/components/ui/icons/travel";
import { UniversalCard } from "@/components/ui/styled-cards/universal-card";
import { getStats } from "@/lib/api_methods/get-stats";
import { cn } from "@/lib/utils";
import { NotebookPen, type LucideIcon } from "lucide-react";

type TStatsFromDB = {
  countries: number;
  km: number;
  notes: number;
};

type Stats = {
  label: string;
  value: string;
  StatIcon: LucideIcon | typeof MapIcon;
  type: keyof TStatsFromDB;
};

const STATS: Stats[] = [
  { label: "Países", value: "4", StatIcon: MapIcon, type: "countries" },
  { label: "Recorridos", value: "59.439 km.", StatIcon: TravelIcon, type: "km" },
  { label: "Notas", value: "20", StatIcon: NotebookPen, type: "notes" },
];

export async function BentoCard4() {
  const stats = await getStats<TStatsFromDB>();
  const formatter = new Intl.NumberFormat();

  return (
    <UniversalCard
      mode="soft"
      variant="cream"
      link="/viaje"
      className="hover:-translate-y-1 duration-300 transition-transform">
      <div className="flex justify-between w-full md:w-8/12 lg:w-10/12 mx-auto p-2 md:p-4">
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
