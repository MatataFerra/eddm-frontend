import type { Article } from "@/lib/interfaces/articles";
import type { ApiResponse } from "@/lib/fetch/caller";

export type Tale = Article;

export type NotionTaleContentBySlug = {
  content: string;
  tale: Tale;
};

export type TalePromise = Promise<ApiResponse<NotionTaleContentBySlug> | null>;
