export type GradientName =
  | "hyper"
  | "oceanic"
  | "cottonCandy"
  | "gotham"
  | "sunset"
  | "mojave"
  | "beachside"
  | "gunmetal"
  | "peachy"
  | "seafoam"
  | "pumpkin"
  | "pandora"
  | "valentine"
  | "hawaii"
  | "lavender"
  | "wintergreen"
  | "huckleberry"
  | "bluesteel"
  | "arendelle"
  | "spearmint"
  | "minnesota"
  | "ice"
  | "space";

export type GradientConfig = {
  bg: string;
  text: "text-black" | "text-white";
};

export const GRADIENTS: Record<GradientName, GradientConfig> = {
  hyper: {
    bg: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    text: "text-white",
  },
  oceanic: {
    bg: "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
    text: "text-white",
  },
  cottonCandy: {
    bg: "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400",
    text: "text-black",
  },
  gotham: {
    bg: "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
    text: "text-white",
  },
  sunset: {
    bg: "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
    text: "text-black",
  },
  mojave: {
    bg: "bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500",
    text: "text-black",
  },
  beachside: {
    bg: "bg-gradient-to-r from-yellow-200 via-green-200 to-green-500",
    text: "text-black",
  },
  gunmetal: {
    bg: "bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600",
    text: "text-black",
  },
  peachy: {
    bg: "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200",
    text: "text-black",
  },
  seafoam: {
    bg: "bg-gradient-to-r from-green-200 via-green-300 to-blue-500",
    text: "text-black",
  },
  pumpkin: {
    bg: "bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700",
    text: "text-black",
  },
  pandora: {
    bg: "bg-gradient-to-r from-green-200 via-green-400 to-purple-700",
    text: "text-white",
  },
  valentine: {
    bg: "bg-gradient-to-r from-red-200 to-red-600",
    text: "text-white",
  },
  hawaii: {
    bg: "bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300",
    text: "text-black",
  },
  lavender: {
    bg: "bg-gradient-to-r from-indigo-300 to-purple-400",
    text: "text-white",
  },
  wintergreen: {
    bg: "bg-gradient-to-r from-green-200 to-green-500",
    text: "text-black",
  },
  huckleberry: {
    bg: "bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800",
    text: "text-white",
  },
  bluesteel: {
    bg: "bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800",
    text: "text-white",
  },
  arendelle: {
    bg: "bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500",
    text: "text-black",
  },
  spearmint: {
    bg: "bg-gradient-to-r from-green-200 via-green-400 to-green-500",
    text: "text-black",
  },
  minnesota: {
    bg: "bg-gradient-to-r from-purple-400 to-yellow-400",
    text: "text-white",
  },
  ice: {
    bg: "bg-gradient-to-r from-rose-100 to-teal-100",
    text: "text-black",
  },
  space: {
    bg: "bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r",
    text: "text-white",
  },
};
