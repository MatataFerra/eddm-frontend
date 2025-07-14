import { z } from "zod";
import { fullArticleSchema } from "../schemas";

export type Article = z.infer<typeof fullArticleSchema>;
export type IndexContent = Pick<Article, "id" | "title" | "slug" | "category">;
