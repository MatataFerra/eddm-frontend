import { ListItem } from "@/components/blocks/tales/list-item";
import { ApiResponse } from "@/lib/fetch/caller";
import { ContentNavigate } from "@/lib/interfaces/articles";
import { use } from "react";

export function ListTales({
  talesPromise,
}: {
  talesPromise: Promise<ApiResponse<ContentNavigate[]> | null>;
}) {
  const data = use(talesPromise);
  const tales = data?.data;
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:max-w-1/2 mx-auto p-4 justify-center">
      {tales && tales.length > 0 ? (
        tales
          ?.toSorted((a, b) => a.order - b.order)
          .map((tale) => <ListItem key={tale.id} tale={tale} />)
      ) : (
        <div className="text-center text-gray-500">No hay relatos disponibles</div>
      )}
    </ul>
  );
}
