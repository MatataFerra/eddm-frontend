import { ApiResponse } from "@lib/fetch";
import type { Category } from "@lib/utils";
import type { GradientName } from "@/lib/gradients";

// Props comunes a ambos ítems
type BaseListItem = {
  columns: number;
  rows: number;
  show: boolean;
  position: number;
  className?: string;
  gradient?: GradientName;
};

// Ítem cuando la card es CATEGORY
export type CategoryListItem = BaseListItem & {
  type: "category";
  name: Category["name"];
  cover?: boolean; // c.cover || undefined
  url: string | null; // c.url (puede venir null)
};

// Ítem cuando la card es PHRASE
export type PhraseListItem = BaseListItem & {
  type: "phrase";
  text: string; // c.text ?? ""
};

// Unión discriminada
export type SettingsListItem = CategoryListItem | PhraseListItem;

export type SettingsListItemResponse = ApiResponse<SettingsListItem[]>;
