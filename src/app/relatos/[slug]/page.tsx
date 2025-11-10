import { TaleRender } from "@/components/blocks/tales/tale-render";
import { notFound } from "next/navigation";

import { getOneTale, getTales } from "@/lib/api_methods/get-tales";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { Tale } from "@/lib/interfaces/articles";
import { getTaleContentFromNotion } from "@/lib/api_methods/get-notion";
import { FALLBACK_SLUG } from "@/lib/constants";

export async function generateStaticParams() {
  const popular = await getTales<ApiResponse<Tale[]>>();
  if (!popular?.data) return [{ slug: FALLBACK_SLUG }];
  return popular.data.map((a) => ({ slug: a.slug }));
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
  const pageParams = await params;
  const { slug } = pageParams;
  const talePromise = getOneTale<ApiResponse<Tale>>(slug);
  const contentPromise = getTaleContentFromNotion<ApiResponse<string>>({
    query: slug,
    strategy: "slug",
  });

  if (slug === FALLBACK_SLUG) {
    notFound();
  }

  return <TaleRender tale={talePromise} content={contentPromise} />;
}
