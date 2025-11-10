import { Nav } from "@/components/blocks/share/nav";
import { ResolvedTale } from "@/components/blocks/tales/resolved";
import { ListSkeleton } from "@/components/blocks/tales/tale-skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <Nav />
      <h1 className="text-5xl my-8 lg:text-7xl font-bold text-center text-white z-2 font-sans ">
        Relatos y escritos
      </h1>
      <Suspense fallback={<ListSkeleton />}>
        <ResolvedTale />
      </Suspense>
    </>
  );
}
