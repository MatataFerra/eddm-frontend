"use client";

import { motion } from "motion/react";
import { PremiumMasonry } from "./further-card";
import { useRootData } from "@/lib/providers/root-data-provider";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function FurtherContainer() {
  const { furtherTimeArticles } = useRootData();

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <PremiumMasonry articles={furtherTimeArticles ?? []} />
    </motion.div>
  );
}
