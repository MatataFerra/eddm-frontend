import { TaleRender } from "@/components/blocks/tales/tale-render";
import { notFound } from "next/navigation";

import { getOneTale, getTales } from "@/lib/api_methods/get-tales";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { Tale } from "@/lib/interfaces/articles";
import { getTaleContentFromNotion } from "@/lib/api_methods/get-notion";
import { FALLBACK_SLUG } from "@/lib/constants";
import { use } from "react";

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

export default function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const talePromise = getOneTale<ApiResponse<Tale>>(slug).then((tale) => {
    if (!tale) {
      notFound();
    }
    return tale;
  });

  const contentPromise = (async () => {
    const tale = await talePromise;
    const pageId = tale?.data?.notionPageId;
    const content = await getTaleContentFromNotion<ApiResponse<string>>(pageId);

    return content;
  })();

  if (slug === FALLBACK_SLUG) {
    notFound();
  }

  return <TaleRender tale={talePromise} content={contentPromise} />;
}
