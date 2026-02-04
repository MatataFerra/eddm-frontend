import type { ArticlePromise } from "@/lib/interfaces/articles";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { use } from "react";

type ArticleHeaderProps = {
  articlePromise: ArticlePromise;
};

export function ArticleHeader({ articlePromise }: ArticleHeaderProps) {
  const articlePromiseData = use(articlePromise);
  if (!articlePromiseData) return null;

  const {
    data: { ...article },
  } = articlePromiseData;

  return (
    <>
      <header className="group/header grid grid-cols-1 grid-rows-1 items-center justify-items-center h-96 mb-8">
        <h2 className="col-start-1 col-end-2 row-start-1 row-end-auto p-6 z-10 self-center text-7xl text-white font-bold group-hover/header:opacity-20 transition-opacity duration-300">
          {article?.title}
        </h2>
        {article?.header?.url ? (
          <Image
            src={article?.header?.url}
            width={1280}
            height={738}
            alt={article.slug}
            className={cn(
              "w-full h-96 z-0 col-start-1 col-end-2 row-start-1 rounded-2xl row-end-auto transition-all duration-300 group-hover/header:rounded-lg group-hover/header:opacity-90 object-cover",
              "aspect-auto object-center opacity-100",
              "md:aspect-video md:opacity-40",
            )}
          />
        ) : null}
      </header>
    </>
  );
}
