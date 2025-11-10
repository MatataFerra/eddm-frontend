import { Nav } from "@/components/blocks/share/nav";
import { ListTales } from "@/components/blocks/tales/list";
import { getContentNavigateTales } from "@/lib/api_methods/get-tales";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { ContentNavigate } from "@/lib/interfaces/articles";

export default async function Page() {
  const talesPromise = getContentNavigateTales<ApiResponse<ContentNavigate[]>>();
  return (
    <>
      <Nav />
      <h1 className="text-5xl my-8 lg:text-7xl font-bold text-center text-white z-2 font-sans ">
        Relatos y escritos
      </h1>
      <ListTales talesPromise={talesPromise} />
    </>
  );
}
