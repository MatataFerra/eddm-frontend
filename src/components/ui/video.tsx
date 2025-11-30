"use client";

import { VIDEO_SIZE } from "@/lib/constants";
import type { Size, Lang, CaptionsKind } from "@/lib/interfaces/video";
import { type VideoFormat } from "@/lib/schemas/video-schemas";
import { cn, getCloudinaryCoverUrl, getValidFormat } from "@/lib/utils";
import { useState } from "react";

type VideoProps = {
  src: string;
  type: VideoFormat;
  size: Size;
  className?: string;
  captionPath?: string;
  srcLang?: Lang;
  label?: string;
  kind?: CaptionsKind;
};

export function Video({
  src,
  className,
  type = "video/mp4",
  captionPath,
  size = "small",
  srcLang = "en",
  label = "English",
  kind = "captions",
}: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const validFormat = getValidFormat(type);

  return (
    <video
      className={cn(
        "aspect-video max-w-[100%] h-full rounded-2xl border-accent-foreground shadow-accent-foreground",
        "transition-all duration-300",
        isPlaying ? "object-contain" : "object-cover",
        className
      )}
      width={VIDEO_SIZE[size].width}
      height={VIDEO_SIZE[size].height}
      poster={getCloudinaryCoverUrl(src, 7)}
      muted
      controls
      preload="none"
      onPlay={() => setIsPlaying(true)}
      onEnded={() => setIsPlaying(false)}>
      <source src={src} type={validFormat} />
      <track src={captionPath} kind={kind} srcLang={srcLang} label={label} />
      Your browser does not support the video tag.
    </video>
  );
}
