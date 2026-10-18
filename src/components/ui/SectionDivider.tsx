import React from "react";
import { useInView } from "../../motion/hooks/useInView";
import { usePrefersReducedMotion } from "../../motion/hooks/usePrefersReducedMotion";

interface SectionDividerProps {
  className?: string;
  delay?: number;
}

/**
 * Animated Section Divider
 * Transitions scaleX(0 -> 1) from transformOrigin: left as user scrolls into the section boundary.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = "",
  delay = 0,
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -8% 0px",
    once: true,
  });
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden py-1 ${className}`}
      aria-hidden="true"
    >
      <div
        className="h-px w-full bg-[var(--color-border)]"
        style={{
          transformOrigin: "left center",
          transform: prefersReduced || inView ? "scaleX(1)" : "scaleX(0)",
          opacity: prefersReduced || inView ? 0.9 : 0,
          transition: prefersReduced
            ? "none"
            : `transform 700ms ${delay}ms cubic-bezier(0.16, 1, 0.3, 1), opacity 550ms ${delay}ms ease`,
        }}
      />
    </div>
  );
};

export default SectionDivider;
