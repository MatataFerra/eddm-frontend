import { Suspense } from "react";
import type { SettingsListItemResponse } from "@/lib/interfaces/cards";
import { getSettings } from "@/lib/api_methods/get-settings";
import { Resolved } from "@/components/blocks/articles/grid-resolver";

export async function ArticlesHomeGrid() {
  const settings = getSettings<SettingsListItemResponse>();
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-3 h-auto  w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={"loading-article-" + index}
              className="animate-pulse bg-muted h-64 md:h-72 lg:h-80 mx-2 rounded-lg"
            />
          ))}
        </div>
      }>
      <Resolved settingsPromise={settings} />
    </Suspense>
  );
}
