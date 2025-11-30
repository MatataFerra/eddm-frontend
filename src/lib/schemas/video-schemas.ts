import { z } from "zod";

export const VideoFormatSchema = z.enum(["video/mp4", "video/webm", "video/ogg"]);
export type VideoFormat = z.infer<typeof VideoFormatSchema>;
