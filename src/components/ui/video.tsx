"use client";

import { VIDEO_SIZE } from "@/lib/constants";
import type { Size, Lang, CaptionsKind } from "@/lib/interfaces/video";
import { cn, getCloudinaryCoverUrl, detectMimeType, isCloudinarySource } from "@/lib/utils";
import { type SyntheticEvent, useRef, useState } from "react";

type VideoProps = {
  src: string;
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
  captionPath,
  size = "small",
  srcLang = "en",
  label = "English",
  kind = "captions",
}: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const validFormat = detectMimeType(src);
  const videoRef = useRef<HTMLVideoElement>(null);

  const computedPoster = getCloudinaryCoverUrl(src, 7);
  const isNotionOrAWS = !isCloudinarySource(src);

  const handleLoadedMetadata = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    if (isNotionOrAWS && video.duration > 1) {
      video.currentTime = 1;
    }
  };

  return (
    <video
      ref={videoRef}
      className={cn(
        "aspect-video w-full h-auto",
        "transition-all duration-300",
        isPlaying ? "object-contain" : "object-cover",
        className
      )}
      width={VIDEO_SIZE[size].width}
      height={VIDEO_SIZE[size].height}
      poster={computedPoster}
      controls
      muted
      preload="metadata"
      onLoadedMetadata={handleLoadedMetadata}
      onPlay={() => setIsPlaying(true)}
      onEnded={() => setIsPlaying(false)}>
      <source src={src} type={validFormat} />
      <track src={captionPath} kind={kind} srcLang={srcLang} label={label} />
      Your browser does not support the video tag.
    </video>
  );
}
