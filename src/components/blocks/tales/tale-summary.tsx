import type { Tale } from "@/lib/interfaces/articles";
import { PropsWithChildren, use } from "react";
import type { ApiResponse } from "@/lib/fetch/caller";

type TaleBodyProps = PropsWithChildren<{
  talePromise: Promise<ApiResponse<Tale>>;
}>;

export function TaleSummary({ talePromise }: TaleBodyProps) {
  const taleData = use(talePromise);
  const { data: tale } = taleData;

  if (!tale?.summary) return null;

  return <blockquote>{tale.summary}</blockquote>;
}
