"use client";

import Image from "next/image";
import MarkdownRenderer from "@/components/blocks/articles/rich-text-renderer";
import { Navigation } from "@/components/blocks/share/navigation";
import { useTales } from "@/lib/providers/tales-provider";
import type { Tale } from "@/lib/interfaces/articles";
import { cn } from "@/lib/utils";

export function TaleRender({ tale, content }: { tale: Tale | null; content?: string }) {
  const { tales } = useTales();

  return (
    <>
      <section className="relative mb-40">
        {tale ? (
          <>
            <div className="max-w-full">
              {tale && (
                <header
                  className={cn(
                    "group/header grid grid-cols-1 grid-rows-1 items-center justify-items-center min-h-96 max-h-96 m-8",

                    !tale.header
                      ? "rounded-md border border-slate-300/10 shadow bg-accent-foreground/60"
                      : ""
                  )}>
                  {tale.header ? (
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
                    <h1 className="col-start-1 col-end-2 row-start-1 row-end-auto p-4 z-10 self-center text-4xl text-white font-bold">
                      {tale.title}
                    </h1>
                  )}
                </header>
              )}
              <article className="max-w-xl mx-auto prose prose-h1:text-4xl prose-invert p-4">
                <blockquote>{tale.summary}</blockquote>
                {content && <MarkdownRenderer content={content} />}
              </article>
            </div>
            <Navigation
              redirect="/relatos"
              item={tale}
              items={tales}
              typeOfOrder={[
                {
                  type: "category",
                  name: "tale",
                },
              ]}
            />
          </>
        ) : (
          <p>Entry not available... refresh your browser</p>
        )}
      </section>
    </>
  );
}
