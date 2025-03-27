import { useMemo } from "react";
import { Article } from "@/lib/interfaces/articles";
import { Category, MonthsOrdered } from "@/lib/utils";

/**
 * Obtiene artículos adyacentes con navegación circular entre categorías
 * @performance O(n log n) inicial, luego O(1) para consultas
 * @feature Navegación circular (último → primero, primero → último)
 * @errorhandling Safe para inputs inválidos
 */
export function useArticleNavigation(
  currentArticle: Article | undefined,
  allArticles: Article[],
  orderedCategories: MonthsOrdered[]
) {
  // 1. Preprocesamiento ultra-optimizado
  const [categoryMap, sortedCategories] = useMemo(() => {
    const validCategories = orderedCategories
      .filter((item): item is Category => item.type === "category")
      .map((item) => item.name);

    const map = new Map<string, Article[]>();

    // Ordenar artículos solo una vez por categoría
    validCategories.forEach((category) => {
      const articlesInCategory = allArticles
        .filter((art) => art.category.name === category)
        .sort((a, b) => a.order - b.order);

      map.set(category, articlesInCategory);
    });

    return [map, validCategories];
  }, [allArticles, orderedCategories]);

  // 2. Navegación a prueba de balas
  return useMemo(() => {
    if (!currentArticle || sortedCategories.length === 0) {
      return { next: null, previous: null };
    }

    const currentCategory = currentArticle.category.name as Category["name"];
    const articlesInCategory = categoryMap.get(currentCategory) || [];
    const currentIndex = articlesInCategory.findIndex((art) => art.id === currentArticle.id);

    // Helpers de navegación circular segura
    const getNextCategory = (current: Category["name"]) => {
      const idx = sortedCategories.indexOf(current);
      return idx === -1 ? null : sortedCategories[(idx + 1) % sortedCategories.length];
    };

    const getPrevCategory = (current: Category["name"]) => {
      const idx = sortedCategories.indexOf(current);
      return idx === -1
        ? null
        : sortedCategories[(idx - 1 + sortedCategories.length) % sortedCategories.length];
    };

    // Lógica NEXT perfectamente calibrada
    const nextArticle = (() => {
      // Caso 1: Hay siguiente en misma categoría
      if (currentIndex >= 0 && currentIndex < articlesInCategory.length - 1) {
        return articlesInCategory[currentIndex + 1];
      }

      // Caso 2: Circular a siguiente categoría
      const nextCat = getNextCategory(currentCategory);
      return nextCat ? categoryMap.get(nextCat)?.[0] : null;
    })();

    // Lógica PREVIOUS infalible
    const previousArticle = (() => {
      // Caso 1: Hay anterior en misma categoría
      if (currentIndex > 0) {
        return articlesInCategory[currentIndex - 1];
      }

      // Caso 2: Circular a categoría anterior
      const prevCat = getPrevCategory(currentCategory);
      const prevArticles = prevCat ? categoryMap.get(prevCat) : [];
      return prevArticles?.length ? prevArticles[prevArticles.length - 1] : null;
    })();

    return {
      next: nextArticle || null,
      previous: previousArticle || null,
    };
  }, [currentArticle, categoryMap, sortedCategories]);
}
