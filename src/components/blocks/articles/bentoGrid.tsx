"use client";

import { BentoGrid } from "@ui/bento-grid";

import type { PropsWithChildren, ReactNode } from "react";

export function BentoWrapper({ children }: PropsWithChildren): ReactNode {
  return (
    <BentoGrid className="max-w-4xl mx-auto p-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </BentoGrid>
  );
}
