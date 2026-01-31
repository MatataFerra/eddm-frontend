import { UniversalCard } from "@/components/ui/styled-cards/universal-card";
import Image from "next/image";

export function BentoCard1() {
  return (
    <UniversalCard
      link="/12-meses-viajando"
      variant="teal"
      contentClassName="h-full w-full p-4 flex items-start"
      editorialLine>
      <div className="max-w-105 text-start">
        <h3 className="text-5xl leading-[1.05] font-bold tracking-tight text-[#6F4A2D]">
          Un año viajando
        </h3>
        <p className="mt-3 font-semibold text-[#6F4A2D]">
          Durante 2024 y 2025 escribí todos los días. Caminá junto a mi este viaje.
        </p>
        <Image
          className="absolute top-0 right-0 transform rotate-12 -z-10 opacity-50"
          src={"/nz-soft-ui.webp"}
          alt="Nueva Zelanda Soft UI"
          width={400}
          height={300}
        />
      </div>
    </UniversalCard>
  );
}
