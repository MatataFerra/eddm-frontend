"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type TOCItem, useTOC } from "@/lib/providers/toc-entry-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";

const containerVariants = {
  collapsed: {
    width: 32,
    padding: "8px 0",
    backgroundColor: "transparent",
  },
  expanded: {
    width: 260,
    padding: "12px",
    backgroundColor: "rgba(24, 24, 27, 0.95)",
  },
};

export function DesktopTableOfContents() {
  const { items, activeId } = useTOC();
  const [isHovered, setIsHovered] = useState(false);

  if (items.length === 0) return null;

  return (
    <motion.nav
      className="hidden md:flex flex-col fixed top-1/4 right-4 z-50 rounded-lg backdrop-blur-md border border-transparent hover:border-zinc-800/50 overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="collapsed"
      animate={isHovered ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <div className="relative w-full">
        <AnimatePresence mode="wait" initial={false}>
          {!isHovered ? (
            <CompactLines key="lines" items={items} activeId={activeId} />
          ) : (
            <ExpandedList key="list" items={items} activeId={activeId} />
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function CompactLines({ items, activeId }: { items: TOCItem[]; activeId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col items-center w-full gap-0.5">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <div key={item.id} className="h-2 w-full flex items-center justify-center">
            <div
              className={cn(
                "rounded-full transition-all duration-300 h-0.5",
                isActive
                  ? "bg-blue-500 w-4 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  : "bg-zinc-600 w-2"
              )}
            />
          </div>
        );
      })}
    </motion.div>
  );
}

function ExpandedList({ items, activeId }: { items: TOCItem[]; activeId: string }) {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        visible: { transition: { staggerChildren: 0.02 } },
        hidden: {},
      }}
      className="flex flex-col gap-1 list-none p-0 m-0 w-full">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <motion.li
            key={item.id}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}>
            <Link
              href={`#${item.id}`}
              className={cn(
                "block w-full px-3 py-1.5 rounded-md text-xs font-medium truncate transition-colors",
                isActive
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              )}>
              {item.title}
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
