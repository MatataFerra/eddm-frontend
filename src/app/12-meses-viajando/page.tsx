import type { Metadata } from "next";
import { ArticlesGridView } from "@/components/blocks/articles/grid-client";
import { Nav } from "@/components/blocks/share/nav";
import { ShareTitle } from "@/components/blocks/share/title";

export const metadata: Metadata = {
  title: "Un año viajando | El diario de Mati",
  description: "Artículos y relatos de un año entero recorriendo el mundo.",
};

export default async function Page() {
  return (
    <>
      <Nav />
      <ShareTitle title="Un año viajando" className="text-7xl lg:text-9xl mt-2 mb-8" />

      <ArticlesGridView />
    </>
  );
}
