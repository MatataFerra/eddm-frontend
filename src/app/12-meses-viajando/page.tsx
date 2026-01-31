import { ArticlesHomeGrid } from "@/components/blocks/articles/home-grid";
import { Nav } from "@/components/blocks/share/nav";
import { ShareTitle } from "@/components/blocks/share/title";

export default async function Page() {
  return (
    <>
      <Nav />
      <ShareTitle title="Un año viajando" className="text-7xl lg:text-9xl mt-2 mb-8" />

      <ArticlesHomeGrid />
    </>
  );
}
