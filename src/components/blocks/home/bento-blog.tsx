import { GlassTitle } from "@/components/ui/glass-title";
import { BackgroundMap } from "@/components/blocks/share/background-map";
import { BentoGrid, BentoItem } from "@/components/blocks/home/bento-grid";
import { GlassCard } from "@/components/ui/styled-cards/glass-card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PastelCard } from "@/components/ui/styled-cards/pastel-card";
import { SoftCard } from "@/components/ui/styled-cards/soft-card";

const PagodaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-12 h-12">
    <path d="M12 2v20M2 22h20M12 2l-8 4v2h16V6l-8-4zM4 12h16M6 12l-2 4v2h16v-2l-2-4M6 8v4M18 8v4M6 18v4M18 18v4" />
  </svg>
);

export function BentoBlog() {
  return (
    <main className="min-h-screen relative bg-deep-black text-gray-100 p-4 md:p-8 flex flex-col justify-center">
      <BackgroundMap />

      <div className="relative z-10 w-full container mx-auto grid grid-cols-2">
        <GlassTitle className="text-6xl md:text-[10rem] leading-[0.95] self-center col-span-2 md:col-span-1">
          El diario
          <br />
          de Mati
        </GlassTitle>

        <BentoGrid className="w-9/12">
          <BentoItem colSpan={4} rowSpan={4} className="p-0 ">
            <PastelCard variant="pinkish" contentClassName="h-full w-full p-4 flex items-start">
              <div className="max-w-105">
                <h3 className="text-5xl leading-[1.05] font-semibold tracking-tight text-[#6F4A2D]">
                  Un año viajando
                </h3>
                <p className="mt-3 font-medium text-[#6F4A2D]/70">
                  Durante 2024 y 2025 documenté todos los días
                </p>
                {/* <Image
                  src={"/nz-soft-ui.png"}
                  alt="Nueva Zelanda Soft UI"
                  width={400}
                  height={300}
                /> */}
              </div>
            </PastelCard>
          </BentoItem>

          <BentoItem colSpan={2} rowSpan={3}>
            <PastelCard className="flex flex-col gap-4">
              <h3 className="text-xl font-serif font-semibold">Relatos y Notas</h3>
              <Image
                src="/tintero.png"
                alt="Mapa de Nueva Zelanda"
                width={400}
                height={500}
                className="object-contain object-center mix-blend-screen opacity-90 rounded-md"
                priority
              />
            </PastelCard>
          </BentoItem>

          <BentoItem colSpan={2} rowSpan={3}>
            <GlassCard>
              <div className="w-full flex flex-col items-center gap-4">
                <Avatar className="w-25 h-auto">
                  <AvatarImage src="/avatar.jpeg" className="object-cover object-center" />
                  <AvatarFallback>MF</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xl text-center">Matias Ferraro</p>
                  <p className="text-center text-sm text-white/70 font-light leading-tight">
                    Mi cabeza es un laberinto ¿dónde vas minotauro?
                  </p>
                </div>
              </div>
            </GlassCard>
          </BentoItem>

          <BentoItem colSpan={3} rowSpan={2}>
            <GlassCard>Estadísticas</GlassCard>
          </BentoItem>
          <BentoItem colSpan={1} rowSpan={2}>
            <SoftCard
              variant="pink"
              title="Próximo destino: Japón"
              icon={<PagodaIcon />}
              className="h-full"
            />
          </BentoItem>
        </BentoGrid>
      </div>
    </main>
  );
}
