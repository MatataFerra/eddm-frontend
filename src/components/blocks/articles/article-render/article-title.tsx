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
        <div className="flex justify-center gap-4">
          {article?.geolocations?.map(({ geolocation }) => {
            return <ArticleHoverCard key={geolocation.id} geolocation={geolocation} />;
          })}
        </div>
      </article>
    </section>
  );
}
