"use client";

import { useMemo } from "react";
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
import { Heart, BookOpenText, BookCheck, type LucideIcon } from "lucide-react";
import { useRootData } from "@/lib/providers/root-data-provider";
import { useLocalStorageObject } from "@/lib/hooks/use-localstorage-object";
import type { LocalStorageConfig } from "@/lib/interfaces/share";
import { getNormalizedTitleText } from "@/lib/utils";

interface ItemData {
  id: string | number | undefined;
  title: string;
  href: string;
  order?: number;
}

interface SectionProps {
  value: string;
  title: React.ReactNode;
  items: ItemData[];
  emptyMessage?: string;
  currentEndpoint: string;
  icon?: LucideIcon;
  titleColorClass?: string;
}

function ListItemLink({ item, isActive }: { item: ItemData; isActive: boolean }) {
  return (
    <li className="text-balance w-11/12 text-lg">
      <Link
        href={item.href}
        className={cn(
          "transition-colors no-underline",
          isActive
            ? "cursor-default font-bold text-emerald-100/90"
            : "hover:text-cyan-200 cursor-pointer font-normal hover:underline"
        )}>
        {item.title}
      </Link>
    </li>
  );
}

function AccordionSection({
  value,
  title,
  items,
  emptyMessage = "No hay contenido disponible.",
  currentEndpoint,
  icon: Icon,
  titleColorClass,
}: SectionProps) {
  return (
    <AccordionItem value={value}>
      <li>
        <AccordionTrigger
          className={cn(
            "mb-0 p-0 items-center no-underline hover:no-underline text-xl",
            titleColorClass
          )}>
          <div className="flex items-center gap-2 justify-center font-bold capitalize">
            <span>{title}</span>
            {Icon && <Icon className={cn("w-6 h-auto flex items-center", titleColorClass)} />}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {items.length > 0 ? (
            <ul className="list-none p-0 m-0">
              {items.map((item) => (
                <ListItemLink key={item.id} item={item} isActive={currentEndpoint === item.href} />
              ))}
            </ul>
          ) : (
            <div className="p-8 text-muted-foreground">{emptyMessage}</div>
          )}
        </AccordionContent>
      </li>
    </AccordionItem>
  );
}

export function ListIndexContent() {
  const currentEndpoint = usePathname();
  const { tales, articles, entries } = useRootData();

  const { value: storageConfig } = useLocalStorageObject<LocalStorageConfig>(
    LOCALSTORAGE_KEYS.EDDM_CONFIG_OBJECT,
    { version: 1, bookmarked: [], "articles-read-status": {} }
  );

  const { bookmarked, "articles-read-status": articlesReadStatus } = storageConfig;

  const defaultAccordionValue = useMemo(() => {
    const currentSlug = currentEndpoint.split("/").pop() || "";

    if (tales?.some((t) => t.slug === currentSlug)) return "tales";

    const article = articles?.find((a) => a.slug === currentSlug);
    return article ? article.category.name : "";
  }, [currentEndpoint, tales, articles]);

  const groupedMonthsSections = useMemo(() => {
    return groupByMonth(articles).map(({ month, articles }) => ({
      value: month,
      title: getNormalizedTitleText(month),
      items: articles
        .toSorted((a, b) => a.order - b.order)
        .map((art) => ({
          id: art.id,
          title: art.title,
          href: ENDPOINTS.ARTICLE(art.slug),
        })),
    }));
  }, [articles]);

  function getArticlesBySlugs(slugs: string[]) {
    return slugs
      .map((slug) => entries?.find((art) => art.slug === slug))
      .filter((art): art is NonNullable<typeof art> => !!art)
      .map((art) => ({
        id: art.id,
        title: art.title,
        href: ENDPOINTS.ARTICLE(art.slug),
      }));
  }

  function readingItems() {
    const slugs = Object.entries(articlesReadStatus)
      .filter(([, status]) => status === "reading")
      .map(([slug]) => slug);
    return getArticlesBySlugs(slugs);
  }

  function readedItems() {
    const slugs = Object.entries(articlesReadStatus)
      .filter(([, status]) => status === "read")
      .map(([slug]) => slug);
    return getArticlesBySlugs(slugs);
  }

  const taleItems = useMemo(() => {
    return (tales || [])
      .toSorted((a, b) => a.order - b.order)
      .map((tale) => ({
        id: tale.id,
        title: tale.title,
        href: ENDPOINTS.TALE(tale.slug),
      }));
  }, [tales]);

  const bookmarkItems = useMemo(() => {
    return bookmarked.map((slug) => ({
      id: slug,
      title: capitalize(slug.split("-").join(" ")),
      href: ENDPOINTS.ARTICLE(slug),
    }));
  }, [bookmarked]);

  return (
    <ol className="w-full">
      <Accordion type="single" collapsible className="w-full" defaultValue={defaultAccordionValue}>
        <ul className="list-none p-0 m-0">
          {groupedMonthsSections.length > 0 ? (
            groupedMonthsSections.map((section) => (
              <AccordionSection
                key={section.value}
                value={section.value}
                title={section.title}
                items={section.items}
                currentEndpoint={currentEndpoint}
              />
            ))
          ) : (
            <li className="p-8">No hay contenido disponible.</li>
          )}

          <AccordionSection
            value="articles-reading-status"
            title="Leyendo"
            icon={BookOpenText}
            items={readingItems()}
            currentEndpoint={currentEndpoint}
            emptyMessage="No hay artículos en progreso."
          />

          <AccordionSection
            value="articles-readed-status"
            title="Leídos"
            icon={BookCheck}
            items={readedItems()}
            currentEndpoint={currentEndpoint}
            emptyMessage="No hay artículos leídos."
          />

          <AccordionSection
            value="tales"
            title="Relatos"
            items={taleItems}
            currentEndpoint={currentEndpoint}
            titleColorClass="text-indigo-400"
          />

          <AccordionSection
            value="bookmarks"
            title="Favoritos"
            icon={Heart}
            items={bookmarkItems}
            currentEndpoint={currentEndpoint}
            emptyMessage="No hay artículos guardados."
            titleColorClass="text-red-400 fill-red-400"
          />
        </ul>
      </Accordion>
    </ol>
  );
}
