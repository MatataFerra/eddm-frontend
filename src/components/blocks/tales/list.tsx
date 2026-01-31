import { ListItem } from "@/components/blocks/tales/list-item";
import { ApiResponse } from "@/lib/fetch/caller";
import { ContentNavigate } from "@/lib/interfaces/articles";
import { use } from "react";
import { NoEntryFound } from "@/components/blocks/share/no-entry-found";
import { Masonry } from "@/components/ui/masonry";
import { getBentoConfig } from "@/lib/get-bento-config";

const customConfig = {
  1: {
    span: "md:col-span-1 md:row-span-4",
  },

  3: {
    span: "md:col-span-1 md:row-span-2",
  },
};

export function ListTales({
  talesPromise,
}: {
  talesPromise: Promise<ApiResponse<ContentNavigate[]> | null>;
}) {
  const data = use(talesPromise);
  const tales = data?.data;

  const hasTales = tales && tales.length > 0;

  if (!hasTales) {
    return <NoEntryFound message="No se encontraron relatos, prueba refrescando la página" />;
  }

  return (
    <Masonry className="max-w-7xl mx-auto">
      {tales
        ?.toSorted((a, b) => a.order - b.order)
        ?.map((tale, index) => {
          const config = getBentoConfig(index, customConfig);

          return (
            <ListItem
              data-slot={`list-item-${index}`}
              key={tale.id}
              tale={tale}
              index={index}
              config={config}
            />
          );
        })}
    </Masonry>
  );
}
