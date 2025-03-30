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

interface RichTextProps {
  content?: string;
}

const remarkCarousel: Plugin<void[], Root> = () => {
  return (tree: Root) => {
    visit(tree, (node: Node) => {
      if (node.type === "containerDirective" && "name" in node && node.name === "carousel") {
        node.data = {
          hName: "div",
          hProperties: { className: "carousel" },
        };

        if ("children" in node && Array.isArray(node.children)) {
          node.children = node.children.flatMap((child: Node) => {
            if (child.type === "paragraph" && "children" in child) {
              const paragraph = child as Paragraph;
              return paragraph.children.flatMap((subChild: Node) => {
                if (subChild.type === "text") {
                  const textNode = subChild as Text;
                  if (textNode.value.trim().startsWith("http")) {
                    return {
                      type: "image",
                      url: textNode.value.trim(),
                      alt: "Imagen",
                    } as Image;
                  }
                }
                return subChild;
              });
            }

            if (child.type === "image") {
              return child as Image;
            }

            return [];
          });
        }
      }
    });
  };
};

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
                          className="flex justify-center basis-1/2 select-none *:select-none [&>p]:max-w-[100%] [&>p>img]:max-w-[100%] [&>p>img]:h-auto">
                          {React.isValidElement(child) ? (
                            <NextImage
                              src={(child as React.ReactElement<{ href: string }>).props.href}
                              alt={"image from carousel"}
                              width={500}
                              height={500}
                              className="object-cover max-w-[100%] h-auto"
                            />
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
              return <div>{children}</div>;
            },
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
