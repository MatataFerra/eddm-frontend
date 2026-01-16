import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { Category, EntriesOrderByCategory } from "@/lib/interfaces/share";
import type { CategoryListItem, PhraseListItem } from "@/lib/interfaces/cards";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isCategory(item: EntriesOrderByCategory): item is Category {
  return item.type === "category";
}

export const MONTHS_ORDERED: EntriesOrderByCategory[] = [
  { type: "category", name: "context" },
  { type: "category", name: "febrero" },
  { type: "category", name: "marzo" },
  { type: "category", name: "abril" },
  { type: "category", name: "mayo" },
  { type: "category", name: "junio" },
  { type: "category", name: "julio" },
  { type: "category", name: "agosto" },
  { type: "category", name: "septiembre" },
  { type: "category", name: "octubre" },
  { type: "category", name: "noviembre" },
  { type: "category", name: "diciembre" },
  { type: "category", name: "enero" },
  { type: "category", name: "febrero-25" },
];

export const groupByMonth = (items: ContentNavigate[] | null) => {
  const orderedMonths = MONTHS_ORDERED.filter(
    (month): month is Category => isCategory(month) && month.name !== "tale"
  ).map((month) => month.name);

  const groupedItems = Object.groupBy(items ?? [], (item) => item.category.name);

  return orderedMonths
    .map((month) => ({
      month,
      articles: groupedItems[month] || [],
    }))
    .filter((group) => group.articles.length > 0);
};

export function capitalize(text: string) {
  const [first, ...rest] = text.split("");
  const capitalize = first.toUpperCase();

  return [capitalize, ...rest].join("");
}

export function stripColSpan(cls?: string | null) {
  if (!cls) return "";
  return cls.replace(/\bcol-span-\d+\b/g, "").trim();
}

export function columnsClass(n?: number) {
  const x = Math.min(6, Math.max(1, n ?? 1));
  return `span ${x}`;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function objectIsEmpty(obj: unknown): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Object.keys(obj).length === 0 &&
    obj.constructor === Object
  );
}

export function extractSlugFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return segments.length > 0 ? segments[segments.length - 1] : null;
}

/* Detect MIME type from video URL */

export const isCloudinarySource = (url: string) => {
  return url.includes("cloudinary.com") || url.includes("/upload/");
};

export const getCloudinaryCoverUrl = (videoUrl: string, time: number = 1) => {
  if (!isCloudinarySource(videoUrl)) return undefined;

  const urlWithJpg = videoUrl.replace(/\.(mp4|webm|ogg|mov|mkv)(\?|$)/i, ".jpg$2");

  return urlWithJpg.replace("/upload/", `/upload/so_${time},f_jpg/`);
};

export const detectMimeType = (src: string): string => {
  const cleanSrc = src.split(/[?#]/)[0].toLowerCase();

  if (cleanSrc.endsWith(".webm")) return "video/webm";
  if (cleanSrc.endsWith(".ogg")) return "video/ogg";
  if (cleanSrc.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
};

export const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export function parseHeadings(markdown: string) {
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const matches = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const title = match[1].trim();
    const id = generateSlug(title);

    matches.push({ title, id });
  }

  return matches;
}

export function groupArticles(articles: ContentNavigate[] | null) {
  if (!articles) return new Map<string, ContentNavigate[]>();

  const map = new Map<string, ContentNavigate[]>();

  for (const a of articles) {
    const key = a.category.name;
    const current = map.get(key) || [];
    current.push(a);
    map.set(key, current);
  }

  for (const [, list] of map) {
    list.sort((a, b) => a.order - b.order);
  }

  return map;
}

export const getCategoryStyle = (category: PhraseListItem | CategoryListItem) => {
  const baseStyle = {
    gridColumn: `span ${category.columns}`,
    gridRow: `span ${category.rows}`,
  };

  if (category.type === "phrase" && category.gradient) {
    const direction = category.gradient.direction.replace(/_/g, " ").toLowerCase();
    return {
      ...baseStyle,
      background: `linear-gradient(${direction}, ${category.gradient.from}, ${
        category.gradient.via ?? category.gradient.from
      }, ${category.gradient.to})`,
      color: category.gradient.textColor,
    };
  }

  return baseStyle;
};
