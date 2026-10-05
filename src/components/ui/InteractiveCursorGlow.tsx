import React, { useEffect, useRef } from "react";

const InteractiveCursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const isRunning = useRef(false);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on precise mouse pointer devices, never on touch
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!finePointer || !glowRef.current) {
      return;
    }

    const glowEl = glowRef.current;

    const animateGlow = () => {
      // Ease factor 0.12 for responsive silky-smooth trailing
      const ease = 0.12;
      const dx = mousePos.current.x - glowPos.current.x;
      const dy = mousePos.current.y - glowPos.current.y;

      glowPos.current.x += dx * ease;
      glowPos.current.y += dy * ease;

      glowEl.style.transform = `translate3d(${glowPos.current.x.toFixed(1)}px, ${glowPos.current.y.toFixed(1)}px, 0) translate(-50%, -50%)`;

      // If the glow has caught up with mouse (< 0.5px) and cursor is idle, pause RAF to save GPU
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && glowEl.style.opacity === "0") {
        isRunning.current = false;
        return;
      }

      requestAnimationFrame(animateGlow);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Reveal glow smoothly
      glowEl.style.opacity = "1";

      // Reset idle timer: fade out when cursor is stationary for 1.8s
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        glowEl.style.opacity = "0";
      }, 1800);

      // Start animation loop if stopped
      if (!isRunning.current) {
        isRunning.current = true;
        requestAnimationFrame(animateGlow);
      }
    };

    const handleMouseLeave = () => {
      glowEl.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={glowRef}
        style={{
          width: "360px",
          height: "360px",
          background: `radial-gradient(circle, rgba(var(--color-accent-rgb), 0.08) 0%, rgba(var(--color-accent-rgb), 0.02) 40%, transparent 70%)`,
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "50%",
          filter: "blur(40px)",
          opacity: 0,
          transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
};

export default InteractiveCursorGlow;
