"use client";

import { ENDPOINTS } from "@/lib/constants";
import { useArticles } from "@/lib/providers/articles-provider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { capitalize, cn, groupByMonth } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heart } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export function ListIndexContent() {
  const { articles: data } = useArticles();
  const [bookmarks] = useLocalStorage<string[]>("bookmarkedArticles", []);
  const currentEndpoint = usePathname();

  const groupedMonths = groupByMonth(data);
  const currentSlug = currentEndpoint.split("/").pop() || "";

  const defaultMonth =
    data.find((article) => article.slug === currentSlug)?.category.name ||
    groupedMonths[0]?.month ||
    "";

  return (
    <ol className="w-full">
      <Accordion type="single" collapsible className="w-full" defaultValue={defaultMonth}>
        <>
          <ul className="list-none p-0 m-0">
            {groupedMonths.length > 0 ? (
              groupedMonths.map((group) => (
                <AccordionItem value={group.month} key={group.month}>
                  <li>
                    <AccordionTrigger className="font-bold capitalize mb-0 p-0 items-center no-underline text-lg">
                      {group.month}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {group.articles
                          .toSorted((a, b) => a.order - b.order)
                          .map((item) => (
                            <li key={item.id} className={cn("text-balance w-11/12")}>
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
                    </AccordionContent>
                  </li>
                </AccordionItem>
              ))
            ) : (
              <li className="p-8">No hay contenido disponible.</li>
            )}
            <AccordionItem value="bookmarks">
              <li>
                <AccordionTrigger className="font-bold capitalize mb-0 p-0 items-center no-underline! text-2xl text-red-400!">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="flex">Favoritos</span>
                    <Heart className="w-6 h-auto flex items-center fill-red-400" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {bookmarks.length > 0 ? (
                    <ul>
                      {bookmarks.map((item) => (
                        <li key={item} className="text-balance w-11/12">
                          <Link
                            className="no-underline hover:underline"
                            href={`${ENDPOINTS.ARTICLE(item)}`}>
                            {capitalize(item.split("-").join(" "))}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-8">No hay artículos guardados.</div>
                  )}
                </AccordionContent>
              </li>
            </AccordionItem>
          </ul>
        </>
      </Accordion>
    </ol>
  );
}
