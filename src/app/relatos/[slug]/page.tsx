import { TaleRender } from "@/components/blocks/tales/tale-render";
import { notFound } from "next/navigation";

import { getOneTale, getTales } from "@/lib/api_methods/get-tales";
import { ApiResponse } from "@/lib/fetch";
import type { Tale } from "@/lib/interfaces/articles";
import { getTaleContentFromNotion } from "@/lib/api_methods/get-notion";

export const revalidate = 60;

export async function generateStaticParams() {
  const popular = await getTales<ApiResponse<Tale[]>>();

  if (!popular || !popular.data) {
    return [];
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

  if (!tale) return notFound();

  return <TaleRender tale={tale.data} content={content?.data} />;
}
