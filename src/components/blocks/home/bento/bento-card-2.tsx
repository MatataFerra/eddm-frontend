import { UniversalCard } from "@/components/ui/styled-cards/universal-card";
import Image from "next/image";

export function BentoCard2() {
  return (
    <UniversalCard className="flex flex-col gap-4 p-4" variant="cream" link="/relatos">
      <div className="grid grid-rows-[auto_1fr] gap-4 items-center">
        <h3 className="text-xl font-serif font-semibold">Relatos y Notas</h3>
        <Image
          src="/tintero.webp"
          alt="Imagen de un tintero y una pluma"
          width={200}
          height={300}
          className="object-contain object-center mix-blend-screen opacity-70 rounded-md self-center"
          priority
        />
      </div>
    </UniversalCard>
  );
}
