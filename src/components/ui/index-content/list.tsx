"use client";

import { ENDPOINTS } from "@/lib/constants";
import { type Article } from "@/lib/interfaces/articles";
import { useArticles } from "@/lib/providers/articles-provider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ListIndexContent() {
  const { articles: data } = useArticles();
  const currentEndpoint = usePathname();

  const groupByMonth = (items: Article[]) => Object.groupBy(items, (item) => item.category.name);

  return (
    <ol className="pl-8 w-80">
      {data && Object.keys(groupByMonth(data)).length > 0 ? (
        Object.entries(groupByMonth(data)).map(([month, items]) => (
          <li key={month}>
            <h2 className="font-bold capitalize mb-0">{month}</h2>
            <ul>
              {items
                ?.toSorted((a, b) => a.order - b.order)
                .map((item) => (
                  <li
                    key={item.id}
                    className={cn(
                      "text-balance",
                      currentEndpoint === ENDPOINTS.ARTICLE(item.slug) ? "ml-4" : "m-auto"
                    )}>
                    <Link
                      className={cn(
                        "transition-colors no-underline cursor-default font-bold",
                        currentEndpoint === ENDPOINTS.ARTICLE(item.slug)
                          ? ""
                          : "hover:text-cyan-600 cursor-pointer font-normal"
                      )}
                      href={`${ENDPOINTS.ARTICLE(item.slug)}`}>
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))
      ) : (
        <li>No hay contenido disponible.</li>
      )}
    </ol>
  );
}
