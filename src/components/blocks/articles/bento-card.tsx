"use client";

import type { ContentNavigate } from "@lib/interfaces/articles";
import { cn } from "@lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ENDPOINTS } from "@/lib/constants";
import { useRandom } from "@/lib/hooks/use-random";

type CardArticleProps = {
  article: ContentNavigate;
  className?: string;
  portrait?: boolean;
  onClick?: () => void;
};

export function BentoCard({ article, portrait = false, className, onClick }: CardArticleProps) {
  const router = useRouter();
  const random = useRandom({ min: -10, max: 10 });

  function onNavigateToArticle(slug: string) {
    router.push(`${ENDPOINTS.ARTICLE(slug)}`);
    document.body.style.overflow = "auto";
  }

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
      onClick={() => {
        if (onClick) onClick();
        onNavigateToArticle(article.slug);
      }}
      style={{
        rotate: random,
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
      <section
        className={cn(
          "grid grid-cols-1 grid-rows-1 border border-zinc-800 rounded-2xl w-full mx-auto md:w-full h-40 md:size-40 my-4"
        )}>
        {portrait && (
          <Image
            src={addBaseUrl(article?.header?.url)}
            alt={article.slug}
            width={600}
            height={600}
            className="rounded-lg aspect-square size-full object-cover shrink-0 col-start-1 row-start-1 z-0 opacity-75"
            loading="lazy"
          />
        )}

        <div className="col-start-1 row-start-1 z-10 p-4 font-bold flex justify-between gap-1 w-full *:select-none">
          <p className="font-bebas self-center responsive-text text-balance">{article.title}</p>
        </div>
      </section>
    </motion.div>
  );
}
