import React, { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);
    if (!cardRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = ((y / rect.height) * 2 - 1) * -3;
    const tiltY = ((x / rect.width) * 2 - 1) * 3;

    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      if (!cardRef.current) return;
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
      cardRef.current.style.setProperty("--tilt-x", `${tiltX}deg`);
      cardRef.current.style.setProperty("--tilt-y", `${tiltY}deg`);
      cardRef.current.classList.add("is-tilting");
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e);
    if (!cardRef.current) return;
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    cardRef.current.style.setProperty("--tilt-x", "0deg");
    cardRef.current.style.setProperty("--tilt-y", "0deg");
    cardRef.current.classList.remove("is-tilting");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card-wrapper ${className}`}
      {...props}
    >
      <div className="spotlight-card-glow" />
      <div className="spotlight-card-border" />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
