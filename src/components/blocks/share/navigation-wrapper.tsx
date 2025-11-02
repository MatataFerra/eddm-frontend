"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { Navigation } from "./navigation";
import type { PropsWithChildren } from "react";
import type { EntriesOrderByCategory } from "@/lib/utils";
import type { RoutePaths } from "@/lib/constants";

type NavigationWrapperProps = PropsWithChildren<{
  redirect: RoutePaths;
  typeOfOrder: EntriesOrderByCategory[];
}>;

export function NavigationWrapper({ redirect, typeOfOrder }: NavigationWrapperProps) {
  const segment = useSelectedLayoutSegment();

  if (!segment) {
    return null;
  }

  return <Navigation segment={segment} redirect={redirect} typeOfOrder={typeOfOrder} />;
}
