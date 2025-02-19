import { fetchDataCached, Fields, Params } from "@lib/fetch";
import type { Article } from "@lib/interfaces/articles";

type Config = {
  params?: {
    populate?: Params | "*";
  };
  fields?: Fields<Article>;
};
export async function getArticles<T>({ params, fields }: Config = {}): Promise<T> {
  const { data: articles } = await fetchDataCached<T>("/articles", {
    params: params,
    fields: fields,
  });
  return articles;
}

export async function getOneArticle(documentId: string) {
  const { data: article } = await fetchDataCached<Article>(`/articles/${documentId}`, {
    params: {
      populate: ["blocks", "header"],
    },
  });

  return article;
}
