"use client";

import { useTOC } from "@/lib/providers/toc-entry-provider";
import { cn, generateSlug } from "@/lib/utils";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";

const menuVariants = {
  closed: { opacity: 0, scale: 0.9, y: 20, pointerEvents: "none" as const },
  open: { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" as const },
};

export function FloatingEntryContentList() {
  const { items, activeId, setIsTocOpen, isTocOpen } = useTOC();

  return (
    <AnimatePresence>
      {isTocOpen && items.length > 0 && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsTocOpen(false)}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]"
          />

          <m.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed bottom-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-80 z-40 max-h-[50vh] overflow-y-auto 
              bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-4 rounded-2xl shadow-2xl origin-bottom">
            <div className="flex items-center justify-between mb-3 px-2">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Contenido
              </h4>
            </div>

            <ul className="flex flex-col gap-1">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={`dock-toc-${item.id}`}>
                    <Link
                      href={`#${generateSlug(item.id)}`}
                      onClick={() => setIsTocOpen(false)}
                      className={cn(
                        `flex items-center py-2 px-2 rounded-lg text-sm transition-all
                          ${
                            isActive
                              ? "bg-blue-500/10 text-blue-400 font-medium translate-x-1"
                              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                          }`
                      )}>
                      <div
                        className={cn(
                          `w-1.5 h-1.5 rounded-full mr-3 shrink-0 transition-colors ${
                            isActive ? "bg-blue-400" : "bg-zinc-700"
                          }`
                        )}
                      />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
