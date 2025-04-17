import { ArticlesHomeGrid } from "@/components/blocks/articles/articles-home-grid";
import { Nav } from "@/components/blocks/share/nav";

export default async function Page() {
  return (
    <>
      <Nav />
      <h1 className="text-5xl my-8 lg:text-7xl font-bold text-center text-white z-2 font-sans ">
        Un año viajando
      </h1>

      <ArticlesHomeGrid />
    </>
  );
}
