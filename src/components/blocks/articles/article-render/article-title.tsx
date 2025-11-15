import type { ArticlePromise } from "@/lib/interfaces/articles";
import { ArticleHoverCard } from "@/components/blocks/articles/hover-card";
import { use } from "react";

type ArticleHeaderProps = {
  articlePromise: ArticlePromise;
};

export function ArticleTitle({ articlePromise }: ArticleHeaderProps) {
  const articlePromiseData = use(articlePromise);

  if (!articlePromiseData) return null;

  const {
    data: { ...article },
  } = articlePromiseData;

  return (
    <section className="flex items-center justify-center overflow-x-hidden p-8">
      <article>
        <h1 className="text-2xl md:text-5xl m-0 font-bold text-center text-white z-2">
          {article &&
            `${
              article.category.name === "context"
                ? "Acá empieza la aventura"
                : article.category.name?.charAt(0).toUpperCase() + article.category.name?.slice(1)
            }`}
        </h1>
        <div className="flex justify-center my-8 gap-4">
          {article?.geolocations?.map(({ geolocation }) => {
            return <ArticleHoverCard key={geolocation.id} geolocation={geolocation} />;
          })}
        </div>
      </article>
    </section>
  );
}
