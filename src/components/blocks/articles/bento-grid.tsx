import { BentoGrid } from "@ui/bento-grid";

import type { PropsWithChildren, ReactNode } from "react";

export function BentoWrapper({ children }: PropsWithChildren): ReactNode {
  return (
    <BentoGrid className="w-full md:max-w-5xl max-w-2xl mx-auto p-4 grid-cols-1 last:col-span-2 auto-rows-[16rem] md:auto-rows-[18rem] md:grid-cols-3 gap-4">
      {children}
    </BentoGrid>
  );
}
