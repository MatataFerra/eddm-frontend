"use client";
import { ListItem } from "@/components/blocks/tales/list-item";
import { useTales } from "@/lib/providers/tales-provider";

export function ListTales() {
  const { tales } = useTales();
  return (
    <ul className="grid grid-cols-2 gap-4 w-full md:max-w-1/2 mx-auto space-y-4 justify-center">
      {tales && tales.length > 0 ? (
        tales?.map((tale) => <ListItem key={tale.id} tale={tale} />)
      ) : (
        <div className="text-center text-gray-500">No hay relatos disponibles</div>
      )}
    </ul>
  );
}
