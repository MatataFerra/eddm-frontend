import { fetchDataCached } from "@lib/fetch";
import type { Article } from "@lib/interfaces/articles";

export async function getArticles() {
  const { data: articles } = await fetchDataCached<Article[]>("/articles", {
    params: {
      populate: "cover",
    },
  });

  return articles;
}

export async function getOneArticle(slug: string) {
  const { data: article } = await fetchDataCached<Article>(`/articles/${slug}`, {
    params: {
      populate: ["header", "blocks"],
    },
  });

  return article;
}
