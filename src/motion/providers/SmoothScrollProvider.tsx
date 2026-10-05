import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Lenis, { type LenisOptions } from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { LenisContext } from "./LenisContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: Partial<LenisOptions>;
  enabled?: boolean;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  options = {},
  enabled = true,
}) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (prefersReducedMotion || !enabled) {
      return;
    }

    // Silky smooth, buttery scrolling with graceful deceleration
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false,
      autoRaf: false,
      ...optionsRef.current,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Sync Lenis scroll events with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Sync GSAP ticker to drive Lenis smoothly without jitter
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Refresh ScrollTrigger once fonts and DOM are settled
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [prefersReducedMotion, enabled]);

  const scrollTo = useCallback((
    target: string | number | HTMLElement,
    scrollOptions?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      lock?: boolean;
      onComplete?: () => void;
    }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, scrollOptions);
    } else if (typeof window !== "undefined") {
      // Native fallback on touch devices or reduced motion
      if (scrollOptions?.immediate) {
        if (typeof target === "number") {
          window.scrollTo(0, target);
        } else if (typeof target === "string") {
          const el = document.querySelector(target);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY + (scrollOptions.offset || 0);
            window.scrollTo(0, top);
          }
        } else if (target instanceof HTMLElement) {
          const top = target.getBoundingClientRect().top + window.scrollY + (scrollOptions.offset || 0);
          window.scrollTo(0, top);
        }
      } else {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
        } else if (typeof target === "string") {
          const el = document.querySelector(target);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY + (scrollOptions?.offset || 0);
            window.scrollTo({ top, behavior: "smooth" });
          }
        } else if (target instanceof HTMLElement) {
          const top = target.getBoundingClientRect().top + window.scrollY + (scrollOptions?.offset || 0);
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  }, []);

  const value = useMemo(
    () => ({ lenis: lenisInstance, scrollTo }),
    [lenisInstance, scrollTo]
  );

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  );
};
