import { type EntriesOrderByCategory } from "@/lib/interfaces/share";
import { type RoutePaths } from "@/lib/constants";
import { EntryNavWrapper } from "@/components/blocks/navigation/entry-nav-wrapper";

type NavigationProps = {
  redirect: RoutePaths;
  typeOfOrder: EntriesOrderByCategory[];
  segment?: string | null;
};

export function Navigation({ typeOfOrder, redirect }: NavigationProps) {
  return (
    <div className="md:bg-accent-foreground flex items-center justify-center mx-auto z-10">
      <EntryNavWrapper redirect={redirect} typeOfOrder={typeOfOrder} />
    </div>
  );
}
