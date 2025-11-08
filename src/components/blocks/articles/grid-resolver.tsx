"use client";
import GridClient from "@/components/blocks/articles/grid-client";
import { SettingsListItemResponse } from "@/lib/interfaces/cards";
import { use } from "react";

export function Resolved({
  settingsPromise,
}: {
  settingsPromise: Promise<SettingsListItemResponse | null>;
}) {
  const settings = use(settingsPromise);
  return <GridClient settings={settings} />;
}
