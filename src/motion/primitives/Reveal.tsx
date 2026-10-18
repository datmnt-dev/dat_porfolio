import React, { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";
export type RevealVariant = "section" | "content" | "visual" | "card" | "scale" | "custom";

export interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  direction?: RevealDirection;
  distance?: number;
  scale?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant,
  direction,
  distance,
  scale,
  delay = 0,
  duration,
  threshold,
  rootMargin,
  once = true,
  className = "",
  style = {},
  as: Component = "div",
}) => {
  const prefersReduced = usePrefersReducedMotion();

  // Motion hierarchy defaults based on variant
  const getDefaults = () => {
    switch (variant) {
      case "section":
        return {
          direction: "up" as RevealDirection,
          distance: 28,
          scale: 1,
          duration: 680,
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px",
        };
      case "visual":
        return {
          direction: "up" as RevealDirection,
          distance: 26,
          scale: 0.985,
          duration: 820,
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px",
        };
      case "card":
        return {
          direction: "up" as RevealDirection,
          distance: 16,
          scale: 1,
          duration: 540,
          threshold: 0.1,
          rootMargin: "0px 0px -6% 0px",
        };
      case "scale":
        return {
          direction: "up" as RevealDirection,
          distance: 16,
          scale: 0.985,
          duration: 640,
          threshold: 0.1,
          rootMargin: "0px 0px -6% 0px",
        };
      case "content":
      default:
        return {
          direction: "up" as RevealDirection,
          distance: 18,
          scale: 1,
          duration: 580,
          threshold: 0.1,
          rootMargin: "0px 0px -6% 0px",
        };
    }
  };

  const defaults = getDefaults();
  const resolvedDirection = direction ?? defaults.direction;
  const resolvedDistance = distance ?? defaults.distance;
  const resolvedScale = scale ?? defaults.scale;
  const resolvedDuration = duration ?? defaults.duration;
  const resolvedThreshold = threshold ?? defaults.threshold;
  const resolvedRootMargin = rootMargin ?? defaults.rootMargin;

  const [ref, inView] = useInView<HTMLDivElement>({
    threshold: resolvedThreshold,
    rootMargin: resolvedRootMargin,
    once,
  });
  const [isRevealed, setIsRevealed] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setIsRevealed(true);
      return;
    }
    if (inView && !isRevealed) {
      setIsRevealed(true);
    }
  }, [inView, isRevealed, prefersReduced]);

  const getTranslateFrom = () => {
    switch (resolvedDirection) {
      case "up":
        return `0, ${resolvedDistance}px, 0`;
      case "down":
        return `0, -${resolvedDistance}px, 0`;
      case "left":
        return `${resolvedDistance}px, 0, 0`;
      case "right":
        return `-${resolvedDistance}px, 0, 0`;
      case "none":
        return "0, 0, 0";
    }
  };

  if (prefersReduced) {
    return (
      <Component ref={ref} className={className} style={style}>
        {children}
      </Component>
    );
  }

  const cssVariables: React.CSSProperties = {
    ...style,
    "--reveal-duration": `${resolvedDuration}ms`,
    "--reveal-delay": `${delay}ms`,
    "--reveal-from": `translate3d(${getTranslateFrom()})`,
    "--reveal-scale-from": `${resolvedScale}`,
  } as React.CSSProperties;

  return (
    <Component
      ref={ref}
      className={`scroll-reveal ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={cssVariables}
    >
      {children}
    </Component>
  );
};
