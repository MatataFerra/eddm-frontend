import { z } from "zod";
import { fullArticleSchema } from "../schemas";

export type Article = z.infer<typeof fullArticleSchema>;
export type ContentNavigate = Pick<
  Article,
  "id" | "order" | "slug" | "category" | "title" | "header"
>;
