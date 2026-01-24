import { GlassTitle } from "@/components/ui/glass-title";
import { BentoGrid, BentoItem } from "@/components/blocks/home/bento/bento-grid";
import { cn } from "@/lib/utils";
import { BentoCard1 } from "@/components/blocks/home/bento/bento-card-1";
import { BentoCard2 } from "@/components/blocks/home/bento/bento-card-2";
import { BentoCard3 } from "@/components/blocks/home/bento/bento-card-3";
import { BentoCard4 } from "@/components/blocks/home/bento/bento-card-4";
import { BentoCard5 } from "@/components/blocks/home/bento/bento-card-5";

const BIO = `
  Escribo desde que tengo memoria, no recuerdo un momento en el que no escriba al menos una vez al año. Sea por deshago o porque necesito ordenar mis pensamientos, la escritura ha estado allí; no me ha abandonado.
  Decidí empezar este blog para compartir lo que siento sin pensar en que alguien podría cernsurar lo que digo. Solo busco lo que está dentro mío; 
`;

export function BentoView() {
  return (
    <main className="min-h-screen relative text-gray-100 p-4 md:p-8 flex flex-col justify-center">
      <div className="relative z-10 w-full container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <GlassTitle
            variant="gold"
            className="text-7xl md:text-[10rem] leading-[0.95] self-start col-span-2 md:col-span-1">
            El diario
            <br />
            de Mati
          </GlassTitle>

          <p
            className={cn(
              "text-[#fff7e6] mt-8 text-xl",
              "[text-shadow:0_1px_1px_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.35)]",
              "before:content-[attr(data-text)] before:absolute before:inset-0",
              "before:text-zinc-700 before:opacity-70 before:translate-y-px before:pointer-events-none",
              "leading-relaxed",
            )}>
            {BIO} <span className="font-bold">el camino más difícil.</span>
          </p>
        </section>

        <BentoGrid className="w-full md:w-8/12 lg:w-9/12">
          <BentoItem
            colSpan={{ base: 2, md: 4, lg: 4 }}
            rowSpan={{ base: 2, md: 2, lg: 4 }}
            className="p-0">
            <BentoCard1 />
          </BentoItem>
          <BentoItem colSpan={{ md: 2, base: 1, lg: 2 }} rowSpan={{ base: 1, md: 1, lg: 3 }}>
            <BentoCard2 />
          </BentoItem>

          <BentoItem colSpan={{ md: 2, base: 1, lg: 2 }} rowSpan={{ base: 1, md: 1, lg: 3 }}>
            <BentoCard3 />
          </BentoItem>

          <BentoItem colSpan={{ md: 4, base: 2, lg: 3 }} rowSpan={{ base: 1, md: 1, lg: 2 }}>
            <BentoCard4 />
          </BentoItem>
          <BentoItem colSpan={{ md: 4, base: 2, lg: 1 }} rowSpan={{ base: 1, md: 2, lg: 2 }}>
            <BentoCard5 />
          </BentoItem>
        </BentoGrid>
      </div>
    </main>
  );
}
