export const APP_ROUTES = {
  main: "/",
  journey: "/12-meses-viajando",
  tales: "/relatos",
} as const;

export type AppRoutes = typeof APP_ROUTES;
export type RoutePaths = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];

export const ENDPOINTS = {
  ARTICLES: `${APP_ROUTES.journey}/article`,
  ARTICLE: (slug: string) => `${APP_ROUTES.journey}/article/${slug}`,
  TALES: `${APP_ROUTES.tales}`,
  TALE: (slug: string) => `${APP_ROUTES.tales}/${slug}`,
};
