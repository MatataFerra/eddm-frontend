import { useMemo } from "react";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import type { Category, EntriesOrderByCategory } from "@/lib/interfaces/share";
import { usePathname } from "next/navigation";
import { useRootData } from "@/lib/providers/root-data-provider";
import { APP_ROUTES } from "@/lib/constants";

/**
 * Obtiene artículos adyacentes con navegación circular entre categorías
 * @performance O(n log n) inicial, luego O(1) para consultas
 * @feature Navegación circular (último → primero, primero → último)
 * @errorhandling Safe para inputs inválidos
 */
export function useArticleNavigation(
  orderedCategories: EntriesOrderByCategory[],
  segment: string | null,
) {
  const pathname = usePathname();
  const { articles, tales, furtherTimeArticles } = useRootData();

  const activeCollection = useMemo(() => {
    if (!pathname) return [];

    if (pathname.startsWith(APP_ROUTES.journey)) return articles;
    if (pathname.startsWith(APP_ROUTES.tales)) return tales;
    if (pathname.startsWith(APP_ROUTES.furtherTime)) return furtherTimeArticles;

    return [];
  }, [pathname, articles, tales, furtherTimeArticles]);

  const currentArticle = useMemo(
    () => activeCollection?.find((art) => art.slug === segment) as ContentNavigate | undefined,
    [activeCollection, segment],
  );

  const navigationContext = useMemo(() => {
    if (!currentArticle || !activeCollection || activeCollection.length === 0) {
      return { next: null, previous: null, current: currentArticle };
    }

    const validCategories = orderedCategories
      .filter((item): item is Category => item.type === "category")
      .map((item) => item.name);

    const categoryMap = new Map<string, ContentNavigate[]>();
    const categoriesWithArticles: string[] = [];
    const categoryIndices = new Map<string, { next: string; prev: string }>();

    validCategories.forEach((category) => {
      const articlesInCategory = activeCollection
        .filter((art) => art.category.name === category)
        .sort((a, b) => a.order - b.order);

      if (articlesInCategory.length > 0) {
        categoriesWithArticles.push(category);
        categoryMap.set(category, articlesInCategory);
      }
    });

    categoriesWithArticles.forEach((cat, i, arr) => {
      categoryIndices.set(cat, {
        next: arr[(i + 1) % arr.length],
        prev: arr[(i - 1 + arr.length) % arr.length],
      });
    });

    const currentCategory = currentArticle.category?.name as Category["name"];
    const articlesInCat = categoryMap.get(currentCategory) || [];
    const currentIndex = articlesInCat.findIndex((art) => art.id === currentArticle.id);

    const getNextCategory = (current: string) => categoryIndices.get(current)?.next;
    const getPrevCategory = (current: string) => categoryIndices.get(current)?.prev;

    const nextArticle = (() => {
      if (currentIndex >= 0 && currentIndex < articlesInCat.length - 1) {
        return articlesInCat[currentIndex + 1];
      }
      const nextCat = getNextCategory(currentCategory);
      return nextCat ? (categoryMap.get(nextCat)?.[0] ?? null) : null;
    })();

    const previousArticle = (() => {
      if (currentIndex > 0) {
        return articlesInCat[currentIndex - 1];
      }

      const prevCat = getPrevCategory(currentCategory);
      const prevArticles = prevCat ? categoryMap.get(prevCat) : [];
      return prevArticles?.length ? prevArticles[prevArticles.length - 1] : null;
    })();

    return {
      next: nextArticle || null,
      previous: previousArticle || null,
      current: currentArticle,
    };
  }, [activeCollection, currentArticle, orderedCategories]);

  return navigationContext;
}
