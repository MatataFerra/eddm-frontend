import { PagodaIcon } from "@/components/ui/pagoda-icon";
import { UniversalCard } from "@/components/ui/styled-cards/universal-card";

export function BentoCard5() {
  return (
    <UniversalCard mode="soft" variant="red" contentClassName="items-center">
      <PagodaIcon className="size-16 md:size-12 lg:size-12" />
      <p className="my-2 text-lg md:text-base lg:text-sm font-light text-zinc-800">
        Próximo destino
        <span className="block text-base font-semibold">Japón</span>
      </p>
    </UniversalCard>
  );
}
