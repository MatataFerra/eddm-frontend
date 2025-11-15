import type { Article } from "@/lib/interfaces/articles";
import type { ApiResponse } from "@/lib/fetch/caller";
import { ContentBySlug } from "@/lib/interfaces/share";

export type Tale = Article;

export type TalePromise = Promise<ApiResponse<ContentBySlug<Tale>> | null>;
