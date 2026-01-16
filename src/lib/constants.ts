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
  NOTION_ARTICLE: "/notion/article",
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
  NOTION_ARTICLE: (slug: string) => `notion-article-${slug}`,
  SETTINGS: "settings",
  INDEX_CONTENT: "index-content",
  TALE_RENDER: "tale-render",
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
