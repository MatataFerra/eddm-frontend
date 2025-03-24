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
  className?: string;
};

type Phrase = {
  type: "phrase";
  text: string;
  className?: string;
};

type Empty = {
  type: "empty";
};

type MonthsOrdered = Category | Phrase | Empty;

export const monthsOrdered: MonthsOrdered[] = [
  { type: "category", name: "context", className: "" },
  { type: "category", name: "enero" },
  { type: "category", name: "febrero" },
  { type: "category", name: "marzo" },
  { type: "category", name: "abril" },
  {
    type: "phrase",
    text: "Cada tanto irán los muelles a los barcos",
    className: "row-span-2 bg-sky-300 dark:bg-fuchsia-800",
  },
  { type: "category", name: "mayo" },
  { type: "category", name: "junio" },
  { type: "category", name: "julio" },
  {
    type: "phrase",
    text: "Cada tanto irán los muelles a los barcos contra el viento y verán que surge",
    className: "row-span-2 bg-lime-300 dark:bg-rose-800",
  },
  { type: "category", name: "agosto" },
  { type: "category", name: "septiembre" },
  { type: "category", name: "octubre" },
  { type: "category", name: "noviembre" },
  { type: "category", name: "diciembre" },
];
