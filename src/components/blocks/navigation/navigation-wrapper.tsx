import { Navigation } from "./navigation";
import type { PropsWithChildren } from "react";
import type { EntriesOrderByCategory } from "@/lib/interfaces/share";
import type { RoutePaths } from "@/lib/constants";

type NavigationWrapperProps = PropsWithChildren<{
  redirect: RoutePaths;
  typeOfOrder: EntriesOrderByCategory[];
}>;

export function NavigationWrapper({ redirect, typeOfOrder }: NavigationWrapperProps) {
  return <Navigation redirect={redirect} typeOfOrder={typeOfOrder} />;
}
