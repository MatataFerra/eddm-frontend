import { PropsWithChildren, use } from "react";
import type { TalePromise } from "@/lib/interfaces/tales";

type TaleBodyProps = PropsWithChildren<{
  talePromise: TalePromise;
}>;

export function TaleSummary({ talePromise }: TaleBodyProps) {
  const taleData = use(talePromise);
  const tale = taleData?.data.tale;

  if (!tale?.summary) return null;

  return <blockquote>{tale.summary}</blockquote>;
}
