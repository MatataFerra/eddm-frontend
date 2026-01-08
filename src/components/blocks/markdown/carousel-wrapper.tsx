"use client";

import React from "react";
import { Video } from "@/components/ui/video";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function isVideo(src: string | undefined): boolean {
  if (!src) return false;
  const cleanSrc = src.split(/[?#]/)[0];
  return /\.(mp4|webm|ogg|mov)$/i.test(cleanSrc);
}

function getSource(props: { href?: string; src?: string }): string {
  return props.href || props.src || "";
}

export function CarouselWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="p-4">
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return (
              <CarouselItem key={index} className="flex justify-center basis-1/2">
                <div className="flex items-center h-full">{child}</div>
              </CarouselItem>
            );
          }

          // console.log({ child: child.props });

          const src = getSource(child.props as { href?: string; src?: string });
          const isVid = isVideo(src);

          return (
            <CarouselItem
              key={index}
              className="flex justify-center basis-1/2 select-none *:select-none [&>p]:max-w-[100%] [&>div]:max-w-[100%]">
              {isVid ? (
                <Video src={src} size="medium" />
              ) : (
                <Image
                  src={src}
                  alt="carousel item"
                  width={500}
                  height={500}
                  className="object-cover max-w-[100%] h-full rounded-md"
                />
              )}
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="-left-8" />
      <CarouselNext className="-right-8" />
    </Carousel>
  );
}
