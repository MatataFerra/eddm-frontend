"use client";

import { capitalize, groupArticles } from "@/lib/utils";

import { NoEntryFound } from "@/components/blocks/share/no-entry-found";
import { useRootData } from "@/lib/providers/root-data-provider";
import { ArticleGlowCard } from "@/components/blocks/articles/article-glow-card";

export function ArticlesGridView() {
  const { articles } = useRootData();

  const articlesByCategory = groupArticles(articles);

  if (articlesByCategory.size === 0) {
    return <NoEntryFound message="No se pueden visualizar las categorías correctamente" />;
  }

  return (
    <section className="flex flex-col gap-16 space-y-8 md:space-y-12 max-w-7xl mx-auto">
      {Array.from(articlesByCategory.entries()).map(
        ([categoryName, categoryArticles], groupIndex) => {
          const title = categoryName === "context" ? "Prólogo" : capitalize(categoryName);

          return (
            <div key={categoryName} className="flex flex-col">
              <h3 className="text-xl sm:text-2xl md:text-5xl font-light tracking-tight text-white leading-tight mb-4">
                {title}
              </h3>

              <div className="flex gap-4 flex-wrap md:flex-nowrap">
                {categoryArticles.map((article, articleIndex) => (
                  <ArticleGlowCard
                    key={article.slug}
                    article={article}
                    index={articleIndex}
                    data-slot={`article-glow-card-${groupIndex}-${articleIndex}`}
                    className={categoryName === "context" ? "w-full h-80" : "size-80"}
                  />
                ))}
              </div>
            </div>
          );
        },
      )}
    </section>
  );
}
