"use client";

import { ENDPOINTS } from "@/lib/constants";
import { type Article } from "@/lib/interfaces/articles";
import { useArticles } from "@/lib/providers/articles-provider";
import Link from "next/link";

export function ListIndexContent() {
  const { articles: data } = useArticles();

  const groupByMonth = (items: Article[]) => {
    return Object.groupBy(items, (item) => {
      return item.category.name;
    });
  };

  return (
    <ol className="pl-8 w-80">
      {data && Object.keys(groupByMonth(data)).length > 0 ? (
        Object.entries(groupByMonth(data)).map(([month, items]) => (
          <li key={month}>
            <h2 className="font-bold capitalize mb-0">{month}</h2>
            <ul>
              {items?.map((item) => (
                <li key={item.id} className="text-balance">
                  <Link href={`${ENDPOINTS.ARTICLE(item.slug)}`}>{item.title}</Link>
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
