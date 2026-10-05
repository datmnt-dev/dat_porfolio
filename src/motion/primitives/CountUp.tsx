import React, { useState, useEffect } from "react";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export interface CountUpProps {
  target: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  target,
  start = 0,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}) => {
  const [ref, inView] = useInView<HTMLSpanElement>({ once: true });
  const prefersReduced = usePrefersReducedMotion();
  const [currentValue, setCurrentValue] = useState(prefersReduced ? target : start);

  useEffect(() => {
    if (prefersReduced) {
      setCurrentValue(target);
      return;
    }

    if (!inView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Golden ease-out cubic: 1 - (1 - p)^3
      const ease = 1 - Math.pow(1 - progress, 3);
      const nextValue = start + (target - start) * ease;

      setCurrentValue(nextValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [inView, target, start, duration, prefersReduced]);

  const formatted = currentValue.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
