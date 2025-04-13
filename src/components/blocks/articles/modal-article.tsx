"use client";
import React, { type PropsWithChildren } from "react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { type Category, cn, MOTION_ANIMATIONS } from "@/lib/utils";
import { motion, useAnimationControls } from "motion/react";
import Image from "next/image";

type AnimatedModalDemoProps = PropsWithChildren<{
  triggerClassName?: string;
  className?: string;
  trigger: Category["name"];
  cover: boolean;
}>;

export function ModalArticle({
  triggerClassName,
  className,
  trigger,
  cover,
  children,
}: AnimatedModalDemoProps) {
  const controls = useAnimationControls();
  const MotionImage = motion(Image);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Modal>
        <ModalTrigger
          onTapStart={() => {
            controls.start("hover");
            controls.start("hover_image");
          }}
          onHoverStart={() => {
            controls.start("hover");
            controls.start("hover_image");
          }}
          onHoverEnd={() => {
            controls.start("rest");
            controls.start("initial_image");
          }}
          onAnimationComplete={() => controls.start("finalStyle")}
          onTapCancel={() => {
            controls.start("rest");
            controls.start("initial_image");
          }}
          className={cn(
            "flex justify-center items-center group/modal relative p-4",
            triggerClassName,
            !cover ? "bg-white dark:bg-black dark:text-white text-black" : "text-white"
          )}>
          {cover ? (
            <MotionImage
              src={`/categories/${trigger?.toLowerCase()}.png`}
              className="size-full -z-10 absolute inset-0"
              alt="Cover que sirve para ilustrar la temática del mes"
              initial="initial_image"
              variants={MOTION_ANIMATIONS.cover_image}
              animate={controls}
              priority
              width={300}
              height={300}
              onError={(e) => {
                // eslint-disable-next-line no-console
                console.log("The image has not been found");
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : null}
          {cover ? (
            <motion.p
              className="absolute whitespace-nowrap"
              initial="rest"
              animate={controls}
              variants={MOTION_ANIMATIONS.slideToCorner}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                color: {
                  duration: 0.3,
                  delay: 0.3, // Cambia el color después del 30% de la animación
                  ease: "easeInOut",
                },
              }}>
              {trigger === "context"
                ? "Acá empieza la aventura"
                : trigger?.charAt(0).toUpperCase() + trigger?.slice(1)}
            </motion.p>
          ) : (
            <p className="text-black transition-colors">
              {trigger === "context"
                ? "Acá empieza la aventura"
                : trigger?.charAt(0).toUpperCase() + trigger?.slice(1)}
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
