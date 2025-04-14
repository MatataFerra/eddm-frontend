"use client";

import { type AnimationControls, motion, type Variants } from "motion/react";
import Image from "next/image";
import { isMobile } from "react-device-detect";

type MobileArticleProps = {
  trigger: string;
  variants: Variants;
  controls: AnimationControls;
};

export function MobileArticleText({ trigger, controls, variants }: MobileArticleProps) {
  return (
    <>
      {isMobile ? (
        <p className="absolute top-0 left-0 m-4 text-2xl font-bold bg-accent-foreground/30 backdrop-blur-xs text-white dark:text-black p-4 rounded-2xl transition-all duration-300">
          {" "}
          {trigger === "context"
            ? "Acá empieza la aventura"
            : trigger?.charAt(0).toUpperCase() + trigger?.slice(1)}
        </p>
      ) : (
        <motion.p
          className="absolute whitespace-nowrap"
          initial="rest"
          animate={controls}
          variants={variants}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            color: {
              duration: 0.3,
              delay: 0.3,
              ease: "easeInOut",
            },
          }}>
          {trigger === "context"
            ? "Acá empieza la aventura"
            : trigger?.charAt(0).toUpperCase() + trigger?.slice(1)}
        </motion.p>
      )}
    </>
  );
}

export function MobileArticleImage({ trigger, variants, controls }: MobileArticleProps) {
  const MotionImage = motion.create(Image);

  return (
    <>
      {isMobile ? (
        <Image
          src={`/categories/${trigger?.toLowerCase()}.png`}
          className="size-full -z-10 absolute inset-0"
          alt="Cover que sirve para ilustrar la temática del mes"
          priority
          width={300}
          height={300}
        />
      ) : (
        <MotionImage
          src={`/categories/${trigger?.toLowerCase()}.png`}
          className="size-full -z-10 absolute inset-0"
          alt="Cover que sirve para ilustrar la temática del mes"
          initial="initial_image"
          variants={variants}
          animate={controls}
          priority
          width={300}
          height={300}
          style={{ willChange: "transform, opacity" }}
        />
      )}
    </>
  );
}
