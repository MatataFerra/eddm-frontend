import { Nav } from "@/components/blocks/share/nav";
import { ShareTitle } from "@/components/blocks/share/title";
import { ResolvedTale } from "@/components/blocks/tales/resolved";
import { ListSkeleton } from "@/components/blocks/tales/tale-skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <Nav />
      <ShareTitle title="Relatos y escritos" />
      <Suspense fallback={<ListSkeleton />}>
        <ResolvedTale />
      </Suspense>
    </>
  );
}
