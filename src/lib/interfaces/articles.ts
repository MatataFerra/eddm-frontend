import { z } from "zod";
import { ExtendedArticleSchema } from "@/lib/schemas";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { ContentBySlug } from "@/lib/interfaces/share";

export type Article = z.infer<typeof ExtendedArticleSchema>;
type PartialContentNavigateFields = Pick<Article, "createdAt">;
export type PickedContentNavigate = Pick<
  Article,
  "id" | "order" | "slug" | "category" | "title" | "header"
>;

export type ContentNavigate = PickedContentNavigate & PartialContentNavigateFields;

export type ArticlePromise = Promise<ApiResponse<ContentBySlug<Article>> | null>;
