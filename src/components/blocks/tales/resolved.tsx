import { ListTales } from "@/components/blocks/tales/list";
import type { ApiResponse } from "@/lib/fetch/caller";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { getContentNavigateTales } from "@/lib/api_methods/get-tales";

export function ResolvedTale() {
  const talesPromise = getContentNavigateTales<ApiResponse<ContentNavigate[]>>();
  return <ListTales talesPromise={talesPromise} />;
}
