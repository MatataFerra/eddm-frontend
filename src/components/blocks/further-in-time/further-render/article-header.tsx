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
      <header className="group/header grid grid-cols-1 grid-rows-1 items-center justify-items-center mb-8">
        <h1 className="col-start-1 col-end-2 row-start-1 row-end-auto p-6 z-10 self-center text-7xl text-white font-bold text-center">
          {article?.title}
        </h1>

        {article?.header?.url ? (
          <Image
            src={article?.header?.url}
            width={400}
            height={256}
            alt={article.slug}
            className={cn(
              "w-full h-auto z-0 col-start-1 col-end-2 row-start-1 rounded-2xl row-end-auto transition-all duration-300 group-hover/header:rounded-lg 0 object-cover aspect-video",
            )}
          />
        ) : null}
      </header>
    </>
  );
}
