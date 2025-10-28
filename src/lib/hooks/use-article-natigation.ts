import { useMemo } from "react";
import type { Article, ContentNavigate } from "@/lib/interfaces/articles";
import { Category, EntriesOrderByCategory } from "@/lib/utils";

/**
 * Obtiene artículos adyacentes con navegación circular entre categorías
 * @performance O(n log n) inicial, luego O(1) para consultas
 * @feature Navegación circular (último → primero, primero → último)
 * @errorhandling Safe para inputs inválidos
 */
export function useArticleNavigation(
  currentArticle: Article | undefined,
  allArticles: ContentNavigate[],
  orderedCategories: EntriesOrderByCategory[]
) {
  const [categoryMap, sortedValidCategories, categoryIndices] = useMemo(() => {
    const validCategories = orderedCategories
      .filter((item): item is Category => item.type === "category")
      .map((item) => item.name);

    const map = new Map<string, ContentNavigate[]>();
    const categoriesWithArticles: string[] = [];
    const indices = new Map<string, { next: string; prev: string }>();

    // Filtrar categorías con artículos y ordenarlas
    validCategories.forEach((category) => {
      const articlesInCategory = allArticles
        .filter((art) => art.category.name === category)
        .sort((a, b) => a.order - b.order);

      if (articlesInCategory.length > 0) {
        categoriesWithArticles.push(category);
        map.set(category, articlesInCategory);
      }
    });

    // Precomputar los índices de navegación
    categoriesWithArticles.forEach((cat, i, arr) => {
      indices.set(cat, {
        next: arr[(i + 1) % arr.length], // Circular al siguiente
        prev: arr[(i - 1 + arr.length) % arr.length], // Circular al anterior
      });
    });

    return [map, categoriesWithArticles, indices];
  }, [allArticles, orderedCategories]);

  return useMemo(() => {
    if (!currentArticle || sortedValidCategories.length === 0) {
      return { next: null, previous: null };
    }

    const currentCategory = currentArticle.category?.name as Category["name"];
    const articlesInCategory = categoryMap.get(currentCategory) || [];
    const currentIndex = articlesInCategory.findIndex((art) => art.id === currentArticle.id);

    // Helpers de navegación optimizada en O(1)
    const getNextCategory = (current: Category["name"]) =>
      categoryIndices.get(current)?.next || null;

    const getPrevCategory = (current: Category["name"]) =>
      categoryIndices.get(current)?.prev || null;

    // Lógica NEXT perfectamente calibrada
    const nextArticle = (() => {
      // Caso 1: Hay siguiente en misma categoría
      if (currentIndex >= 0 && currentIndex < articlesInCategory.length - 1) {
        return articlesInCategory[currentIndex + 1];
      }

      // Caso 2: Circular a siguiente categoría con artículos
      const nextCat = getNextCategory(currentCategory);
      return nextCat ? categoryMap.get(nextCat)?.[0] : null;
    })();

    // Lógica PREVIOUS infalible
    const previousArticle = (() => {
      // Caso 1: Hay anterior en misma categoría
      if (currentIndex > 0) {
        return articlesInCategory[currentIndex - 1];
      }

      // Caso 2: Circular a categoría anterior con artículos
      const prevCat = getPrevCategory(currentCategory);
      const prevArticles = prevCat ? categoryMap.get(prevCat) : [];
      return prevArticles?.length ? prevArticles[prevArticles.length - 1] : null;
    })();

    return {
      next: nextArticle || null,
      previous: previousArticle || null,
    };
  }, [currentArticle, sortedValidCategories.length, categoryMap, categoryIndices]);
}
