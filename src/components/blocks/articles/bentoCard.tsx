"use client";

import { BentoGridItem } from "@ui/bento-grid";
import type { Article } from "@lib/interfaces/articles";
import { cn } from "@lib/utils";
import { DateParser } from "@lib/services/DateParser";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CardArticleProps = {
  article: Article;
  order?: number;
  className?: string;
};

export function BentoCard({ article, order, className }: CardArticleProps) {
  const router = useRouter();
  function addBaseUrl(url?: string) {
    if (url && url.startsWith("http")) return url;

    return process.env.NEXT_PUBLIC_STRAPI_URL + url;
  }

  return (
    <BentoGridItem
      title={article.title}
      onClick={() => router.push(`/${article.documentId}`)}
      number={order}
      description={
        <>
          <p>{article.summary}</p>
          <time className="font-bold">{new DateParser(article.publishedAt).formatToHuman()}</time>
        </>
      }
      header={
        <figure className="rounded-lg overflow-hidden w-full h-40 ">
          <Image
            className="object-cover size-full group-hover/bento:scale-105 transition-transform duration-300"
            width={400}
            height={400}
            src={addBaseUrl(article?.cover?.formats.medium.url)}
            alt={article?.cover?.alternativeText ?? article.slug}
          />
        </figure>
      }
      className={cn(className, "cursor-pointer")}
    />
  );
}
