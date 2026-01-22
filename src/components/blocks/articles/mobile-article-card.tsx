"use client";

import { getNormalizedTitleText } from "@/lib/utils";
import { useAnimationControls, motion, type Variants } from "motion/react";
import Image from "next/image";

type AnimationControls = ReturnType<typeof useAnimationControls>;

type MobileArticleProps = {
  trigger: string;
  variants: Variants;
  controls: AnimationControls;
  url?: `https://${string}` | `http://${string}` | string;
};

export function MobileArticleText({ trigger, controls, variants }: MobileArticleProps) {
  const textContent = getNormalizedTitleText(trigger);

  return (
    <>
      <p className="lg:hidden absolute top-0 left-0 m-4 text-2xl font-bold bg-accent-foreground/30 backdrop-blur-xs text-white dark:text-black p-4 rounded-2xl transition-all duration-300">
        {textContent}
      </p>

      <motion.p
        className="hidden lg:block absolute whitespace-nowrap"
        initial="rest"
        animate={controls}
        variants={variants}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          color: { duration: 0.3, delay: 0.3, ease: "easeInOut" },
        }}>
        {textContent}
      </motion.p>
    </>
  );
}

const MotionImage = motion.create(Image);

export function MobileArticleImage({ variants, controls, url }: MobileArticleProps) {
  const src = url ?? "https://via.placeholder.com/300x200.png?text=No+Image";

  return (
    <>
      {/* VERSIÓN MÓVIL: Estática y optimizada */}
      <div className="lg:hidden size-full absolute inset-0">
        <Image
          src={src}
          className="size-full object-cover"
          alt="Cover mobile"
          priority
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* VERSIÓN DESKTOP: Animada con Motion */}
      <div className="hidden lg:block size-full absolute inset-0">
        <MotionImage
          src={src}
          className="size-full object-cover"
          alt="Cover desktop"
          initial="rest"
          variants={variants}
          animate={controls}
          priority
          fill
          sizes="33vw"
          style={{ willChange: "transform, opacity" }}
        />
      </div>
    </>
  );
}
