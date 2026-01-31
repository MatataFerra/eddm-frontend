import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UniversalCard } from "@/components/ui/styled-cards/universal-card";

export function BentoCard3() {
  return (
    <UniversalCard className="flex flex-col p-4" variant="cream" mode="soft">
      <div className="w-full flex flex-col items-center gap-2">
        <Avatar className="w-16 h-auto">
          <AvatarImage src="/avatar.webp" className="object-cover object-center" />
          <AvatarFallback>MF</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-center">Matias Ferraro</p>
        </div>
      </div>
    </UniversalCard>
  );
}
