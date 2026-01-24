import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UniversalCard } from "@/components/ui/styled-cards/universal-card";

export function BentoCard3() {
  return (
    <UniversalCard className="flex flex-col gap-4 p-4" variant="cream">
      <div className="w-full flex flex-col items-center gap-4">
        <Avatar className="w-25 h-auto">
          <AvatarImage src="/avatar.webp" className="object-cover object-center" />
          <AvatarFallback>MF</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl md:text-2xl font-semibold text-center">Matias Ferraro</p>
          <p className="hidden lg:block text-center text-sm font-light leading-tight">
            Mi cabeza es un laberinto ¿dónde vas minotauro?
          </p>
        </div>
      </div>
    </UniversalCard>
  );
}
