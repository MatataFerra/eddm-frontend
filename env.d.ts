import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  NEXT_PUBLIC_PAGE_LIMIT: z.string(),
  API_SECRET: z.string(),
  TOKEN_PASSWORD: z.string(),
  TOKEN_USER: z.string(),
});

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
