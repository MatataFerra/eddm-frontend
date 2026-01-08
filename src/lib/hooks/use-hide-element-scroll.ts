import { useState, useEffect, useEffectEvent } from "react";

export function useHideElementScroll() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isManuallyHidden, setIsManuallyHidden] = useState(false);
  const [userOverride, setUserOverride] = useState(false);

  const handleScroll = useEffectEvent(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;

    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;

    setIsAtBottom(isNearBottom);

    if (!isNearBottom) {
      setIsManuallyHidden(false);
      setUserOverride(false);
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldHide = userOverride ? isManuallyHidden : isAtBottom || isManuallyHidden;

  return {
    shouldHide,
  };
}
