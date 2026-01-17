import { z } from "zod";
import { fullArticleSchema } from "@/lib/schemas";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { ContentBySlug } from "@/lib/interfaces/share";

export type Article = z.infer<typeof fullArticleSchema>;
export type ContentNavigate = Pick<
  Article,
  "id" | "order" | "slug" | "category" | "title" | "header"
>;

export type ArticlePromise = Promise<ApiResponse<ContentBySlug<Article>> | null>;
