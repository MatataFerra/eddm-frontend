import { Nav } from "@/components/blocks/share/nav";
import { ListTales } from "@/components/blocks/tales/list";
import { ListSkeleton } from "@/components/blocks/tales/tale-skeleton";
import { getContentNavigateTales } from "@/lib/api_methods/get-tales";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { Suspense } from "react";

export default async function Page() {
  const talesPromise = getContentNavigateTales<ApiResponse<ContentNavigate[]>>();
  return (
    <>
      <Nav />
      <h1 className="text-5xl my-8 lg:text-7xl font-bold text-center text-white z-2 font-sans ">
        Relatos y escritos
      </h1>
      <Suspense fallback={<ListSkeleton />}>
        <ListTales talesPromise={talesPromise} />
      </Suspense>
    </>
  );
}
