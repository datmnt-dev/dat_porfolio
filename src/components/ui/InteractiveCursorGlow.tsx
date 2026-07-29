import React, { useEffect, useRef, useState } from "react";

const InteractiveCursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Vị trí chuột thực tế và vị trí hiển thị hiện tại (dùng cho nội suy tuyến tính - LERP)
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Kiểm tra xem có phải thiết bị di động/cảm ứng không
    const touchQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(touchQuery.matches);

    const handleTouchChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    touchQuery.addEventListener("change", handleTouchChange);
    return () => touchQuery.removeEventListener("change", handleTouchChange);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Vòng lặp chuyển động mượt mà (Lerp)
    const animateGlow = () => {
      // Công thức Lerp: Position = Position + (Target - Position) * EaseFactor
      // Hệ số 0.08 tạo quán tính và độ trễ cực kỳ mượt mà
      const ease = 0.08;
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * ease;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * ease;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId.current = requestAnimationFrame(animateGlow);
    };

    animateGlow();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={glowRef}
        style={{
          width: "550px",
          height: "550px",
          background: `radial-gradient(circle, rgba(var(--color-accent-rgb), 0.15) 0%, rgba(var(--color-accent-rgb), 0.05) 30%, transparent 70%)`,
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "50%",
          filter: "blur(40px)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
};

export default InteractiveCursorGlow;
