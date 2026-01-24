import Image from "next/image";
import { use } from "react";
import type { TalePromise } from "@/lib/interfaces/tales";

type TaleHeaderProps = {
  talePromise: TalePromise;
};

export function TaleHeader({ talePromise }: TaleHeaderProps) {
  const taleData = use(talePromise);

  if (!taleData) return null;

  const {
    data: { ...tale },
  } = taleData;

  return (
    <header
      className={
        "group/header grid grid-cols-1 grid-rows-1 items-center justify-items-center mb-8"
      }>
      {tale?.header?.url ? (
        <>
          <h1 className="col-start-1 col-end-2 row-start-1 row-end-auto p-6 z-10 self-center text-7xl text-white font-bold [text-shadow:0_1px_2px_rgb(0_0_0/40%)] drop-shadow-2xl text-balance text-center">
            {tale.title}
          </h1>
          <Image
            src={tale?.header?.url}
            width={1024}
            height={100}
            alt={tale.slug}
            className="h-auto opacity-40 z-0 col-start-1 col-end-2 row-start-1 rounded-t-none rounded-4xl row-end-autotransition-all duration-300 object-cover aspect-video object-center"
          />
        </>
      ) : (
        <article className="grid grid-cols-1 grid-rows-1 w-full items-center justify-items-center rounded-md border border-slate-300/10 shadow bg-accent-foreground/60 min-h-80">
          <h1 className="col-start-1 col-end-2 row-start-1 row-end-auto p-4 z-10 self-center text-7xl text-white font-bold">
            {tale?.title}
          </h1>
        </article>
      )}
    </header>
  );
}
