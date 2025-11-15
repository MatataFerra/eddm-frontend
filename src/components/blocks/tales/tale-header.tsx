import Image from "next/image";
import { use } from "react";
import type { TalePromise } from "@/lib/interfaces/tales";

type TaleHeaderProps = {
  talePromise: TalePromise;
};

export function TaleHeader({ talePromise }: TaleHeaderProps) {
  const taleData = use(talePromise);
  const tale = taleData?.data.tale;

  return (
    <header
      className={
        "group/header grid grid-cols-1 grid-rows-1 items-center justify-items-center min-h-96 max-h-96 m-8"
      }>
      {tale?.header ? (
        <>
          <h1 className="col-start-1 col-end-2 row-start-1 row-end-auto p-4 z-10 self-center text-4xl text-white font-bold">
            {tale.title}
          </h1>
          <Image
            src={tale?.header?.url}
            width={1280}
            height={100}
            alt={tale.slug}
            className="w-full h-80 opacity-40 -z-10 col-start-1 col-end-2 row-start-1 rounded-2xl row-end-auto group-hover/header:h-96 transition-all duration-300 group-hover/header:rounded-lg group-hover/header:opacity-70 object-cover aspect-video object-center"
          />
        </>
      ) : (
        <article className="grid grid-cols-1 grid-rows-1 w-full items-center justify-items-center rounded-md border border-slate-300/10 shadow bg-accent-foreground/60 min-h-80">
          <h1 className="col-start-1 col-end-2 row-start-1 row-end-auto p-4 z-10 self-center text-4xl text-white font-bold">
            {tale?.title}
          </h1>
        </article>
      )}
    </header>
  );
}
