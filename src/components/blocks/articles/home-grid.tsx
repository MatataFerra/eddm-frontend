import { Suspense } from "react";
import type { SettingsListItemResponse } from "@/lib/interfaces/cards";
import { getSettings } from "@/lib/api_methods/get-settings";
import { Resolved } from "@/components/blocks/articles/grid-resolver";

export async function ArticlesHomeGrid() {
  const settings = getSettings<SettingsListItemResponse>();
  return (
    <Suspense
      fallback={
        <div className="flex justify-center h-auto items-center w-full">
          <p className="text-2xl font-semibold text-white">Cargando portadas…</p>
        </div>
      }>
      <Resolved settingsPromise={settings} />
    </Suspense>
  );
}
