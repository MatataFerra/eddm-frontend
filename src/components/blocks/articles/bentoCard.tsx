"use client";

import type { Article } from "@lib/interfaces/articles";
import { cn } from "@lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

type CardArticleProps = {
  article: Article;
  className?: string;
  portrait?: boolean;
};

export function BentoCard({ article, portrait = false, className }: CardArticleProps) {
  const router = useRouter();
  function addBaseUrl(url?: string) {
    if (url && url.startsWith("http")) return url;

    return process.env.NEXT_PUBLIC_STRAPI_URL! + url;
  }

  return (
    <motion.div
      className={cn(
        "rounded-xl p-1 size-full bg-white dark:bg-neutral-800 overflow-hidden cursor-pointer",
        className
      )}
      onClick={() => router.push(`/article/${article.slug}`)}
      style={{
        rotate: Math.random() * 20 - 10,
      }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 100,
      }}
      whileTap={{
        scale: 1.1,
        rotate: 0,
        zIndex: 100,
      }}>
      <section className="grid grid-cols-1 grid-rows-1 border border-zinc-800 rounded-2xl w-full h-40 md:size-40">
        {portrait && (
          <Image
            src={addBaseUrl(article?.cover?.url)}
            alt={article.slug}
            width={600}
            height={600}
            className="rounded-lg aspect-square size-full object-cover shrink-0 col-start-1 row-start-1 z-0 opacity-75"
          />
        )}

        <p className="col-start-1 row-start-1 z-10 p-4 line-clamp-4 font-bold">
          {article.order}. {article.title}
        </p>
      </section>
    </motion.div>
  );
}
