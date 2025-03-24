import { z } from "zod";
import { fullArticleSchema } from '../schemas';

export type Article = z.infer<typeof fullArticleSchema>