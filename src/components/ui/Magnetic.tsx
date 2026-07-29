import React, { useEffect, useRef } from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  range?: number;
  strength?: number;
}

const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = "",
  range = 60,
  strength = 0.2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
  }, []);

  const setPosition = (x: number, y: number, active: boolean) => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      container.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      container.style.transitionDuration = active ? "120ms" : "420ms";
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const distanceX = event.clientX - (rect.left + rect.width / 2);
    const distanceY = event.clientY - (rect.top + rect.height / 2);
    const x = Math.max(-range, Math.min(range, distanceX)) * strength;
    const y = Math.max(-range, Math.min(range, distanceY)) * strength;
    setPosition(x, y, true);
  };

  return (
    <div
      ref={containerRef}
      className={`magnetic-element inline-block ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPosition(0, 0, false)}
    >
      {children}
    </div>
  );
};

export default Magnetic;
