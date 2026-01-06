"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import type { Root, Node, Paragraph, Text, Image } from "mdast";
import type { Plugin } from "unified";
import NextImage from "next/image";
import { Video } from "@/components/ui/video";
import { generateSlug } from "@/lib/utils";

interface RichTextProps {
  content?: string;
}

const isAside = (node: Node): boolean =>
  node.type === "containerDirective" && "name" in node && node.name === "aside";

const isCarouselNode = (node: Node): boolean =>
  node.type === "containerDirective" && "name" in node && node.name === "carousel";

const isParagraphWithChildren = (node: Node): node is Paragraph =>
  node.type === "paragraph" && "children" in node;

const transformTextToImage = (node: Node): Node => {
  if (node.type === "text") {
    const value = (node as Text).value.trim();
    if (value.startsWith("http")) {
      return {
        type: "image",
        url: value,
        alt: "Imagen",
      } as Image;
    }
  }
  return node;
};

const transformChildNodes = (children: Node[]): Node[] =>
  children.flatMap((child) => {
    if (isParagraphWithChildren(child)) {
      return child.children.map(transformTextToImage);
    }

    if (child.type === "image") {
      return child as Image;
    }

    return [];
  });

const handleAside = (node: Node): void => {
  node.data = {
    hName: "div",
    hProperties: { className: "aside" },
  };
};

const handleCarousel = (node: Node): void => {
  node.data = {
    hName: "div",
    hProperties: { className: "carousel" },
  };

  if ("children" in node && Array.isArray(node.children)) {
    node.children = transformChildNodes(node.children);
  }
};

export const remarkCarousel: Plugin<void[], Root> = () => {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (isCarouselNode(node)) {
        handleCarousel(node);
      }

      if (isAside(node)) {
        handleAside(node);
      }
    });
  };
};

function isVideo(src: string): boolean {
  try {
    const urlObj = new URL(src, "https://dummy.com");
    const pathname = urlObj.pathname;

    const regex = /\.(mp4|webm|ogg|mov)$/i.test(pathname);
    return regex;
  } catch {
    return false;
  }
}

export default function RichTextRenderer({ content }: RichTextProps) {
  return (
    <div className="max-w-none">
      {content && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkDirective, remarkCarousel]}
          components={{
            div: ({ children, className }) => {
              if (className === "carousel") {
                return (
                  <Carousel>
                    <CarouselContent className="p-4">
                      {React.Children.toArray(children).map((child, index) => (
                        <CarouselItem
                          key={index}
                          className="flex justify-center basis-1/2 select-none *:select-none [&>p]:max-w-[100%] [&>div]:max-w-[100%] [&>p>img]:max-w-[100%] [&>div>video]:max-w-[100%] [&>div>video]:h-auto [&>p>img]:h-auto">
                          {React.isValidElement(child) ? (
                            isVideo((child as React.ReactElement<{ href: string }>).props.href) ? (
                              <Video
                                src={(child as React.ReactElement<{ href: string }>).props.href}
                                size="medium"
                              />
                            ) : (
                              <NextImage
                                src={(child as React.ReactElement<{ href: string }>).props.href}
                                alt="image from carousel"
                                width={500}
                                height={500}
                                className="object-cover max-w-[100%] h-full"
                              />
                            )
                          ) : (
                            <div className="flex justify-center items-center h-full">{child}</div>
                          )}
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-8" />
                    <CarouselNext className="-right-8" />
                  </Carousel>
                );
              }

              if (className === "aside") {
                return (
                  <aside className="bg-zinc-900 px-4 py-2 text-sm font-sans rounded-md">
                    {children}
                  </aside>
                );
              }
              return <p>{children}</p>;
            },
            a: ({ href, children }) => {
              if (href && isVideo(href)) {
                return <Video src={href} size="medium" />;
              }

              return <a href={href}>{children} </a>;
            },

            p: ({ children }) => {
              const childrenArray = React.Children.toArray(children);

              const hasContent = childrenArray.some((child) => {
                if (typeof child === "string") {
                  return child.trim().length > 0;
                }
                return React.isValidElement(child);
              });

              if (!hasContent) return null;

              const hasVideo = childrenArray.some((child) => {
                return (
                  React.isValidElement(child) &&
                  isVideo((child as React.ReactElement<{ href: string }>).props.href)
                );
              });

              return hasVideo ? <>{children}</> : <p>{children}</p>;
            },

            h3: ({ children }) => <h3 id={generateSlug(children?.toString() ?? "")}>{children}</h3>,
          }}>
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
}
