"use client";

import "yet-another-react-lightbox/styles.css";
import { cn, detectMimeType } from "@/lib/utils";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface BentoGridProps {
  children: React.ReactNode;
  slides: { type: "image" | "video"; src: string; poster?: string }[];
}

export function BentoGridMarkdown({ children, slides }: BentoGridProps) {
  const [index, setIndex] = useState(-1);
  const itemCount = React.Children.count(children);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4 my-8">
        {React.Children.map(children, (child, i) => {
          const isHero = i === 0;
          const isLast = i === itemCount - 1;
          const desktopRemainder = itemCount % 3;
          const isMobileOrphan = itemCount % 2 === 0;

          const spanClasses = cn(
            "col-span-1 row-span-1 md:col-span-1 md:row-span-1",

            isHero && "col-span-2 row-span-2 md:col-span-2 md:row-span-2",

            !isHero &&
              isLast && [
                isMobileOrphan && "col-span-2",
                desktopRemainder === 1 && "md:col-span-3",
                desktopRemainder === 2 && "md:col-span-2",
              ]
          );

          return (
            <div
              key={i}
              className={`
                relative overflow-hidden rounded-lg md:rounded-xl border border-zinc-800 bg-zinc-900 cursor-zoom-in group
                ${spanClasses}
                [&_img]:!w-full [&_img]:!h-full [&_img]:!object-cover [&_img]:!m-0 
                [&_video]:!w-full [&_video]:!h-full [&_video]:!object-cover [&_video]:!m-0
                [&>div]:!w-full [&>div]:!h-full [&>div]:!m-0
              `}
              onClick={() => setIndex(i)}>
              <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
                <div className="pointer-events-none w-full h-full">{child}</div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          );
        })}
      </div>

      <Lightbox
        className="lightbox-window"
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides.map((s) =>
          s.type === "video"
            ? {
                type: "video",
                width: 1280,
                height: 720,
                sources: [
                  {
                    src: s.src,
                    type: detectMimeType(s.src),
                  },
                ],
                poster: s.poster,
              }
            : { src: s.src }
        )}
        plugins={[Video, Zoom]}
      />
    </>
  );
}
