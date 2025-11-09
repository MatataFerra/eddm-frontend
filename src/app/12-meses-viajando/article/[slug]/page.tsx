"use cache";

import { ArticleRender } from "@/components/blocks/articles/article-render";
import { getArticles, getOneArticle } from "@/lib/api_methods/get-articles";
import { FALLBACK_SLUG } from "@/lib/constants";
import type { ApiResponse } from "@/lib/fetch/caller";
import { Article } from "@/lib/interfaces/articles";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const popular = await getArticles<ApiResponse<Article[]>>();

  if (!popular || !popular.data) {
    return [{ slug: FALLBACK_SLUG }];
  }

  return popular.data.map((a: { slug: string }) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const response = await getOneArticle<ApiResponse<Article>>(slug);
  const tale = response?.data;
  if (!tale) return { title: "Relato no encontrado" };
  return {
    title: tale.title,
    openGraph: {
      title: tale.title,
      description: tale.summary ?? "",
      images: tale.cover?.url ? [tale.cover.url] : [],
    },
  };
}

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const article = await getOneArticle<ApiResponse<Article>>(slug);

  if (!article || slug === FALLBACK_SLUG) notFound();

  return <ArticleRender article={article.data} />;
}
