import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex justify-end w-full md:max-w-2xl mx-auto">
      <ul>
        <Link href="/">
          <li className="flex items-center justify-between gap-2 border border-zinc-950 px-4 py-2 rounded-md bg-gradient-to-br from-zinc-900 to-zinc-800 hover:from-black hover:to-zinc-900 transition-colors duration-300 cursor-pointer group/nav">
            <ArrowLeft className="transform transition-transform duration-300 group-hover/nav:-translate-x-2 group-active/nav:-translate-x-2" />
            Home
          </li>
        </Link>
      </ul>
    </nav>
  );
}
