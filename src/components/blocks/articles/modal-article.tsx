"use client";

import React, { useMemo, type PropsWithChildren } from "react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { MOTION_ANIMATIONS } from "@/lib/animations";
import { useAnimationControls } from "motion/react";
import type { Category } from "@/lib/interfaces/share";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { cn, getNormalizedTitleText } from "@/lib/utils";

const LoadingTextSkeleton = () => (
  <div className="absolute top-0 left-0 m-4 text-2xl font-bold bg-accent-foreground/30 backdrop-blur-xs p-4 rounded-2xl animate-pulse" />
);

const LoadingImageSkeleton = () => (
  <div className="size-full -z-10 absolute inset-0 animate-pulse bg-accent-foreground" />
);

const MobileArticleText = dynamic(
  () =>
    import("@/components/blocks/articles/mobile-article-card").then((mod) => mod.MobileArticleText),
  {
    loading: LoadingTextSkeleton,
  }
);

const MobileArticleImage = dynamic(
  () =>
    import("@/components/blocks/articles/mobile-article-card").then(
      (mod) => mod.MobileArticleImage
    ),
  {
    loading: LoadingImageSkeleton,
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

  const handleHoverStart = () => {
    controls.start("hover");
  };

  const handleHoverEnd = () => {
    controls.start("rest");
  };

  const triggerLabel = useMemo(() => getNormalizedTitleText(trigger), [trigger]);

  return (
    <div className={cn("flex items-center justify-center", className)} style={style}>
      <Modal key={pathname}>
        <ModalTrigger
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          className={cn(
            "flex justify-center items-center group/modal relative p-4 transition-colors",
            triggerClassName,
            !cover && "bg-white dark:bg-black dark:text-white text-black",
            cover && "text-white"
          )}>
          {cover ? (
            <>
              <MobileArticleImage
                url={url}
                trigger={trigger}
                controls={controls}
                variants={MOTION_ANIMATIONS.cover_image}
              />
              <MobileArticleText
                trigger={trigger}
                controls={controls}
                variants={MOTION_ANIMATIONS.slideToCorner}
              />
            </>
          ) : (
            <p className="text-black transition-colors dark:text-white">{triggerLabel}</p>
          )}
        </ModalTrigger>

        <ModalBody>
          <ModalContent className="text-black">{children}</ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
