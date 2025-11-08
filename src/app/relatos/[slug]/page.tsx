"use cache";

import { TaleRender } from "@/components/blocks/tales/tale-render";
import { notFound } from "next/navigation";

import { getOneTale, getTales } from "@/lib/api_methods/get-tales";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { Tale } from "@/lib/interfaces/articles";
import { getTaleContentFromNotion } from "@/lib/api_methods/get-notion";
import { FALLBACK_SLUG } from "@/lib/constants";

export async function generateStaticParams() {
  const popular = await getTales<ApiResponse<Tale[]>>();

  if (!popular || !popular.data) {
    return [{ slug: FALLBACK_SLUG }];
  }

  return popular.data.map((a: { slug: string }) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const response = await getOneTale<ApiResponse<Tale>>(slug);
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
  const tale = await getOneTale<ApiResponse<Tale>>(slug);
  const content = await getTaleContentFromNotion<ApiResponse<string>>(tale?.data.notionPageId);

  if (!tale) notFound();

  if (content?.metadata?.message) {
    const msg = content.metadata.message;
    // eslint-disable-next-line no-console
    console.log(`\x1b[90m[Notion]\x1b[0m \x1b[36m${msg}\x1b[0m`);
  }

  if (slug === FALLBACK_SLUG) {
    notFound();
  }

  return <TaleRender tale={tale.data} content={content?.data} />;
}
