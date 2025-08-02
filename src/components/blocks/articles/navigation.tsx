"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Separator } from "@/components/ui/separator";
import { useArticleNavigation } from "@/lib/hooks/use-article-natigation";
import { Article } from "@/lib/interfaces/articles";
import { EntriesOrderByCategory, monthsOrdered } from "@/lib/utils";
import { ChevronLeft, ChevronRight, House } from "lucide-react";
import { useRouter } from "next/navigation";

type NavigationProps = {
  redirect: "/" | "/12-meses-viajando" | "/relatos";
  item: Article;
  items: Article[];
  typeOfOrder: EntriesOrderByCategory[];
};

export function Navigation({ item, items, redirect }: NavigationProps) {
  const { replace, push } = useRouter();
  const { next: getNextArticle, previous: getPreviousArticle } = useArticleNavigation(
    item,
    items,
    monthsOrdered
  );

  return (
    <Dock
      direction="middle"
      className="border-white/30 bottom-0 right-0 sticky z-40 w-fit custom-padding mb-8">
      <DockIcon>
        <ChevronLeft
          className="size-8"
          onClick={() => {
            if (!getPreviousArticle) return;

            push(getPreviousArticle?.slug);
          }}
        />
      </DockIcon>
      <Separator orientation="vertical" className="h-1/2! bg-white w-full" />
      <DockIcon>
        <House className="size-12" onClick={() => replace(redirect)} />
      </DockIcon>
      <Separator orientation="vertical" className="h-1/2! py-2 bg-white w-full" />
      <DockIcon>
        <ChevronRight
          className="size-8"
          onClick={() => {
            if (!getNextArticle) return;
            push(getNextArticle?.slug);
          }}
        />
      </DockIcon>
    </Dock>
  );
}
