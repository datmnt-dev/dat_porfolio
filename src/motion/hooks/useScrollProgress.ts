import { useState, useEffect } from "react";

export interface ScrollProgressState {
  progress: number;
  scrolled: boolean;
  scrollY: number;
}

export function useScrollProgress(thresholdY = 24): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    progress: 0,
    scrolled: false,
    scrollY: 0,
  });

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = Math.max(docHeight - winHeight, 1);
      const progress = Math.min(Math.max(scrollY / totalScrollable, 0), 1);
      const scrolled = scrollY > thresholdY;

      setState({ progress, scrolled, scrollY });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [thresholdY]);

  return state;
}
