export const ROOT = "12-meses-viajando";

export const ENDPOINTS = {
  ARTICLES: `/${ROOT}/article`,
  ARTICLE: (slug: string) => `/${ROOT}/article/${slug}`,
  TALES: "/relatos",
  TALE: (slug: string) => `/relatos/${slug}`,
};
