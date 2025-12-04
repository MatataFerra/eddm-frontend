"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useTOC } from "@/lib/providers/toc-entry-provider";

export function EntryNavContentDesktop() {
  const { items, activeId } = useTOC();
  const [isHovered, setIsHovered] = useState(false);

  if (items.length === 0) return null;

  const navVariants = {
    idle: { width: 30, backgroundColor: "transparent", padding: "12px 0px" },
    hover: { width: 240, backgroundColor: "rgba(24, 24, 27, 0.95)", padding: "16px" },
  };

  return (
    <motion.nav
      className="hidden md:flex fixed top-1/4 right-4 z-50 rounded-xl overflow-hidden backdrop-blur-sm border border-transparent hover:border-zinc-800/50 flex-col"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="idle"
      animate={isHovered ? "hover" : "idle"}
      variants={navVariants}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}>
      <ul className="flex flex-col relative w-full">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <motion.li
              key={item.id}
              className="relative flex items-center w-full"
              animate={{ height: isHovered ? 32 : 8, marginBottom: isHovered ? 4 : 3 }}>
              {/* Lógica visual idéntica a la anterior... */}
              <motion.div
                animate={{ opacity: isHovered ? 0 : 1, x: isHovered ? -10 : 0 }}
                className="absolute right-0 left-0 flex justify-center pointer-events-none">
                <motion.div
                  animate={{
                    width: isActive ? 16 : 10,
                    height: isActive ? 3 : 2,
                    backgroundColor: isActive ? "#60a5fa" : "#52525b",
                  }}
                  className="rounded-full mr-2"
                />
              </motion.div>

              <motion.a
                href={`#${item.id}`}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : 15,
                  display: isHovered ? "flex" : "none",
                }}
                className={`items-center w-full h-full px-2 rounded-md truncate transition-colors ${
                  isActive ? "text-blue-400 bg-blue-500/10" : "text-zinc-400 hover:text-zinc-200"
                }`}>
                <div
                  className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 ${
                    isActive ? "bg-blue-400" : "bg-zinc-600"
                  }`}
                />
                <span className="text-xs font-medium truncate">{item.title}</span>
              </motion.a>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
