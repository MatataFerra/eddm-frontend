import type { ArticlePromise } from "@/lib/interfaces/articles";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { use } from "react";

type FurtherTimeArticleHeaderProps = {
  furtherTimeArticlePromise: ArticlePromise;
};

export function FurtherTimeArticleHeader({
  furtherTimeArticlePromise,
}: FurtherTimeArticleHeaderProps) {
  const furtherTimeArticleData = use(furtherTimeArticlePromise);

  if (!furtherTimeArticleData) return null;

  const {
    data: { ...article },
  } = furtherTimeArticleData;

  return (
    <>
      <header className="group/header grid grid-cols-1 grid-rows-1 items-center justify-items-center mb-8">
        <h1 className="col-start-1 col-end-2 row-start-1 row-end-auto p-6 z-10 self-center text-5xl md:text-7xl text-white font-bold text-center">
          {article?.title}
        </h1>

        {article?.header?.url ? (
          <Image
            src={article?.header?.url}
            width={400}
            height={150}
            alt={article.slug}
            className={cn(
              "z-0 col-start-1 col-end-2 row-start-1 row-end-auto rounded-2xl transition-all duration-300 group-hover/header:rounded-lg 0 object-cover w-full h-96 md:h-150",
            )}
          />
        ) : null}
      </header>
    </>
  );
}
