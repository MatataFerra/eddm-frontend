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

export const EXTERNAL_API_ENDPOINTS = {
  SETTINGS: "/settings",
  TALES: "/tales",
  ARTICLES: "/articles",
  TALES_CONTENT_NAVIGATE: "/tales/content-navigate",
  ARTICLES_CONTENT_NAVIGATE: "/articles/content-navigate",
  ARTICLE: (slug: string) => `/articles/${slug}`,
  TALE: (slug: string) => `/tales/${slug}`,
  NOTION_TALE: "/notion/tale",
  INDEX_CONTENT: "/index-content",
};

export const CACHE_TAGS = {
  ARTICLES: "articles",
  TALES: "tales",
  CONTENT_ARTICLES_NAVIGATE: "content-articles",
  CONTENT_TALES_NAVIGATE: "content-tales",
  ARTICLE: (slug: string) => `article-${slug}`,
  TALE: (slug: string) => `tale-${slug}`,
  NOTION_TALE: (slug: string) => `notion-tale-${slug}`,
  SETTINGS: "settings",
  INDEX_CONTENT: "index-content",
} as const;

export const FALLBACK_SLUG = "__placeholder__" as const;
export const NOTION_PARAM_KEY = {
  "notion-id": "notion-page-id",
  slug: "slug",
};
