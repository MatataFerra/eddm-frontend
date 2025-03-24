import { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (!ref.current || ref.current.contains(target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener, { signal });
    document.addEventListener("touchstart", listener, { signal });

    return () => controller.abort();
  }, [ref, callback]);
};
