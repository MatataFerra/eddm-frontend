"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

type AsideNavProps = {
  toc: { title: string; slug: string }[];
};

export function AsideNav({ toc }: AsideNavProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (!toc) return;
      const scrollPosition = window.scrollY + 200;
      for (let i = toc.length - 1; i >= 0; i--) {
        const slug = toc[i].slug;
        const element = document.getElementById(slug);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(slug);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  // Variantes para controlar los estados sincronizados
  const navVariants = {
    idle: { width: 30, backgroundColor: "transparent", padding: "4px 0px" },
    hover: { width: 240, backgroundColor: "rgba(24, 24, 27, 0.95)", padding: "8px" },
  };

  const itemVariants = {
    idle: { height: 8, marginBottom: 3 },
    hover: { height: 32, marginBottom: 4 },
  };

  const lineVariants = {
    idle: { opacity: 1, x: 0, display: "flex" },
    hover: { opacity: 0, x: -10, transitionEnd: { display: "none" } }, // display: none al final para que no estorbe
  };

  const textVariants = {
    idle: { opacity: 0, x: 20, display: "none" }, // display: none al inicio
    hover: { display: "flex", opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="idle"
      animate={isHovered ? "hover" : "idle"}
      variants={navVariants}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="fixed top-1/4 right-4 z-50 rounded-xl overflow-hidden backdrop-blur-sm border border-transparent hover:border-zinc-800/50 hover:shadow-2xl hidden md:block">
      <ul className="flex flex-col relative w-full">
        {toc.map((item) => {
          const id = item.slug;
          const isActive = activeId === id;

          return (
            <motion.li
              key={id}
              variants={itemVariants}
              className="relative flex items-center w-full">
              {/* VISTA 1: La Raya (Visible en idle) */}
              <motion.div
                variants={lineVariants}
                transition={{ duration: 0.2 }}
                className="absolute right-0 left-0 justify-center items-center">
                <motion.div
                  animate={{
                    width: isActive ? 16 : 10,
                    height: isActive ? 3 : 2,
                    backgroundColor: isActive ? "#60a5fa" : "#52525b",
                  }}
                  className="rounded-full mr-2"
                />
              </motion.div>

              {/* VISTA 2: El Texto (Visible en hover) */}
              <motion.a
                href={`#${id}`}
                onClick={() => setActiveId(id)}
                variants={textVariants}
                transition={{ duration: 0.2 }}
                className={`items-center w-full h-full px-2 rounded-md transition-colors truncate
                  ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  }
                `}>
                <div
                  className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 ${
                    isActive ? "bg-blue-400" : "bg-zinc-600"
                  }`}
                />
                <span className="text-xs font-medium truncate select-none">{item.title}</span>
              </motion.a>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
