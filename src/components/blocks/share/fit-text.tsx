"use client";

import React, { ComponentProps, PropsWithChildren, useEffect, useRef } from "react";

// Tipos mínimos (si tu paquete ya trae tipos, podés omitir esto)
// O crea `types/fitty.d.ts` con esta forma.
type FittyInstance = {
  fit: () => void;
  unsubscribe: () => void;
};
type FittyOptions = {
  minSize?: number;
  maxSize?: number;
  multiLine?: boolean;
  // IMPORTANTE: no usamos 'false' para evitar el error de tipos.
  observeMutations?: MutationObserverInit;
};

type Props = PropsWithChildren<
  ComponentProps<"div"> & {
    className?: string;
    min?: number; // px
    max?: number; // px
    multiline?: boolean;
    // Si querés desactivar, poné 'undefined' (no boolean false)
    observeMutations?: MutationObserverInit;
    refitKey?: React.Key; // fuerza re-fit cuando cambia
  }
>;

export default function FitText({
  children,
  className,
  min = 12,
  max = 96,
  multiline = true,
  observeMutations = { childList: true, characterData: true, subtree: true },
  refitKey,
  ...rest
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const fittyRef = useRef<FittyInstance | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const mod = await import("fitty");
      // `mod.default` es la función
      const fitty = mod.default as (el: HTMLElement, opts?: FittyOptions) => FittyInstance;

      if (cancelled || !hostRef.current) return;

      // Limpia cualquier instancia previa por seguridad
      if (fittyRef.current) {
        fittyRef.current.unsubscribe();
        fittyRef.current = null;
      }

      // OJO: usamos HTMLElement directo para obtener una sola instancia
      const instance = fitty(hostRef.current, {
        minSize: min,
        maxSize: max,
        multiLine: multiline,
        // Solo pasa 'observeMutations' si querés activarlo
        ...(observeMutations ? { observeMutations } : {}),
      });

      fittyRef.current = instance;

      // Primer ajuste explícito
      instance.fit();
    })();

    return () => {
      cancelled = true;
      if (fittyRef.current) {
        fittyRef.current.unsubscribe();
        fittyRef.current = null;
      }
    };
  }, [min, max, multiline, observeMutations, refitKey]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ lineHeight: 1, whiteSpace: multiline ? "normal" : "nowrap", ...rest.style }}
      {...rest}>
      {children}
    </div>
  );
}
