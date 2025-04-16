"use client";

import type { Article } from "@/lib/interfaces/articles";
import { useRouter } from "next/navigation";

type ListItemProps = {
  tale: Article;
};

export function ListItem({ tale: { slug, title, header } }: ListItemProps) {
  const router = useRouter();
  return (
    <li
      onClick={() => router.push(`/relatos/${slug}`)}
      className="relative w-full min-h-40 font-bebas text-5xl rounded-lg p-4 cursor-pointer text-black dark:text-black transform transition-all duration-300 hover:shadow-md hover:shadow-sky-400 hover:-translate-y-2 hover:translate-x-0.5 overflow-hidden group">
      <div
        style={{
          backgroundImage: `url('${header?.url}')`,
        }}
        className="absolute inset-0 bg-cover bg-no-repeat bg-right opacity-50 group-hover:opacity-90 transition-opacity duration-300 z-40 -mask-linear-50 mask-linear-from-40% mask-linear-to-80%"></div>

      {/* Capa intermedia - Degradado */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200 from-40% to-fuchsia-300 opacity-80 dark:opacity-90 z-30"></div>
      <div className="relative z-50 h-full flex items-center">{title}</div>
    </li>
  );
}
