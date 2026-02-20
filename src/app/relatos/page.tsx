import type { Metadata } from "next";
import { ListSkeleton } from "@/components/blocks/share/content-render/content-skeleton";
import { Nav } from "@/components/blocks/share/nav";
import { ShareTitle } from "@/components/blocks/share/title";
import { ResolvedTale } from "@/components/blocks/tales/resolved";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Relatos y escritos | El diario de Mati",
  description: "Relatos, cuentos y escritos sobre mis experiencias y reflexiones.",
};

export default async function Page() {
  return (
    <>
      <Nav />
      <ShareTitle title="Relatos y escritos" className="text-7xl lg:text-9xl mt-2 mb-8" />
      <Suspense fallback={<ListSkeleton />}>
        <ResolvedTale />
      </Suspense>
    </>
  );
}
