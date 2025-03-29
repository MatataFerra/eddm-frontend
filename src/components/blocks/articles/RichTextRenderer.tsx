"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  content?: string;
}

export default function RichTextRenderer({ content }: RichTextProps) {
  return (
    <div className="max-w-none">
      {content && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: (props) => {
              if (props.href?.includes("cloudinary.com")) {
                if (props.href.endsWith(".mp4") || props.href.endsWith(".mov")) {
                  return (
                    <video slot="media" controls muted className="aspect-video">
                      <source
                        src={props.href}
                        type={`video/${props.href.endsWith(".mp4") ? "mp4" : "quicktime"}`}
                      />
                      Tu navegador no soporta videos.
                    </video>
                  );
                }
              }

              return <a href={props.href}>{props.children}</a>;
            },
          }}>
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
}
