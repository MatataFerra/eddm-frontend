"use client";
import React, { PropsWithChildren, ReactNode } from "react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { cn } from "@/lib/utils";

type AnimatedModalDemoProps = PropsWithChildren<{
  triggerClassName?: string;
  className?: string;
  trigger?: ReactNode;
}>;

export function AnimatedModal({
  triggerClassName,
  className,
  trigger,
  children,
}: AnimatedModalDemoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Modal>
        <ModalTrigger
          className={cn(
            "bg-white dark:bg-black dark:text-white text-black flex justify-center group/modal-btn items-center",
            triggerClassName
          )}>
          {trigger ? trigger : "Click"}
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="text-black">{children}</ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
