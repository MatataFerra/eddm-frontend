"use client";

import dynamic from "next/dynamic";

const MarkdownTextRenderer = dynamic(
  () => import("@/components/blocks/articles/rich-text-renderer"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export function MarkdownRenderer({ content }: { content: string }) {
  return <MarkdownTextRenderer content={content} />;
}
