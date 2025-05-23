"use client";
import { ListItem } from "@/components/blocks/tales/list-item";
import { useTales } from "@/lib/providers/tales-provider";

export function ListTales() {
  const { tales } = useTales();
  return (
    <ul className="flex flex-col w-full md:max-w-1/2 mx-auto space-y-4 justify-center">
      {tales.map((tale) => (
        <ListItem key={tale.id} tale={tale} />
      ))}
    </ul>
  );
}
