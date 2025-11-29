"use client";

import { ENDPOINTS, LOCALSTORAGE_KEYS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { capitalize, cn, groupByMonth } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heart, BookOpenText, BookCheck } from "lucide-react";
import { useRootData } from "@/lib/providers/root-data-provider";
import { useLocalStorageObject } from "@/lib/hooks/use-localstorage-object";
import type { LocalStorageConfig } from "@/lib/interfaces/share";

export function ListIndexContent() {
  const { tales, articles, entries } = useRootData();
  const { value } = useLocalStorageObject<LocalStorageConfig>(
    LOCALSTORAGE_KEYS.EDDM_CONFIG_OBJECT,
    {
      version: 1,
      bookmarked: [],
      "articles-read-status": {},
    }
  );

  const { bookmarked, "articles-read-status": articlesReadStatus } = value;

  const articlesReading = Object.entries(articlesReadStatus).filter(
    ([, status]) => status === "reading"
  );
  const articlesReaded = Object.entries(articlesReadStatus).filter(
    ([, status]) => status === "read"
  );

  const currentEndpoint = usePathname();

  const groupedMonths = groupByMonth(articles);
  const currentSlug = currentEndpoint.split("/").pop() || "";

  const defaultTale = tales?.find((tale) => tale.slug === currentSlug) ? "tales" : "";

  const defaultMonth =
    articles?.find((article) => article.slug === currentSlug)?.category.name || defaultTale;

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
            <AccordionItem value="articles-reading-status">
              <li>
                <AccordionTrigger className="capitalize mb-0 p-0 items-center no-underline! text-lg">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="flex">Leyendo</span>
                    <BookOpenText className="w-6 h-auto flex items-center " />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {articlesReading.length > 0 ? (
                    <ul>
                      {articlesReading.map(([slug]) => {
                        const article = entries?.find((art) => art.slug === slug);
                        if (!article) return null;
                        return (
                          <li key={article.id} className="text-balance w-11/12">
                            <Link
                              className="no-underline hover:underline"
                              href={`${ENDPOINTS.ARTICLE(article.slug)}`}>
                              {article.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="p-8">No hay artículos en progreso.</div>
                  )}
                </AccordionContent>
              </li>
            </AccordionItem>
            <AccordionItem value="articles-readed-status">
              <li>
                <AccordionTrigger className="capitalize mb-0 p-0 items-center no-underline! text-lg">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="flex">Leídos</span>
                    <BookCheck className="w-6 h-auto flex items-center " />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {articlesReaded.length > 0 ? (
                    <ul>
                      {articlesReaded.map(([slug]) => {
                        const article = entries?.find((art) => art.slug === slug);
                        if (!article) return null;
                        return (
                          <li key={article.id} className="text-balance w-11/12">
                            <Link
                              className="no-underline hover:underline"
                              href={`${ENDPOINTS.ARTICLE(article.slug)}`}>
                              {article.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="p-8">No hay artículos leídos.</div>
                  )}
                </AccordionContent>
              </li>
            </AccordionItem>
            <AccordionItem value="tales">
              <li>
                <AccordionTrigger className="font-bold capitalize mb-0 p-0 items-center no-underline! text-2xl text-indigo-400!">
                  Relatos
                </AccordionTrigger>
              </li>
              <AccordionContent>
                <ul>
                  {tales
                    ?.toSorted((a, b) => a.order - b.order)
                    .map((item) => (
                      <li key={item.id} className={cn("text-balance w-11/12")}>
                        <Link
                          className={cn(
                            "transition-colors no-underline cursor-default font-bold",
                            currentEndpoint === ENDPOINTS.TALE(item.slug)
                              ? ""
                              : "hover:text-cyan-600 cursor-pointer font-normal"
                          )}
                          href={`${ENDPOINTS.TALE(item.slug)}`}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="bookmarks">
              <li>
                <AccordionTrigger className="font-bold capitalize mb-0 p-0 items-center no-underline! text-2xl text-red-400!">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="flex">Favoritos</span>
                    <Heart className="w-6 h-auto flex items-center fill-red-400" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {bookmarked.length > 0 ? (
                    <ul>
                      {bookmarked.map((item) => (
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
