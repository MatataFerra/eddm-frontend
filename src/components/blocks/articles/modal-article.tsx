"use client";

import React, { type PropsWithChildren } from "react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { capitalize, cn, MOTION_ANIMATIONS } from "@/lib/utils";
import { useAnimationControls } from "motion/react";
import type { Category } from "@/lib/interfaces/share";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const MobileArticleText = dynamic(
  () => import("./mobile-article-card").then((mod) => mod.MobileArticleText),
  {
    ssr: false,
    loading: () => (
      <div className="absolute top-0 left-0 m-4 text-2xl font-bold bg-accent-foreground/30 backdrop-blur-xs text-white dark:text-black p-4 rounded-2xl transition-all duration-300 animate-pulse" />
    ),
  }
);
const MobileArticleImage = dynamic(
  () => import("./mobile-article-card").then((mod) => mod.MobileArticleImage),
  {
    ssr: false,

    loading: () => (
      <div className="size-full -z-10 absolute inset-0 animate-pulse bg-accent-foreground"></div>
    ),
  }
);

type AnimatedModalDemoProps = PropsWithChildren<{
  triggerClassName?: string;
  className?: string;
  trigger: Category["name"];
  cover: boolean;
  url: `https://${string}` | `http://${string}` | string;
  style?: React.CSSProperties;
}>;

export function ModalArticle({
  triggerClassName,
  className,
  trigger,
  cover,
  url,
  style,
  children,
}: AnimatedModalDemoProps) {
  const controls = useAnimationControls();
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center justify-center", className)} style={style}>
      <Modal key={pathname}>
        <ModalTrigger
          onHoverStart={() => {
            controls.start("hover", { duration: 0.2 });
            controls.start("hover_image");
          }}
          onHoverEnd={() => {
            controls.start("rest");
            controls.start("initial_image");
          }}
          onAnimationComplete={() => controls.start("finalStyle")}
          className={cn(
            "flex justify-center items-center group/modal relative p-4",
            triggerClassName,
            !cover ? "bg-white dark:bg-black dark:text-white text-black" : "text-white"
          )}>
          {cover ? (
            <MobileArticleImage
              url={url}
              trigger={trigger}
              controls={controls}
              variants={MOTION_ANIMATIONS.cover_image}
            />
          ) : null}
          {cover ? (
            <MobileArticleText
              trigger={trigger}
              controls={controls}
              variants={MOTION_ANIMATIONS.slideToCorner}
            />
          ) : (
            <p className="text-black transition-colors">
              {trigger === "context"
                ? "Acá empieza la aventura"
                : capitalize(trigger) || "Artículos"}
            </p>
          )}
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="text-black">{children}</ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
