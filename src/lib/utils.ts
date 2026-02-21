import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { Category, EntriesOrderByCategory } from "@/lib/interfaces/share";
import { CONTEXT_TITLE } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isCategory(item: EntriesOrderByCategory): item is Category {
  return item.type === "category";
}

export const MONTHS_ORDERED: Category[] = [
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
    (month): month is Category => isCategory(month) && month.name !== "tale",
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

  const categoryOrderIndex = new Map(MONTHS_ORDERED.map((item, index) => [item.name, index]));

  const sortedMap = new Map(
    Array.from(map.entries()).sort(([keyA], [keyB]) => {
      const orderA = categoryOrderIndex.get(keyA as Category["name"]) ?? Number.MAX_SAFE_INTEGER;
      const orderB = categoryOrderIndex.get(keyB as Category["name"]) ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    }),
  );

  return sortedMap;
}

export const getNormalizedTitleText = (text: string) =>
  text === "context" ? CONTEXT_TITLE.es : capitalize(text) || "Artículos";
