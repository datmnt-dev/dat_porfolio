import React, { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface RevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  distance?: number;
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
  direction = "up",
  distance = 18,
  delay = 0,
  duration = 580,
  threshold = 0.1,
  rootMargin = "0px 0px -20px 0px",
  once = true,
  className = "",
  style = {},
  as: Component = "div",
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, rootMargin, once });
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (inView && !isRevealed) {
      setIsRevealed(true);
    }
  }, [inView, isRevealed]);

  const getTranslateFrom = () => {
    switch (direction) {
      case "up":
        return `0, ${distance}px, 0`;
      case "down":
        return `0, -${distance}px, 0`;
      case "left":
        return `${distance}px, 0, 0`;
      case "right":
        return `-${distance}px, 0, 0`;
      case "none":
        return "0, 0, 0";
    }
  };

  const cssVariables: React.CSSProperties = {
    ...style,
    "--reveal-duration": `${duration}ms`,
    "--reveal-delay": `${delay}ms`,
    "--reveal-from": `translate3d(${getTranslateFrom()})`,
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
