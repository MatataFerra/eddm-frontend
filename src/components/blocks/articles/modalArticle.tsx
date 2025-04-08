"use client";
import React, { type PropsWithChildren } from "react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { type Category, cn } from "@/lib/utils";
import Image from "next/image";

type AnimatedModalDemoProps = PropsWithChildren<{
  triggerClassName?: string;
  className?: string;
  trigger: Category["name"];
  cover: boolean;
}>;

export function AnimatedModal({
  triggerClassName,
  className,
  trigger,
  cover,
  children,
}: AnimatedModalDemoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Modal>
        <ModalTrigger
          className={cn(
            "flex justify-center group/modal-btn items-center group/modal",
            triggerClassName,
            !cover ? "bg-white dark:bg-black dark:text-white text-black" : "text-white"
          )}>
          {cover ? (
            <Image
              src={`/categories/${trigger?.toLowerCase()}.png`}
              className="size-full -z-10 absolute inset-0 opacity-30 transform blur-xs scale-125 transition-all duration-300 group-hover/modal:opacity-100 group-hover/modal:blur-none group-hover/modal:scale-100"
              alt="Cover que sirve para ilustrar la temática del mes"
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
          <p className="text-shadow-lg/60 text-shadow-zinc-700 group-hover/modal:text-black transition-colors duration-300">
            {trigger === "context"
              ? "Acá empieza la aventura"
              : trigger?.charAt(0).toUpperCase() + trigger?.slice(1)}
          </p>
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="text-black">{children}</ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
