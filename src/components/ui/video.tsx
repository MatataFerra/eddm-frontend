import { cn } from "@/lib/utils";
import { z } from "zod";

const VideoFormatSchema = z.enum(["video/mp4", "video/webm", "video/ogg"]);
const SizeSchema = z.enum(["small", "medium", "large"]);

export type VideoFormat = z.infer<typeof VideoFormatSchema>;
export type Size = z.infer<typeof SizeSchema>;

const getValidFormat = (format: string): VideoFormat => {
  const result = VideoFormatSchema.safeParse(format);
  return result.success ? result.data : "video/mp4";
};

const VIDEO_SIZE = {
  small: {
    width: 320,
    height: 240,
  },
  medium: {
    width: 640,
    height: 360,
  },
  large: {
    width: 1280,
    height: 720,
  },
} as const;

type VideoProps = {
  src: string;
  type: VideoFormat;
  size: Size;
  className?: string;
  captionPath?: string;
  srcLang?: "en" | "es" | "fr" | "de" | "it" | "pt" | "zh" | "ja" | "ko";
  label?: string;
  kind?: "subtitles" | "captions";
};

const getCloudinaryCoverUrl = (videoUrl: string, time: number = 1) => {
  return videoUrl.replace(".mp4", `.jpg`).replace("/upload/", `/upload/so_${time}/f_jpg/`);
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
  const validFormat = getValidFormat(type);

  return (
    <video
      className={cn(
        "aspect-video max-w-[100%] h-full rounded-2xl border-accent-foreground shadow-accent-foreground",
        className
      )}
      width={VIDEO_SIZE[size].width}
      height={VIDEO_SIZE[size].height}
      poster={getCloudinaryCoverUrl(src, 7)}
      muted
      controls
      preload="none">
      <source src={src} type={validFormat} />
      <track src={captionPath} kind={kind} srcLang={srcLang} label={label} />
      Your browser does not support the video tag.
    </video>
  );
}
