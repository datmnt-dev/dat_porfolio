import React from "react";
import { Reveal, type RevealDirection } from "./Reveal";

export interface VisualRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  distance?: number;
  scale?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/**
 * Level 3 — Visual Reveal Primitive
 * Tailored for large project screenshots, interactive topology frames, and architecture visualizers.
 * Combines directional entrance + subtle depth scale (.985 -> 1) over a relaxed duration (750-900ms).
 */
export const VisualReveal: React.FC<VisualRevealProps> = ({
  children,
  direction = "up",
  distance = 26,
  scale = 0.985,
  delay = 0,
  duration = 820,
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px",
  className = "",
  style = {},
  as = "div",
}) => {
  return (
    <Reveal
      variant="visual"
      direction={direction}
      distance={distance}
      scale={scale}
      delay={delay}
      duration={duration}
      threshold={threshold}
      rootMargin={rootMargin}
      className={className}
      style={style}
      as={as}
    >
      {children}
    </Reveal>
  );
};

export default VisualReveal;
