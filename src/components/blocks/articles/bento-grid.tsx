import { BentoGrid } from "@ui/bento-grid";

import type { PropsWithChildren, ReactNode } from "react";

type BentoWrapperProps = PropsWithChildren<{
  onClick?: () => void;
}>;

export function BentoWrapper({ onClick, children }: BentoWrapperProps): ReactNode {
  return (
    <BentoGrid
      onClick={onClick}
      className="w-full md:max-w-5xl max-w-2xl mx-auto grid p-4 grid-cols-1 last:col-span-2 auto-rows-[16rem] md:auto-rows-[18rem] md:grid-cols-3 gap-4">
      {children}
    </BentoGrid>
  );
}
