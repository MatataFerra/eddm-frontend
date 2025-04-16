import { ArticlesHomeGrid } from "@/components/blocks/articles/articles-home-grid";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <nav className="flex justify-center">
        <ul>
          <Link href="/">
            <li className="border border-zinc-950 px-4 py-2 rounded-md bg-gradient-to-br from-zinc-900 to-zinc-800 hover:from-black hover:to-zinc-900 transition-colors duration-300 cursor-pointer">
              Home
            </li>
          </Link>
        </ul>
      </nav>
      <h1 className="text-5xl my-8 lg:text-7xl font-bold text-center text-white z-2 font-sans ">
        Un año viajando
      </h1>

      <ArticlesHomeGrid />
    </>
  );
}
