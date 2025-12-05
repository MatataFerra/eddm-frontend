import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ListIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTOC } from "@/lib/providers/toc-entry-provider";

const mobileMenuVariants = {
  closed: { opacity: 0, scale: 0.95, y: 20, pointerEvents: "none" as const },
  open: { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" as const },
};

export function MobileTableOfContents() {
  const { items, activeId } = useTOC();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="md:hidden flex flex-col items-end gap-4">
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="bg-zinc-900/95 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl shadow-2xl w-64 max-h-[60vh] overflow-y-auto mb-2 origin-bottom-right">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-2">
              En esta página
            </h4>
            <ul className="flex flex-col gap-1">
              {items.map((item) => {
                const id = item.id;
                const isActive = activeId === id;
                return (
                  <li key={`mobile-${id}`}>
                    <a
                      href={`#${id}`}
                      onClick={() => {
                        setMobileOpen(false);
                      }}
                      className={`flex items-center py-2 px-2 rounded-lg text-sm transition-colors
                          ${
                            isActive
                              ? "bg-blue-500/20 text-blue-400 font-medium"
                              : "text-zinc-300 active:bg-zinc-800"
                          }`}>
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="w-1 h-4 bg-blue-500 rounded-full mr-2 absolute left-2"
                        />
                      )}
                      <span className={isActive ? "pl-3" : ""}>{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95 border border-zinc-700
            ${
              mobileOpen ? "bg-zinc-800 text-white" : "bg-zinc-900/80 backdrop-blur text-zinc-300"
            }`}
        aria-label="Table of contents">
        {mobileOpen ? <X size={20} /> : <ListIcon size={20} />}
      </Button>
    </div>
  );
}
