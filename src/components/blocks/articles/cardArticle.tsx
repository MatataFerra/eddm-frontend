"use client";

import { DateParser } from "@/lib/services/DateParser";

import { CardSpotlight } from "@/components/ui/card-spotlight";
import type { Article } from "@lib/interfaces/articles";

type CardArticleProps = {
  article: Article & { className?: string };
};

export function CardArticle({ article }: CardArticleProps) {
  return (
    <CardSpotlight>
      <p className="text-xl font-bold relative z-20 mt-2 text-white">{article.title}</p>
      <div className="text-neutral-200 mt-4 relative z-20">{article.description}</div>
      <p className="text-neutral-300 mt-4 relative z-20 text-sm">
        {new DateParser(article.publishedAt).formatToHuman()}
      </p>
    </CardSpotlight>
  );
}
