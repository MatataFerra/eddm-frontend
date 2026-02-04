"use client";

import { ArticleReadStatus } from "@/lib/interfaces/share";
import { useLocalStorageConfig } from "@/lib/providers/local-storage-provider";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export function MarkAsReadButton() {
  const params = useParams();
  const { slug } = params;
  const { articlesReadStatus, update, getArticleReadingStatus } = useLocalStorageConfig();

  const statusArticle = getArticleReadingStatus(slug?.toString() || "") as
    | ArticleReadStatus
    | undefined;
  const isRead = statusArticle === "read";

  function handleMarkAsRead() {
    if (isRead) return;

    update("articles-read-status", {
      ...articlesReadStatus,
      [slug?.toString() || ""]: "read",
    });
  }

  return (
    <section className="mb-8 flex justify-end w-full z-10">
      <motion.div
        layout
        onClick={handleMarkAsRead}
        className={cn(
          "flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-all duration-500",
          isRead
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 cursor-default"
            : "bg-zinc-900 border-zinc-800 text-zinc-300 cursor-pointer hover:bg-zinc-950 hover:border-zinc-700",
        )}>
        <AnimatePresence mode="wait" initial={false}>
          {isRead ? (
            <motion.div
              key="status-read"
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
              <span className="text-sm font-medium">Leído</span>
            </motion.div>
          ) : (
            <motion.span
              key="status-unread"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm font-medium">
              Marcar como leído
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
