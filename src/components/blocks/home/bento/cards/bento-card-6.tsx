import { UniversalCard } from "@/components/ui/styled-cards/universal-card";
import Image from "next/image";

export function BentoCard6() {
  return (
    <UniversalCard
      className="flex flex-col gap-4 p-4"
      variant="yellow"
      link="/mas-aca-en-el-tiempo">
      <div className="grid grid-rows-[auto_1fr] gap-4 items-center">
        <h3 className="text-xl font-serif font-semibold z-10">Más acá en el tiempo</h3>
        <Image
          src="/mas-aca-en-el-tiempo.webp"
          alt="Un hombre contemplando como la muchedumbre avanza rápidamente a su alrededor con sus celulares"
          width={600}
          height={225}
          className="object-contain aspect-video object-center mix-blend-screen opacity-70 rounded-md self-center"
          priority
        />
      </div>
    </UniversalCard>
  );
}
