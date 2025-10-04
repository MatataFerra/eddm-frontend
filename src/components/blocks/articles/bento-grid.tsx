import { BentoGrid } from "@ui/bento-grid";

import type { PropsWithChildren, ReactNode } from "react";

export function BentoWrapper({ children }: PropsWithChildren): ReactNode {
  return (
    <BentoGrid className="w-full md:max-w-3xl mx-auto p-4 grid-cols-3 last:col-span-2 auto-rows-[16rem] md:grid-cols-2 gap-4">
      {children}
    </BentoGrid>
  );
}
