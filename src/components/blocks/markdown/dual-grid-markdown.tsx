"use client";

import "yet-another-react-lightbox/styles.css";
import { detectMimeType } from "@/lib/utils";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface DualGridProps {
  children: React.ReactNode;
  slides: { type: "image" | "video"; src: string; poster?: string }[];
}

export function DualGridMarkdown({ children, slides }: DualGridProps) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      {/* Grid de 2 columnas simple */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {React.Children.map(children, (child, i) => (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIndex(i); }}
            className={`
              relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 cursor-zoom-in group
              h-64 md:h-96 w-full
              [&_img]:w-full! [&_img]:h-full! [&_img]:object-cover! [&_img]:m-0! 
              [&_video]:w-full! [&_video]:h-full! [&_video]:object-cover! [&_video]:m-0! 
              [&>div]:w-full! [&>div]:h-full! [&>div]:m-0!
            `}
            onClick={() => setIndex(i)}>
            <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
              <div className="pointer-events-none w-full h-full">{child}</div>
            </div>

            {/* Overlay sutil al hacer hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}
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
            : { src: s.src },
        )}
        plugins={[Video, Zoom]}
      />
    </>
  );
}
