"use client";

import Image from "next/image";
import MarkdownRenderer from "@/components/blocks/articles/rich-text-renderer";
import { Navigation } from "@components/blocks/articles/Navigation";
import { useTales } from "@/lib/providers/tales-provider";

export function TaleRender({ slug }: { slug: string }) {
  const { tales } = useTales();
  const tale = tales.find((oneTale) => oneTale.slug === slug);

  return (
    <>
      <section className="relative mb-40">
        {tale ? (
          <>
            <div className="max-w-full">
              {tale && tale.header && (
                <header className="group/header grid grid-cols-1 grid-rows-1 items-center justify-items-center min-h-96 max-h-96 mb-8">
                  <h1 className="col-start-1 col-end-2 row-start-1 row-end-auto p-4 z-10 self-center text-4xl text-white font-bold">
                    {tale.title}
                  </h1>
                  <Image
                    src={tale?.header?.url}
                    width={1280}
                    height={738}
                    alt={tale.slug}
                    className="w-full h-80 opacity-10 -z-10 col-start-1 col-end-2 row-start-1 rounded-2xl row-end-auto group-hover/header:h-96 transition-all duration-300 group-hover/header:rounded-lg group-hover/header:opacity-30 object-cover "
                  />
                </header>
              )}
              <article className="max-w-xl mx-auto prose prose-h1:text-4xl prose-invert">
                <blockquote>{tale.summary}</blockquote>
                {tale.content && <MarkdownRenderer content={tale.content} />}
              </article>
            </div>
            <Navigation
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
