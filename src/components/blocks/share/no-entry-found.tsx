import { BentoWrapper } from "@/components/blocks/articles/bento-grid";

export function NoEntryFound({ message }: { message: string }) {
  return (
    <BentoWrapper>
      <div className="flex justify-center items-center h-auto text-center w-full col-span-3">
        <p className="text-2xl font-bold text-red-400">{message}</p>
      </div>
    </BentoWrapper>
  );
}
