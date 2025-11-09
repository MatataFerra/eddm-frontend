import type { ApiResponse } from "@lib/fetch/caller";
import type { Category } from "@lib/utils";

enum GradientDirection {
  TO_RIGHT = "TO_RIGHT",
  TO_LEFT = "TO_LEFT",
  TO_TOP = "TO_TOP",
  TO_BOTTOM = "TO_BOTTOM",
  TO_TOP_RIGHT = "TO_TOP_RIGHT",
  TO_TOP_LEFT = "TO_TOP_LEFT",
  TO_BOTTOM_RIGHT = "TO_BOTTOM_RIGHT",
  TO_BOTTOM_LEFT = "TO_BOTTOM_LEFT",
}

type Gradient = {
  id: number;
  name: string;
  direction: GradientDirection;
  from: string;
  via: string | null;
  to: string;
  textColor: string;
};

// Props comunes a ambos ítems
type BaseListItem = {
  columns: number;
  rows: number;
  show: boolean;
  position: number;
  className?: string;
  gradient?: Gradient;
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
