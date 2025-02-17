"use client";

import { RichTextBlock } from "@lib/interfaces/articles";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  content?: RichTextBlock;
}

export function RichTextRenderer({ content }: RichTextProps) {
  return (
    <div className="max-w-none">
      {content && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }: { href: string; children: ReactNode }) => {
              if (href?.includes("cloudinary.com") && href?.endsWith(".mp4")) {
                return (
                  <video slot="media" controls muted className="aspect-video">
                    <source src={href} type="video/mp4" />
                    Tu navegador no soporta videos.
                  </video>
                );
              }

              return <a href={href}>{children}</a>;
            },
          }}>
          {content.body}
        </ReactMarkdown>
      )}
    </div>
  );
}
