import { clsx, type ClassValue } from "clsx";
import { Variants } from "motion/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Category = {
  type: "category";
  cover?: boolean;
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
  { type: "category", name: "context", cover: true },
  { type: "category", name: "enero" },
  { type: "category", name: "febrero", cover: true },
  { type: "category", name: "marzo" },
  { type: "category", name: "abril" },
  { type: "category", name: "mayo", cover: true },
  { type: "category", name: "junio" },
  { type: "category", name: "julio" },
  { type: "category", name: "agosto" },
  { type: "category", name: "septiembre" },
  { type: "category", name: "octubre" },
  { type: "category", name: "noviembre" },
  { type: "category", name: "diciembre" },
];

export const MOTION_COVER_IMAGE: Record<string, Variants> = {
  cover_image: {
    initial_image: {
      opacity: 0.3,
      scale: 1.25,
      filter: "blur(2px)",
    },
    hover_image: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },
};

export const MOTION_ANIMATIONS: Record<"cover_image" | "slideToCorner", Variants> = {
  cover_image: MOTION_COVER_IMAGE.cover_image,
  // 1. Animación original (centro a esquina)
  slideToCorner: {
    rest: {
      top: "50%",
      left: "50%",
      x: "-50%",
      y: "-50%",
      fontSize: "2rem",
      color: "#ffffff",
      backgroundColor: "hsla(240, 14%, 15%, 0)",
      borderRadius: "0",
      padding: "0",
      boxShadow: "none",
    },
    hover: {
      top: 0,
      left: 0,
      x: "5%",
      y: "10%",
      fontSize: "1.5rem",
      color: "hsla(40, 60%, 95%, 1)",
      transition: {
        type: "spring",
        bounce: 0.6,
        duration: 0.4,
        damping: 15,
      },
    },
    finalStyle: {
      backgroundColor: "hsla(240, 15%, 15%, .3)",
      borderRadius: "10px",
      padding: ".5rem",
      transition: { delay: 0.2, duration: 0.3 },
    },
  },
};
