import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Category = {
  type: "category";
  name:
    | "context"
    | "enero"
    | "febrero"
    | "marzo"
    | "abril"
    | "mayo"
    | "junio"
    | "julio"
    | "agosto"
    | "septiembre"
    | "octubre"
    | "noviembre"
    | "diciembre";
};

type Phrase = {
  type: "phrase";
  text: string;
  className?: string;
};

export type MonthsOrdered = Category | Phrase;

export const monthsOrdered: MonthsOrdered[] = [
  { type: "category", name: "context" },
  { type: "category", name: "enero" },
  { type: "category", name: "febrero" },
  { type: "category", name: "marzo" },
  { type: "category", name: "abril" },
  { type: "category", name: "mayo" },
  { type: "category", name: "junio" },
  { type: "category", name: "julio" },
  { type: "category", name: "agosto" },
  { type: "category", name: "septiembre" },
  { type: "category", name: "octubre" },
  { type: "category", name: "noviembre" },
  { type: "category", name: "diciembre" },
];
