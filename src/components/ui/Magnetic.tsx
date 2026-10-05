import React, { useRef, useEffect } from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
}

const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = "",
  maxDistance = 4.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isEnabled = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    isEnabled.current = finePointer;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEnabled.current || !containerRef.current) return;

    const el = containerRef.current;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;

    // Giới hạn chuyển vị tối đa (clamp)
    const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
    const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

    // Direct DOM manipulation - zero lag, perfectly tracks mouse cursor
    el.style.transition = "none";
    el.style.transform = `translate3d(${clampedX.toFixed(1)}px, ${clampedY.toFixed(1)}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
