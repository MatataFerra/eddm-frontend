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
              {items?.map((item) => (
                <li
                  key={item.id}
                  className={cn("text-balance")}
                  style={{
                    marginLeft:
                      currentEndpoint === ENDPOINTS.ARTICLE(item.slug) ? "1rem" : "initial",
                  }}>
                  <Link
                    className="transition-colors no-underline"
                    style={{
                      fontWeight:
                        currentEndpoint === ENDPOINTS.ARTICLE(item.slug) ? "bold" : "normal",
                      textDecoration:
                        currentEndpoint === ENDPOINTS.ARTICLE(item.slug) ? "none" : "underline",
                    }}
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
