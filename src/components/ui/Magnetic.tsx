import React, { useRef, useState, useEffect } from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  range?: number; // Bán kính tương tác hiệu ứng (px)
  strength?: number; // Cường độ lực hút (0 đến 1)
}

const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = "",
  range = 60,
  strength = 0.35,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        setIsHovered(true);
        // Hút phần tử nhẹ theo tọa độ chuột
        setPosition({
          x: distanceX * strength,
          y: distanceY * strength,
        });
      } else {
        if (isHovered) {
          setIsHovered(false);
          setPosition({ x: 0, y: 0 });
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength, isHovered]);

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: !isHovered
          ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
