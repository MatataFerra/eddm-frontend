"use client";

import { ENDPOINTS } from "@/lib/constants";
import type { ContentNavigate } from "@/lib/interfaces/articles";
import { CalendarDays } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

// Tu paleta
const ACCENTS = [
  { name: "teal", color: "#00B8A9" },
  { name: "cream", color: "#E6E0B0" },
  { name: "red", color: "#F6416C" },
  { name: "yellow", color: "#FFC107" },
];

function hasImage(index: number) {
  return index % 3 !== 0;
}

function getPadding(index: number) {
  if (index % 5 === 0) return "p-10";
  if (index % 2 === 0) return "p-8";
  return "p-6";
}

export function PremiumMasonry({ articles }: { articles: ContentNavigate[] }) {
  return (
    <div className="columns-1 gap-6 space-y-6 px-2 md:columns-2 lg:columns-3 xl:gap-8">
      {articles.map((article, index) => (
        <MasonryItem key={article.slug + index} article={article} index={index} />
      ))}
    </div>
  );
}

function MasonryItem({ article, index }: { article: ContentNavigate; index: number }) {
  const { push } = useRouter();
  const theme = useMemo(() => ACCENTS[index % ACCENTS.length], [index]);

  const showImage = hasImage(index);
  const padding = getPadding(index);

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="break-inside-avoid">
      <div
        onClick={() => push(ENDPOINTS.FURTHER_TIME_ARTICLE(article.slug))}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-[#0f1115] ${padding} transition-all duration-700`}>
        {/* noise */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/noise.svg')] opacity-[0.035]" />

        {/* hover glow (fantasma) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 rounded-2xl"
          style={{
            boxShadow: `inset 0 0 0 1px ${theme.color}70, 0 30px 80px ${theme.color}60`,
          }}
        />

        {/* IMAGE (opcional) */}
        {showImage && article.header?.url && (
          <div className="relative mb-6 rounded-xl">
            <Image
              src={article.header.url}
              alt={article.title}
              width={800}
              height={600}
              className="w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-99"
            />
            {/* <div className="absolute inset-0 bg-black/30" /> */}
          </div>
        )}

        {/* category / section */}
        <div className="mb-2 text-[11px] uppercase tracking-widest text-white/40">
          Más acá en el tiempo
        </div>

        {/* title */}
        <h3 className="mb-4 text-xl font-medium leading-tight text-white/90">{article.title}</h3>

        {/* geolocation */}
        {/* {article.geolocations?.[0]?.geolocation?.location && (
          <div className="mb-4 text-xs italic text-white/30">
            — {article.geolocations[0].geolocation.location}
          </div>
        )} */}

        {/* meta */}
        <div className="flex items-center gap-2 text-xs text-white/40">
          <CalendarDays className="h-3 w-3" />
          <span>Oct 24, 2024</span>
        </div>

        {/* hover hint */}
        <div
          className="absolute bottom-4 right-6 text-xs opacity-0 transition-opacity duration-500 group-hover:opacity-60"
          style={{ color: theme.color }}>
          Leer →
        </div>
      </div>
    </motion.article>
  );
}
