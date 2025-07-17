"use client";

import { useArticles } from "@/lib/providers/articles-provider";
import { Portal } from "@radix-ui/react-portal";
import Image from "next/image";
import MarkdownRenderer from "@/components/blocks/articles/rich-text-renderer";
import { Navigation } from "@/components/blocks/articles/navigation";
import { monthsOrdered } from "@/lib/utils";
import { MobileIndexContent } from "@/components/ui/index-content/mobile";

export function ArticleRender({ slug }: { slug: string }) {
  const { articles } = useArticles();
  const article = articles.find((oneArticle) => oneArticle.slug === slug);

  return (
    <>
      <section className="flex items-center justify-center overflow-x-hidden relative">
        <article>
          <h1 className="text-2xl md:text-5xl m-0 font-bold text-center text-white relative z-2">
            {article &&
              `${
                article.category.name === "context"
                  ? "Acá empieza la aventura"
                  : article.category.name?.charAt(0).toUpperCase() + article.category.name?.slice(1)
              }`}
          </h1>
          {article && (
            <blockquote className="text-center text-white mb-2">
              relato n° {article.order}
            </blockquote>
          )}
        </article>
        <MobileIndexContent />
      </section>

      <section className="relative overflow-x-hidden">
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
                  ) : (
                    <h1>{article.title}</h1>
                  )}
                </header>
              )}
              <article className="max-w-xl mx-auto prose prose-h1:text-4xl prose-invert relative prose-ul:list-none">
                <blockquote>{article.summary}</blockquote>
                {article.content && <MarkdownRenderer content={article.content} />}
              </article>
            </div>
            <Portal asChild>
              <Navigation
                redirect="/12-meses-viajando"
                item={article}
                items={articles}
                typeOfOrder={monthsOrdered}
              />
            </Portal>
          </>
        ) : (
          <p>Entry not available... refresh your browser</p>
        )}
      </section>
    </>
  );
}
