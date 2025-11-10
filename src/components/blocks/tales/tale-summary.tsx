import type { Tale } from "@/lib/interfaces/articles";
import { PropsWithChildren, use } from "react";
import type { ApiResponse } from "@/lib/fetch/caller";

type TaleBodyProps = PropsWithChildren<{
  talePromise: Promise<ApiResponse<Tale> | null>;
}>;

export function TaleSummary({ talePromise }: TaleBodyProps) {
  const taleData = use(talePromise);
  const tale = taleData?.data;

  if (!tale?.summary) return null;

  return <blockquote>{tale.summary}</blockquote>;
}
