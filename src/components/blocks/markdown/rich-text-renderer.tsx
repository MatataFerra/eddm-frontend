import React, { type ReactNode, isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";

import NextImage from "next/image";

import { Video } from "@/components/ui/video";
import { CarouselWrapper } from "@/components/blocks/markdown/carousel-wrapper";
import { generateSlug } from "@/lib/utils";
import { remarkCarousel } from "@/lib/mkd-plugins/carousel-plugn";
import { remarkAutoBento } from "@/lib/mkd-plugins/bento-plugin";
import { BentoGridMarkdown } from "@/components/blocks/markdown/bento-grid-markdown";
import { DualGridMarkdown } from "@/components/blocks/markdown/dual-grid-markdown";

function isVideoUrl(url: string | undefined): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)($|\?)/i.test(url);
}

interface MediaProps {
  src?: string;
  href?: string;
}

type MediaData = { type: "image" | "video"; src: string } | null;

function getMediaData(element: ReactNode): MediaData {
  if (!isValidElement(element)) {
    return null;
  }

  const props = element.props as MediaProps;

  if (props.href && isVideoUrl(props.href)) {
    return { type: "video", src: props.href };
  }

  if (props.src) {
    if (isVideoUrl(props.src)) {
      return { type: "video", src: props.src };
    }
    return { type: "image", src: props.src };
  }

  if (element.type === Video && props.src) {
    return { type: "video", src: props.src };
  }

  return null;
}

export function RichTextRenderer({ content }: { content?: string }) {
  if (!content) return null;

  return (
    <div className="max-w-none text-lg leading-16 tracking-wide">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, remarkCarousel, remarkAutoBento]}
        components={{
          div: ({ className, children }) => {
            if (className === "bento-grid") {
              const slides =
                React.Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    return getMediaData(child);
                  }
                  return null;
                })?.filter(
                  (slide): slide is { type: "image" | "video"; src: string } => slide !== null,
                ) || [];

              return <BentoGridMarkdown slides={slides}>{children}</BentoGridMarkdown>;
            }

            if (className === "dual-grid") {
              const slides =
                React.Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    return getMediaData(child);
                  }
                  return null;
                })?.filter(
                  (slide): slide is { type: "image" | "video"; src: string } => slide !== null,
                ) || [];

              return <DualGridMarkdown slides={slides}>{children}</DualGridMarkdown>;
            }

            if (className === "carousel") {
              return <CarouselWrapper>{children}</CarouselWrapper>;
            }
            return <div className={className}>{children}</div>;
          },

          aside: ({ className, children }) => {
            if (className === "aside-block") {
              return (
                <aside className="bg-zinc-900 px-4 py-2 text-sm font-sans rounded-md my-4 border-l-4 border-primary">
                  {children}
                </aside>
              );
            }
            return <aside>{children}</aside>;
          },

          a: ({ href, children }) => {
            if (href && isVideoUrl(href)) {
              return (
                <Video src={href} size="medium" className="border border-zinc-900 rounded-md" />
              );
            }
            return (
              <a
                href={href}
                className="text-primary underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer">
                {children}
              </a>
            );
          },

          p: ({ children }) => {
            const childrenArray = React.Children.toArray(children);
            const hasBlock = childrenArray.some(
              (child) =>
                React.isValidElement(child) &&
                (child.type === Video || child.type === NextImage || child.type === "div"),
            );

            if (hasBlock) return <>{children}</>;
            return <p className="mb-4 leading-7">{children}</p>;
          },

          img: ({ src, alt }) => {
            const srcString = typeof src === "string" ? src : undefined;
            if (isVideoUrl(srcString)) return <Video src={srcString!} size="medium" />;

            return (
              <NextImage
                src={srcString || ""}
                alt={alt || "image"}
                width={800}
                height={450}
                className="rounded-md my-4 w-full h-auto object-cover border border-zinc-900"
              />
            );
          },

          h3: ({ children }) => (
            <h3
              id={generateSlug(children?.toString() ?? "")}
              className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6">
              {children}
            </h3>
          ),
        }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
