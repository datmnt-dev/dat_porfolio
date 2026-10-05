import React, { useRef, useEffect } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  style?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 3.5,
  scale = 1.008,
  glare = true,
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const isEnabled = useRef(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      isEnabled.current = finePointer && !prefersReduced;
    }
  }, [prefersReduced]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEnabled.current || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    // Direct DOM manipulation - zero lag tracking
    card.style.transition = "none";
    card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0.12";
      glareRef.current.style.background = `radial-gradient(circle 280px at ${x.toFixed(0)}px ${y.toFixed(0)}px, rgba(var(--color-accent-rgb), 0.18) 0%, rgba(255, 255, 255, 0.12) 25%, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transition = "transform 550ms cubic-bezier(0.16, 1, 0.3, 1)";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
