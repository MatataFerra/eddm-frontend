import type { Metadata } from "next";
import { BentoView } from "@/components/blocks/home/bento/bento-view";

export const metadata: Metadata = {
  title: "El diario de Mati",
  description: "Un blog dedicado a retratar mi viaje por este universo que soy yo mismo.",
};

export default async function Page() {
  return <BentoView />;
}
