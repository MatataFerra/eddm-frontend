"use client";

import { useArticles } from "@/lib/providers/articles-provider";
import Image from "next/image";
import MarkdownRenderer from "@/components/blocks/articles/rich-text-renderer";
import { Navigation } from "@/components/blocks/share/navigation";
import { monthsOrdered } from "@/lib/utils";
import { ROOT } from "@/lib/constants";
import { ArticleHoverCard } from "@/components/blocks/articles/hover-card";
import type { Article } from "@/lib/interfaces/articles";

export function ArticleRender({ article }: { article: Article | null }) {
  const { articles } = useArticles();

  return (
    <>
      <main className="relative min-h-dvh w-11/12 mx-auto">
        <section className="flex items-center justify-center overflow-x-hidden p-8">
          <article>
            <h1 className="text-2xl md:text-5xl m-0 font-bold text-center text-white z-2">
              {article &&
                `${
                  article.category.name === "context"
                    ? "Acá empieza la aventura"
                    : article.category.name?.charAt(0).toUpperCase() +
                      article.category.name?.slice(1)
                }`}
            </h1>
            <div className="flex justify-center my-8 gap-4">
              {article?.geolocations?.map(({ geolocation }) => {
                return <ArticleHoverCard key={geolocation.id} geolocation={geolocation} />;
              })}
            </div>
          </article>
        </section>

        <section className="p-8">
          {article ? (
            <>
              <div className="max-w-full">
                {article && article.header && (
                  <header className="group/header grid grid-cols-1 grid-rows-1 items-center justify-items-center min-h-96 max-h-96 mb-8">
                    <h2 className="col-start-1 col-end-2 row-start-1 row-end-auto p-4 z-10 self-center text-4xl text-white font-bold">
                      {article.title}
                    </h2>

                    {article.header.url ? (
                      <Image
                        src={article?.header?.url}
                        width={1280}
                        height={738}
                        alt={article.slug}
                        className="w-full h-80 opacity-40 -z-10 col-start-1 col-end-2 row-start-1 rounded-2xl row-end-auto group-hover/header:h-96 transition-all duration-300 group-hover/header:rounded-lg group-hover/header:opacity-70 object-cover "
                      />
                    ) : null}
                  </header>
                )}
                <article className="max-w-xl p-4 mx-auto prose prose-h1:text-4xl prose-invert prose-ul:list-none">
                  <blockquote>{article.summary}</blockquote>
                  {article.content && <MarkdownRenderer content={article.content} />}
                </article>
              </div>
              <Navigation
                redirect={ROOT.journey}
                item={article}
                items={articles}
                typeOfOrder={monthsOrdered}
              />
            </>
          ) : (
            <p>Entry not available... refresh your browser</p>
          )}
        </section>
      </main>
    </>
  );
}
