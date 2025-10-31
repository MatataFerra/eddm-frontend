"use client";

import type { ContentNavigate } from "@/lib/interfaces/articles";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ListItemProps = {
  tale: ContentNavigate;
};

export function ListItem({ tale: { slug, title, header } }: ListItemProps) {
  const router = useRouter();
  return (
    <li
      onClick={() => router.push(`/relatos/${slug}`)}
      className={cn(
        "relative w-full min-h-60 font-poppins font-semibold text-2xl rounded-lg p-4 cursor-pointer transform transition-all duration-300 hover:shadow-md hover:shadow-slate-900 hover:-translate-y-1 hover:translate-x-0.5 overflow-hidden group"
      )}>
      <div
        style={{
          backgroundImage: `url('${header?.url}')`,
        }}
        className="absolute inset-0 bg-cover bg-no-repeat bg-right opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-40 -mask-linear-50 mask-linear-from-40% mask-linear-to-80%"></div>

      {/* Capa intermedia - Degradado */}
      <div
        className={cn(
          "absolute inset-0 opacity-30 dark:opacity-40 z-30",
          "bg-gradient-to-br from-gray-900 to-gray-600"
        )}></div>
      <div className="relative z-50 h-fit flex items-center rounded-md bg-gradient-to-r from-slate-500 to-yellow-100 text-black w-fit px-2 py-1.5 backdrop-blur-sm">
        {title}
      </div>
    </li>
  );
}
