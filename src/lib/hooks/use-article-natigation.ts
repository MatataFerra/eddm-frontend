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
  segment: string | null
) {
  const pathname = usePathname();
  const { articles, tales } = useRootData();

  const isArticles = pathname.startsWith(APP_ROUTES.journey);

  const allArticles = isArticles ? articles : tales;

  const currentArticle = allArticles?.find((art) => art.slug === `${segment}`) as
    | ContentNavigate
    | undefined;

  const validCategories = orderedCategories
    .filter((item): item is Category => item.type === "category")
    .map((item) => item.name);

  const categoryMap = new Map<string, ContentNavigate[]>();
  const categoriesWithArticles: string[] = [];
  const categoryIndices = new Map<string, { next: string; prev: string }>();

  // Filtrar categorías con artículos y ordenarlas
  validCategories.forEach((category) => {
    const articlesInCategory = allArticles
      ?.filter((art) => art.category.name === category)
      .sort((a, b) => a.order - b.order);

    if (articlesInCategory && articlesInCategory.length > 0) {
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

  const ctx = (() => {
    if (!currentArticle || categoriesWithArticles.length === 0) {
      return { next: null, previous: null, current: currentArticle };
    }

    const currentCategory = currentArticle.category?.name as Category["name"];
    const articlesInCategory = categoryMap.get(currentCategory) || [];
    const currentIndex = articlesInCategory.findIndex((art) => art.id === currentArticle.id);

    // Helpers (idénticos a los que tenías)
    const getNextCategory = (current: Category["name"]) =>
      categoryIndices.get(current)?.next || null;

    const getPrevCategory = (current: Category["name"]) =>
      categoryIndices.get(current)?.prev || null;

    // NEXT
    const nextArticle = (() => {
      if (currentIndex >= 0 && currentIndex < articlesInCategory.length - 1) {
        return articlesInCategory[currentIndex + 1];
      }
      const nextCat = getNextCategory(currentCategory);
      return nextCat ? categoryMap.get(nextCat)?.[0] ?? null : null;
    })();

    // PREVIOUS
    const previousArticle = (() => {
      if (currentIndex > 0) {
        return articlesInCategory[currentIndex - 1];
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
  })();

  return ctx;
}
