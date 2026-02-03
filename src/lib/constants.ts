export const APP_ROUTES = {
  main: "/",
  journey: "/12-meses-viajando",
  tales: "/relatos",
  trip: "/viaje",
  furtherTime: "/mas-aca-en-el-tiempo",
} as const;

export type AppRoutes = typeof APP_ROUTES;
export type RoutePaths = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];

export const ENDPOINTS = {
  ARTICLES: `${APP_ROUTES.journey}/article`,
  ARTICLE: (slug: string) => `${APP_ROUTES.journey}/article/${slug}`,
  TALES: `${APP_ROUTES.tales}`,
  TALE: (slug: string) => `${APP_ROUTES.tales}/${slug}`,
  TRIP: `${APP_ROUTES.trip}`,
  FURTHER_TIME: `${APP_ROUTES.furtherTime}`,
  FURTHER_TIME_ARTICLE: (slug: string) => `${APP_ROUTES.furtherTime}/${slug}`,
} as const;

export const EXTERNAL_API_ENDPOINTS = {
  SETTINGS: "/settings",
  TALES: "/tales",
  ARTICLES: "/articles",
  TALES_CONTENT_NAVIGATE: "/tales/content-navigate",
  ARTICLES_CONTENT_NAVIGATE: "/articles/content-navigate",
  FURTHER_TIME_CONTENT_NAVIGATE: "/further-time/content-navigate",
  NOTION_TALE: "/notion/tale",
  NOTION_ARTICLE: "/notion/article",
  NOTION_FURTHER_TIME_ARTICLE: "/notion/further-time",
  INDEX_CONTENT: "/index-content",
  STATS: "/stats",
  TRIP: "/trip",
  FURTHER_TIME: "/further-time",
  ARTICLE: (slug: string) => `/articles/${slug}`,
  TALE: (slug: string) => `/tales/${slug}`,
  FURTHER_TIME_ARTICLE: (slug: string) => `/further-time/${slug}`,
} as const;

export const CACHE_TAGS = {
  ARTICLES: "articles",
  TALES: "tales",
  CONTENT_ARTICLES_NAVIGATE: "content-articles",
  CONTENT_TALES_NAVIGATE: "content-tales",
  CONTENT_FURTHER_TIME_NAVIGATE: "content-further-time",
  SETTINGS: "settings",
  INDEX_CONTENT: "index-content",
  TALE_RENDER: "tale-render",
  STATS: "stats",
  TRIP: "trip",
  FURTHER_TIME: "further-time",
  ARTICLE: (slug: string) => `article-${slug}`,
  TALE: (slug: string) => `tale-${slug}`,
  FURTHER_TIME_ARTICLE: (slug: string) => `further-time-${slug}`,
  NOTION_TALE: (slug: string) => `notion-tale-${slug}`,
  NOTION_ARTICLE: (slug: string) => `notion-article-${slug}`,
  NOTION_FURTHER_TIME_ARTICLE: (slug: string) => `notion-further-time-${slug}`,
} as const;

export const FALLBACK_SLUG = "__placeholder__" as const;
export const NOTION_PARAM_KEY = {
  "notion-id": "notion-page-id",
  slug: "slug",
};
export const LOCALSTORAGE_KEYS = {
  BOOKMARKED_ARTICLES: "bookmarkedArticles",
  BOOKMARKED_TALES: "bookmarkedTales",
  EDDM_CONFIG_OBJECT: "eddm-config-object",
} as const;

export const TRANSLATE_ARTICLE_READ_STATUS = {
  es: {
    read: "Leído",
    reading: "Leyendo",
    unread: "No leído",
  },
} as const;

export const VIDEO_SIZE = {
  small: {
    width: 320,
    height: 240,
  },
  medium: {
    width: 640,
    height: 360,
  },
  large: {
    width: 1280,
    height: 720,
  },
} as const;

export const CONTEXT_TITLE = {
  es: "Prólogo",
};
